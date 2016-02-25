/**
 * Created by o3oNet on 16-1-24.
 */

var NODE_UUID = require('node-uuid');
var EventProxy = require("eventproxy");

var appConfig = require("config").get("app");
var wechatConfig = require("config").get("wechat.wxAppConfig");

/**
 * 获取单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfo = function (data, callback) {

    var uuid = data.uuid;

    var userInfoKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "wechatInfo" + ":" + uuid;

    app.redisClient.get(userInfoKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
        if (err) callback(err);
        if (err) return;

        if (reply) {//如果存在则返回该人的信息
            callback(null, JSON.parse(reply));
            return;
        } else {
            callback(null, {});
            return;
        }
    });

}

/**
 * 添加单个用户的信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.postSingleUserWeChatInfo = function (data, callback) {//通过该方法注册获得的uuid,需在这里生成uuid

    var openid = data.openid;
    var nickname = data.nickname;
    var sex = data.sex;
    var province = data.province;
    var city = data.city;
    var country = data.country;
    var headimgurl = data.headimgurl;

    var appid = wechatConfig.appid;

    var uuid = NODE_UUID.v1();

    console.log(" @@@-- 开始保存用户的微信信息 -- openid -- " + openid + " --@@@ ");
    var recordTimeLabel = "--- Save UserBasicInfo Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = EventProxy();
    ep.fail(function (err) {
        console.error(" @@@-- 保存用户的微信信息失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("saveToRedis", "saveToMysql", function (a, b) {
        console.log(" @@@-- 成功保存用户的微信信息 -- openid -- " + openid + " --@@@ ");
        console.timeEnd(recordTimeLabel);
        callback(null, {uuid: b});
    });


    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
        if (err) ep.emit("error", err);
        if (err) return;

        var selectSQL = "SELECT COUNT(*) COUNT FROM USERS WHERE OPENID = ?";//别名是可用的

        conn.query(selectSQL, [openid], function (err, rows) {
            if (err) ep.emit("error", err);
            if (err) return;

            var count = rows[0].COUNT;
            if (count == 0) {
                var insertSQL = "INSERT INTO USERS SET ? ";
                var inserts = {
                    openid: openid,
                    appid: appid,
                    uuid: uuid,
                    nickname: nickname,
                    sex: sex,
                    province: province,
                    city: city,
                    country: country,
                    headimgurl: headimgurl,
                    registerTime: new Date(),
                    lastLoginTime: new Date(),
                    times: 1
                };
                conn.query(insertSQL, inserts, function (err, RESULT) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;
                    ep.emit("saveToMysql", uuid);


                    /**
                     * 确保数据一致性
                     * @type {string}
                     */
                    var userInfoKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "wechatInfo" + ":" + uuid;

                    app.redisClient.set(userInfoKeyName, JSON.stringify({
                        openid: openid,
                        appid: appid,
                        uuid: uuid,
                        nickname: nickname,
                        sex: sex,
                        province: province,
                        city: city,
                        country: country,
                        headimgurl: headimgurl,
                        registerTime: new Date(),
                    }), ep.done("saveToRedis"));


                });
            } else { //表示数据库中已有该人，无需再次插入,返回uuid值

                var selectSQL = "SELECT uuid FROM USERS WHERE OPENID = ?";//别名是可用的

                conn.query(selectSQL, [openid], function (err, rows) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;

                    var uuid = rows[0].uuid;
                    if (uuid) {
                        console.log("数据库中存在");
                        ep.emit("saveToMysql", uuid);
                        ep.emit("saveToRedis", {});
                    } else {
                        ep.emit("error", "获取数据库中存在的用户微信信息失败!");
                    }
                });


            }
        });
    });

}

/**
 * 更新单个用户的状态信息
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserWeChatInfo = function (data, callback) {//重新换绑微信号的时候使用


}

/**
 * 删除单个用户的信息
 * @param req
 * @param res
 * @param next
 */
exports.deleteSingleUserWeChatInfo = function (data, callback) {

}

/**
 *更新单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.patchSingleUserWeChatInfo = function (data, callback) {//必须有uuid

    var uuid = data.uuid;

    var openid = data.openid;
    var nickname = data.nickname;
    var sex = data.sex;
    var province = data.province;
    var city = data.city;
    var country = data.country;
    var headimgurl = data.headimgurl;

    var appid = wechatConfig.appid;


    //TODO::添加一些影响系统的更新

    if (!uuid) {
        callback("更新用户微信信息时,uuid不能为空");
        return;
    }


    console.log(" @@@-- 开始更新用户微信的信息 -- openid -- " + openid + " --@@@ ");
    var recordTimeLabel = "--- Save UserWeChatInfo Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = EventProxy();
    ep.fail(function (err) {
        console.error(" @@@-- 更新用户的微信信息失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("saveToRedis", "saveToMysql", function (a, b) {
        console.log(" @@@-- 更新用户微信的信息成功 -- openid -- " + openid + " --@@@ ");
        console.timeEnd(recordTimeLabel);
        callback(null, {uuid: uuid});
    });

    var userInfoKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "wechatInfo" + ":" + uuid;

    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {//只是个统计功能,异步处理即可
        if (err) ep.emit("error", err);
        if (err) return;

        var selectSQL = "SELECT COUNT(*) COUNT FROM USERS WHERE OPENID = ? AND UUID = ?";//别名是可用的

        conn.query(selectSQL, [openid, uuid], function (err, rows) {
            if (err) ep.emit("error", err);
            if (err) return;

            var count = rows[0].COUNT;
            if (count == 1) {
                var updateSQL = "UPDATE USERS SET ? WHERE OPENID = ? AND UUID = ?";
                var updates = {
                    openid: openid,
                    appid: appid,
                    uuid: uuid,
                    nickname: nickname,
                    sex: sex,
                    province: province,
                    city: city,
                    country: country,
                    headimgurl: headimgurl,
                    registerTime: new Date(),
                    lastLoginTime: new Date(),
                    times: 1
                };
                conn.query(updateSQL, [updates, openid, uuid], function (err, RESULT) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;
                    ep.emit("saveToMysql", RESULT);

                    app.redisClient.set(userInfoKeyName, JSON.stringify({//确保数据一致
                        openid: openid,
                        appid: appid,
                        uuid: uuid,
                        nickname: nickname,
                        sex: sex,
                        province: province,
                        city: city,
                        country: country,
                        headimgurl: headimgurl,
                        registerTime: new Date(),
                    }), ep.done("saveToRedis"));

                });

            } else {
                ep.emit("error", "没有找到需要更新微信信息的用户")
            }
        });
    });

}

exports.saveVisitorLog = function (data, callback) {

}


/**
 * 获取单个用户的基本信息
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserBaseInfo = function (data, callback) {

    var uuid = data.uuid;

    var userInfoKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "baseInfo" + ":" + uuid;

    app.redisClient.get(userInfoKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
        if (err) callback(err);
        if (err) return;

        if (reply) {//如果存在则返回该人的信息
            callback(null, JSON.parse(reply));
            return;
        } else {
            callback(null, {});
            return;
        }
    });

}


/**
 * 添加单个用户的基本信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.postSingleUserBaseInfo = function (data, callback) {//通过验证手机号方法注册获得的uuid,需在这里生成uuid

    var realName = data.realName;
    var screenName = data.screenName;
    var identifyNum = data.identifyNum;
    var phoneNum = data.phoneNum;

    var uuid = NODE_UUID.v1();

    console.log(" @@@-- 开始保存用户的基本信息 -- phoneNum -- " + phoneNum + " --@@@ ");
    var recordTimeLabel = "--- Save UserBasicInfo Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = EventProxy();
    ep.fail(function (err) {
        console.error(" @@@-- 保存用户的基本信息失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("saveToRedis", "saveToMysql", function (a, b) {
        console.log(" @@@-- 成功保存用户的基本信息 -- phoneNum -- " + phoneNum + " --@@@ ");
        console.timeEnd(recordTimeLabel);
        callback(null, {uuid: b});
    });


    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
        if (err) ep.emit("error", err);
        if (err) return;

        var selectSQL = "SELECT COUNT(*) COUNT FROM USERS WHERE phoneNum = ?";//别名是可用的

        conn.query(selectSQL, [phoneNum], function (err, rows) {
            if (err) ep.emit("error", err);
            if (err) return;

            var count = rows[0].COUNT;
            if (count == 0) {
                var insertSQL = "INSERT INTO USERS SET ? ";
                var inserts = {
                    realName: realName,
                    screenName: screenName,
                    uuid: uuid,
                    identifyNum: identifyNum,
                    phoneNum: phoneNum,
                    registerTime: new Date(),
                    lastLoginTime: new Date(),
                    times: 1
                };
                conn.query(insertSQL, inserts, function (err, RESULT) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;
                    ep.emit("saveToMysql", uuid);


                    /**
                     * 确保数据一致性
                     * @type {string}
                     */
                    var userInfoKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "baseInfo" + ":" + uuid;

                    app.redisClient.set(userInfoKeyName, JSON.stringify({
                        realName: realName,
                        screenName: screenName,
                        uuid: uuid,
                        identifyNum: identifyNum,
                        phoneNum: phoneNum,
                        registerTime: new Date(),
                    }), ep.done("saveToRedis"));


                });
            } else { //表示数据库中已有该人，无需再次插入,返回uuid值

                var selectSQL = "SELECT uuid FROM USERS WHERE phoneNum = ?";//别名是可用的

                conn.query(selectSQL, [phoneNum], function (err, rows) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;

                    var uuid = rows[0].uuid;
                    if (uuid) {
                        console.log("数据库中存在");
                        ep.emit("saveToMysql", uuid);
                        ep.emit("saveToRedis", {});
                    } else {
                        ep.emit("error", "获取数据库中存在的用户基本信息失败!");
                    }
                });


            }
        });
    });

}


/**
 *更新单个用户的基本信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.patchSingleUserBaseInfo = function (data, callback) {//必须有uuid

    var uuid = data.uuid;

    var realName = data.realName;
    var screenName = data.screenName;
    var identifyNum = data.identifyNum;
    var phoneNum = data.phoneNum;

    //TODO::添加一些影响系统的更新

    if (!uuid) {
        callback("更新用户基本信息时,uuid不能为空");
        return;
    }


    console.log(" @@@-- 开始更新用户基本的信息 -- phoneNum -- " + phoneNum + " --@@@ ");
    var recordTimeLabel = "--- Save UserWeChatInfo Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = EventProxy();
    ep.fail(function (err) {
        console.error(" @@@-- 更新用户的基本信息失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("saveToRedis", "saveToMysql", function (a, b) {
        console.log(" @@@-- 更新用户基本的信息成功 -- phoneNum -- " + phoneNum + " --@@@ ");
        console.timeEnd(recordTimeLabel);
        callback(null, {uuid: uuid});
    });

    var userInfoKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "baseInfo" + ":" + uuid;

    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {//只是个统计功能,异步处理即可
        if (err) ep.emit("error", err);
        if (err) return;

        var selectSQL = "SELECT COUNT(*) COUNT FROM USERS WHERE phoneNum = ? AND UUID = ?";//别名是可用的

        conn.query(selectSQL, [phoneNum, uuid], function (err, rows) {
            if (err) ep.emit("error", err);
            if (err) return;

            var count = rows[0].COUNT;
            if (count == 1) {
                var updateSQL = "UPDATE USERS SET ? WHERE phoneNum = ? AND UUID = ?";
                var updates = {
                    realName: realName,
                    screenName: screenName,
                    uuid: uuid,
                    identifyNum: identifyNum,
                    phoneNum: phoneNum,
                    lastLoginTime: new Date()
                };
                conn.query(updateSQL, [updates, phoneNum, uuid], function (err, RESULT) {//必须需要都正确匹配才能更新
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;
                    ep.emit("saveToMysql", RESULT);

                    app.redisClient.set(userInfoKeyName, JSON.stringify({//确保数据一致
                        realName: realName,
                        screenName: screenName,
                        uuid: uuid,
                        identifyNum: identifyNum,
                        phoneNum: phoneNum,
                        lastLoginTime: new Date()
                    }), ep.done("saveToRedis"));

                });

            } else { //表示数据库中没有找到需要更新微信信息的用户
                ep.emit("error", "没有找到需要更新基本信息的用户")
            }
        });
    });
}