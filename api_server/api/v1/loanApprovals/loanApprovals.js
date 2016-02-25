/**
 * Created by o3oNet on 16-1-22.
 */

var EventProxy = require("eventproxy");

var appConfig = require("config").get("app");

/***/

/**
 *
 * @param data
 * @param callback
 */
exports.getAllData = function (data, callback) {

    //TODO：：包含成功的数据和重新提交正在审核的数据

    //TODO::需要严格校验传入数据

    var filter_type = data.filter_type;
    var filter_status = data.filter_status;//TODO::校验filter_status

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(err);
        callback(err);
    });

    ep.all("getFromMysql", function (a, b) {
        callback(null, a);
    });

    //持久化查询信息到列表中
    //TODO::封装连接
    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
        if (err) ep.emit("error", err);
        if (err) return;

        var querySQL = "SELECT uuid,latestData,status,type,lastChangeAdminName,createTime FROM loanApprovals WHERE notAvailable = 0";

        if (filter_type) {
            querySQL += (" AND type = '" + filter_type + "'");
        }

        if (filter_status) {
            querySQL += (" AND status = '" + filter_status + "'");
        }

        querySQL += " ORDER BY loanApprovalsID DESC";

        console.log(querySQL);

        conn.query(querySQL, [], function (err, rows) {
            conn.release();
            if (err) ep.emit("error", err);
            if (err) return;
            ep.emit("getFromMysql", rows)
        });
    });


}


/**
 *
 * @param data
 * @param callback
 */
exports.getUsersLoanApprovalingList = function (data, callback) {

    var adminName = data.adminName;
    //TODO::根据管理员来获取相应的数据
    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(err);
        callback(err);
    });

    ep.all("getFromMysql", function (a, b) {
        callback(null, a);
    });

    //持久化查询信息到列表中
    //TODO::封装连接
    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
        if (err) ep.emit("error", err);
        if (err) return;

        var querySQL = "SELECT uuid,latestData,status,type,lastChangeAdminName,createTime FROM loanApprovals WHERE notAvailable = 0 AND status = 1 ORDER BY loanApprovalsID DESC";

        console.log(querySQL);

        conn.query(querySQL, [], function (err, rows) {
            conn.release();
            if (err) ep.emit("error", err);
            if (err) return;
            ep.emit("getFromMysql", rows)
        });
    });
}


/**
 * 获取当前用户所有的审批数据
 * @param data
 * @param callback
 */
exports.getSingleUserAllData = function (data, callback) {//获取当前在进行中的数据信息
    var uuid = data.uuid;

    var filter_type = data.filter_type;
    var filter_status = data.filter_status;//TODO::校验filter_status

    var ep = new EventProxy();
    ep.fail(function (err) {
        console.error(err);
        callback(err);
    });

    ep.all("getFromMysql", function (a, b) {
        callback(null, a);
    });

    //持久化查询信息到列表中
    //TODO::封装连接
    app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
        if (err) ep.emit("error", err);
        if (err) return;

        var querySQL = "SELECT uuid,latestData,status,type,lastChangeAdminName,createTime FROM loanApprovals WHERE notAvailable = 0 AND uuid = ? ";

        if (filter_type) {
            querySQL += (" AND type = '" + filter_type + "'");
        }

        if (filter_status) {
            querySQL += (" AND status = '" + filter_status + "'");
        }

        querySQL += " ORDER BY loanApprovalsID DESC";

        console.log(querySQL);

        conn.query(querySQL, [uuid], function (err, rows) {
            conn.release();
            if (err) ep.emit("error", err);
            if (err) return;
            ep.emit("getFromMysql", rows)
        });
    });

}

/**
 * 获取当前用户正在审批的数据
 * @param data
 * @param callback
 */
exports.getSingleUserApprovalingData = function (data, callback) {
    var uuid = data.uuid;

    var loanApprovalsKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "loanApprovals" + ":" + uuid;

    app.redisClient.get(loanApprovalsKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
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
 * 新增一个审批流程到内存中
 * @param data
 * @param callback
 */
exports.postSingleUserNewLoanApprovals = function (data, callback) {//如果存在则返回之前的数据

    var uuid = data.uuid;
    var type = data.type;

    var loanApprovalsKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "loanApprovals" + ":" + uuid;


    app.redisClient.get(loanApprovalsKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
        if (err) callback(err);
        if (err) return;

        if (reply) {//如果存在则返回该人的信息
            callback("缓存数据库中尚有未处理的贷款审批信息,无法新增!");
            return;
        }

        var initJsonObj = {};

        var shangDaiJsonObj = {//商贷初始化数据
            title: "商贷贷款审核信息",
            type: "sd",
            totalStepNum: 8,
            currentStepIndex: 0,
            steps: [
                {
                    title: "提交系统确认请求",
                    status: "ing",//wait,sthWrong,success,error,ing
                    date: new Date(),
                    info: "预计需要1个工作日",
                    showMsg: "在页面显示数据",
                    linkTo: ""
                },
                {
                    title: "银行面鉴",
                    status: "wait",//wait,sthWrong,success,err,ing
                    date: new Date(),
                    info: "预计需要1个工作日",
                    showMsg: "1.信贷员拍照。2.二次银行征信。",
                    linkTo: ""
                },
                {
                    title: "银行鉴卷",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "预计需要1个工作日",
                    showMsg: "提交卷到银行，等待银行校验",
                    linkTo: ""
                },
                {
                    title: "作卷存档",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "预计需要1个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "信贷员初步审核",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "预计需要2个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "分行审核签字确认",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "预计需要3个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "进房产局抵押确认",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "预计需要5个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "银行放款、领取还款合同",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "预计需要2个工作日",
                    showMsg: "",
                    linkTo: ""
                }
            ],
            notifyMsg: ""//其他消息
        };

        var gongJiJinJsonObj = {//初始化数据
            title: "公积金贷款审核信息",
            type: "gjj",
            totalStepNum: 5,
            currentStepIndex: 0,
            steps: [
                {
                    title: "提交系统确认请求",
                    status: "ing",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "大概需要1天",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "公积金中心面鉴",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "鉴卷",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "做卷",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "银行借贷员手鉴",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "到房产局抵押",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "公积金中心放款",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "领取抵押合同",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "",
                    linkTo: ""
                }
            ],
            notifyMsg: ""//其他消息
        };

        var hunHeDaiJsonObj = {//初始化数据
            title: "混合贷贷款审核信息",
            type: "hhd",
            totalStepNum: 5,
            currentStepIndex: 0,
            steps: [
                {
                    title: "提交系统确认请求",
                    status: "ing",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "大概需要1天",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "银行面签",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "1个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "签卷",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "",
                    showMsg: "1个工作日",
                    linkTo: ""
                },
                {
                    title: "做卷存档",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "1个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "售货员初步审核",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "2个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "分行审核签字",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "3个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "进房产局抵押",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "5个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "银行放款领取还款合同",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "2个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "公积金当面签",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "1个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "签卷",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "4个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "做卷",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "3个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "售货员手签",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "4个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "公积金中心签字",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "4个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "到房产局抵押",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "5个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "公积金中心放款",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "2个工作日",
                    showMsg: "",
                    linkTo: ""
                },
                {
                    title: "领取抵押合同",
                    status: "wait",//wait,sthWrong,scuess,err,ing
                    date: new Date(),
                    info: "2个工作日",
                    showMsg: "",
                    linkTo: ""
                }
            ],
            notifyMsg: ""//其他消息
        };


        if (type == "sd") {//
            initJsonObj = shangDaiJsonObj;
        } else if (data.type == 'gjj') {
            initJsonObj = gongJiJinJsonObj;
        } else if (data.type == 'hhd') {
            initJsonObj = hunHeDaiJsonObj;
        } else {
            initJsonObj = shangDaiJsonObj;
        }


        //TODO::保存数据到Mysql中,现在只存储列表信息
        //TODO::错误信息统一处理
        //TODO::封装数据保存方式
        //TODO::封装同步数据的方法
        //TODO::从Mysql中更新Redis缓存

        //TODO::使用MD5加密校验数据
        //TODO::使用Mongodb封装保存数据

        //TODO::将用户分组显示


        var ep = new EventProxy();
        ep.fail(function (err) {
            console.error(err);
            callback(err);
        });

        ep.all("saveToRedis", "saveToMysql", function (a, b) {
            callback(null, "ok");
        });

        //持久化查询信息到列表中
        //TODO::封装连接
        app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
            if (err) ep.emit("error", err);
            if (err) return;

            var insertSQL = "INSERT INTO loanApprovals SET ?";
            var inserts = {
                uuid: uuid,
                initData: JSON.stringify(initJsonObj),
                lastData: "",
                latestData: JSON.stringify(initJsonObj),
                type: type,
                notAvailable: 0,//0.可用，1.不可用
                status: 1,//0.成功完成,1.进行中,2.审核失败.3.用户主动取消4.用户被动取消5.其他错误
                createAdminName: "superAdmin",
                createTime: new Date,
                lastChangeAdminName: "superAdmin",
                lastChangeTime: new Date(),
            }
            conn.query(insertSQL, inserts, function (err, result) {
                conn.release();
                if (err) ep.emit("error", err);
                if (err) return;
                app.redisClient.set(loanApprovalsKeyName, JSON.stringify(Object.assign({loanApprovalsID: result.insertId}, initJsonObj)), ep.done("saveToRedis"));//正常这里出错的概率很小
                ep.emit("saveToMysql", result);
            });
        });

    });
}

/**
 * 更新当前正在缓存中进行着的数据
 * 1.整个审批流程的状态
 * 2.删除或取消整个流程的数据
 * 3.目前无法做到回退
 * 4. 1.success 2.fail  3.other
 * @param data
 * @param callback
 */
exports.putSingleUserApprovalingData = function (data, callback) {//更新Mysql大字段信息

    var uuid = data.uuid;
    var putType = data.putType;
    var changeAdminName = data.changeAdminName;
    var changeNote = data.changeNote;

    var loanApprovalsKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "loanApprovals" + ":" + uuid;


    //TODO::目前只处理审核通过和审核失败的流程

    //1.
    if (putType == "success" || putType == "fail" || putType == "other") {
        var changeStatus = 1;
        if (putType == "success") {
            changeStatus = 0;
        } else if (putType == "fail") {
            changeStatus = 2;
        } else if (putType == "other") {
            changeStatus = 5;
        }

        var newKeyName = loanApprovalsKeyName + ":" + putType;

        app.redisClient.get(loanApprovalsKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
            if (err) callback(err);
            if (err) return;

            if (reply) {//如果存在则返回该人的信息

                var jsonObj = JSON.parse(reply);

                var ep = new EventProxy();
                ep.fail(function (err) {
                    console.error(err);
                    callback(err);
                });

                ep.all("putChangeToRedis", "putChangeToMysql", function (a, b) {
                    callback(null, "ok");
                });

                app.redisClient.RENAMENX(loanApprovalsKeyName, newKeyName, ep.done("putChangeToRedis"));

                app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
                    if (err) ep.emit("error", err);
                    if (err) return;

                    var updateSQL = "UPDATE loanApprovals SET ? WHERE loanApprovalsID = ?";
                    var updates = {
                        status: changeStatus,//0.成功完成,1.进行中,2.审核失败,3.用户主动取消,4.用户被动取消,5.其他错误
                        notAvailable: 0,//0.可用，1.不可用
                        lastChangeAdminName: changeAdminName,
                        lastChangeTime: new Date(),
                        note: changeNote
                    }
                    conn.query(updateSQL, [updates, jsonObj.loanApprovalsID], function (err, result) {
                        conn.release();
                        if (err) ep.emit("error", err);
                        if (err) return;

                        ep.emit("putChangeToMysql", result);
                    });
                });


            } else {
                callback("无法获取到需要变更的贷款审批信息,可能数据已经删除!");
                return;
            }

        });


    } else {
        callback("更新贷款审批状态时，无法正确的获取到操作类型!,[success,fail,other]");
    }
    //2.

}

/**
 * 更新当前正在缓存中进行着的数据
 * 1.某一步的审核状态和提示信息
 * 2.一些成功后的处理数据
 * @param data
 * @param callback
 */
exports.patchSingleUserApprovalingData = function (data, callback) {//更新Redis小字段信息

    var uuid = data.uuid;
    var stepIndex = parseInt(data.stepIndex);
    var changeStatus = data.changeStatus;
    var changeShowMsg = data.changeShowMsg;
    var changeAdminName = data.changeAdminName;

    //TODO::当前不允许跳步执行，后期可考虑跳步
    //TODO::当前允许回退操作，之后考虑取消
    //TODO::回退操作

    var loanApprovalsKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "loanApprovals" + ":" + uuid;


    app.redisClient.get(loanApprovalsKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
        if (err) callback(err);
        if (err) return;

        if (reply) {//如果存在则返回该人的信息

            var jsonObj = JSON.parse(reply);

            var originJsonObj = jsonObj;

            if (stepIndex <= jsonObj.currentStepIndex && stepIndex <= jsonObj.totalStepNum - 1) {
                jsonObj.steps[stepIndex].status = changeStatus;
                jsonObj.steps[stepIndex].showMsg = changeShowMsg;
                jsonObj.steps[stepIndex].date = new Date();
            } else {
                callback("修改的贷款审批流程时传入的StepIndex大于当前可操作的步数!");
                return;
            }


            if (stepIndex == jsonObj.currentStepIndex && changeStatus == "success") {//当提交的当前步审核成功，增加一个步进
                jsonObj.currentStepIndex += 1;

                if (stepIndex < jsonObj.totalStepNum - 1) {
                    jsonObj.steps[stepIndex + 1].status = "ing";
                    jsonObj.steps[stepIndex + 1].date = new Date();
                }
            }

            //if (jsonObj.currentStepIndex == jsonObj.totalStepNum && changeStatus == "success") {//当前步为最后一步时，更新整个状态 1.更新mysql字段  2.删除Redis缓存信息
            //    //TODO::另起一个操作
            //
            //} else {
            //
            //}

            //更新数据到
            var ep = new EventProxy();

            ep.fail(function (err) {
                console.error(err);
                callback(err);
                return;
            });

            ep.all("updateToRedis", "updateToMysql", function (a, b) {
                callback(null, "ok");
            });

            app.redisClient.set(loanApprovalsKeyName, JSON.stringify(jsonObj), ep.done("updateToRedis"));//正常这里出错的概率很小

            app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
                if (err) ep.emit("error", err);
                if (err) return;

                var updateSQL = "UPDATE loanApprovals SET ? WHERE loanApprovalsID = ?";
                var updates = {
                    lastData: JSON.stringify(originJsonObj),
                    latestData: JSON.stringify(jsonObj),
                    notAvailable: 0,//0.可用，1.不可用
                    lastChangeAdminName: changeAdminName,
                    lastChangeTime: new Date(),
                }
                conn.query(updateSQL, [updates, jsonObj.loanApprovalsID], function (err, result) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;

                    ep.emit("updateToMysql", result);
                });
            });


        } else {
            callback("没有匹配到待修改的贷款审批流程");
            return;
        }
    });
}

/**
 * 删除当前正在审批中的数据
 * 1.用户主动取消
 * 2.用户被动删除该请求
 * @param data
 * @param callback
 */
exports.deleteSingleUserApprovalingData = function (data, callback) {

    var uuid = data.uuid;
    var changeStatus = data.changeStatus;
    var changeAdminName = data.changeAdminName;
    var changeNote = data.changeNote

    var loanApprovalsKeyName = appConfig.multipleShare.sysName + ":" + appConfig.baseInfo.appName + ":" + "loanApprovals" + ":" + uuid;
    var newKeyName = loanApprovalsKeyName + ":" + "delete";


    app.redisClient.get(loanApprovalsKeyName, function (err, reply) {//TODO::从缓存和MySql中分别查询
        if (err) callback(err);
        if (err) return;

        if (reply) {//如果存在则返回该人的信息

            var jsonObj = JSON.parse(reply);
            var ep = new EventProxy();

            ep.fail(function (err) {
                console.error(err);
                callback(err);
            });

            ep.all("deleteToRedis", "deleteToMysql", function (a, b) {
                callback(null, "ok11");
            });

            app.redisClient.RENAME(loanApprovalsKeyName, newKeyName, ep.done("deleteToRedis"));

            app.mysqlPooling.mysqlSyljPool.getConnection(function (err, conn) {
                if (err) ep.emit("error", err);
                if (err) return;

                var updateSQL = "UPDATE loanApprovals SET ? WHERE loanApprovalsID = ?";
                var updates = {
                    status: changeStatus,//0.成功完成,1.进行中,2.审核失败,3.用户主动取消,4.用户被动取消,5.其他错误
                    notAvailable: 0,//0.可用，1.不可用
                    lastChangeAdminName: changeAdminName,
                    lastChangeTime: new Date(),
                    note: changeNote
                }
                conn.query(updateSQL, [updates, jsonObj.loanApprovalsID], function (err, result) {
                    conn.release();
                    if (err) ep.emit("error", err);
                    if (err) return;

                    ep.emit("deleteToMysql", result);
                });
            });


        } else {
            callback("无法获取到需要删除的贷款审批信息,可能数据已经删除!");
            return;
        }

    });

}
