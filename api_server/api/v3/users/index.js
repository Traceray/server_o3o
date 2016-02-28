/**
 * Created by o3oNet on 16-1-24.
 */

var users = require("./user.wechat.js");

/**
 * 获取单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfo = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;

    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "获取当前用户信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    users.getSingleUserWeChatInfoByUuid(
        {
            uuid: uuid
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2005;
                sendObj.error.title = "获取当前用户信息失败!";
                sendObj.error.detatil = "无法正确的获取当前用户信息!";
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );

}

/**
 * 添加单个用户的信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.postSingleUserWeChatInfo = function (req, res, next) {


    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var data = req.body;

    var appid = data.appid;//
    var componentid = data.componentid;//
    var openid = data.openid;//
    var unionid = data.unionid;//
    var subscribe = data.subscribe;//
    var nickname = data.nickname;//
    var sex = data.sex;//
    var province = data.province;//
    var city = data.city;//
    var country = data.country;//
    var headimgurl = data.headimgurl;//
    var subscribe_time = data.subscribe_time;//
    var remark = data.remark;//
    var groupid = data.groupid;//

    //TODO::添加注释
    //TODO::校验数据
    //TODO::添加到API文档
    //TODO::同意错误码

    if (!openid) {
        sendObj.code = 2010;
        sendObj.error.title = "新增用户信息时openid不能为空!";
        return res.send(sendObj);
    }

    users.postSingleUserWeChatInfo(
        {
            appid: appid,
            componentid: componentid,
            openid: openid,
            unionid: unionid,
            subscribe: subscribe,
            nickname: nickname,
            sex: sex,
            province: province,
            city: city,
            country: country,
            headimgurl: headimgurl,
            subscribe_time: subscribe_time,
            remark: remark,
            groupid: groupid
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "提交新增用户信息时失败!";
                sendObj.error.detatil = err.toString();
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );

}

/**
 * 更新单个用户的状态信息(解绑或是换绑)
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserWeChatInfo = function (req, res, next) {

}

/**
 * 删除单个用户的信息
 * @param req
 * @param res
 * @param next
 */
exports.deleteSingleUserWeChatInfo = function (req, res, next) {

}

/**
 *更新单个用户的微信信息(部分信息)
 * @param req
 * @param res
 * @param next
 */
exports.patchSingleUserWeChatInfo = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;
    var openid = req.body.openid;
    var nickname = req.body.nickname;
    var sex = req.body.sex;
    var province = req.body.province;
    var city = req.body.city;
    var country = req.body.country;
    var headimgurl = req.body.headimgurl;


    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "更新单个用户的微信信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }


    if (!openid) {
        sendObj.code = 2010;
        sendObj.error.title = "更新单个用户的微信信息时openid不能为空!";
        res.send(sendObj);
        return;
    }

    users.patchSingleUserWeChatInfo(
        {
            uuid: uuid,
            openid: openid,
            nickname: nickname,
            sex: sex,
            province: province,
            city: city,
            country: country,
            headimgurl: headimgurl
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "更新单个用户的微信信息shi失败!";
                sendObj.error.detatil = err.toString();
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );


}

/**
 * 增加访问次数
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserVisitTimes = function (req, res, next) {

}

/**
 * 保存访客记录
 * @param req
 * @param res
 * @param next
 */
exports.saveVisitorLog = function (req, res, next) {

}


/**
 * 获取单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserBaseInfo = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;

    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "获取当前用户基本信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    users.getSingleUserBaseInfo(
        {
            uuid: uuid
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2005;
                sendObj.error.title = "获取当前用户基本信息失败!";
                sendObj.error.detatil = "无法正确的获取当前用户基本信息!";
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );

}

exports.postSingleUserBaseInfo = function (req, res, next) {//通过验证手机号方法注册获得的uuid,需在这里生成uuid

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var realName = req.body.realName;
    var screenName = req.body.screenName;
    var identifyNum = req.body.identifyNum;
    var phoneNum = req.body.phoneNum;

    //TODO::校验电话号码

    if (!phoneNum) {
        sendObj.code = 2010;
        sendObj.error.title = "新增用户基本信息时电话号码不能为空!";
        res.send(sendObj);
        return;
    }

    //if (!screenName && !realName) {
    //    sendObj.code = 2010;
    //    sendObj.error.title = "新增用户基本信息时昵称或是真实姓名必须有一个不为空不能为空!";
    //    res.send(sendObj);
    //    return;
    //}

    users.postSingleUserBaseInfo(
        {
            realName: realName,
            screenName: screenName,
            identifyNum: identifyNum,
            phoneNum: phoneNum,
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "提交新增用户基本信息时失败!";
                sendObj.error.detatil = err.toString();
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );


}

exports.patchSingleUserBaseInfo = function (req, res, next) {//必须有uuid

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;

    var realName = req.body.realName;
    var screenName = req.body.screenName;
    var identifyNum = req.body.identifyNum;
    var phoneNum = req.body.phoneNum;

    //TODO::校验电话号码


    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "更新单个用户的基本信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    if (!phoneNum) {
        sendObj.code = 2010;
        sendObj.error.title = "更新用户基本信息时电话号码不能为空!";
        res.send(sendObj);
        return;
    }


    users.patchSingleUserBaseInfo(
        {
            uuid: uuid,
            realName: realName,
            screenName: screenName,
            identifyNum: identifyNum,
            phoneNum: phoneNum,
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "更新新增用户基本信息时失败!";
                sendObj.error.detatil = err.toString();
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );
}