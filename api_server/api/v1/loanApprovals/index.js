/**
 * Created by o3oNet on 16-1-19.
 */

var loanApprovals = require("./loanApprovals.js");


exports.getAllData = function (req, res, next) {//获取所有的贷款审批人员和信息

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var filter_type = req.query.type;
    var filter_status = req.query.status;

    if (filter_type && filter_type != "sd" && filter_type != "gjj" && filter_type != "hhd") {
        filter_type = "";
    }

    if (filter_status && filter_status != 0 && filter_status != 1 && filter_status != 2 && filter_status != 3) {
        filter_status = "";
    }

    loanApprovals.getAllData(
        {
            filter_type: filter_type,
            filter_status: filter_status
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "获取贷款审批信息失败!";
                sendObj.error.detatil = "无法正确的获取贷款审批信息!";
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
 * 正在审批中的贷款信息列表
 * @param req
 * @param res
 * @param next
 */
exports.getUsersLoanApprovalingList = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    loanApprovals.getUsersLoanApprovalingList(
        {},
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2005;
                sendObj.error.title = "获取正在进行中贷款审批列表信息失败!";
                sendObj.error.detatil = "无法正确的获取正在进行中贷款审批列表信息!";
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );

}

exports.getSingleUserApprovalingData = function (req, res, next) {
    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;

    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "获取当前用户正在进行中贷款审批信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    loanApprovals.getSingleUserApprovalingData(
        {
            uuid: uuid
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2005;
                sendObj.error.title = "获取当前用户正在进行中贷款审批信息失败!";
                sendObj.error.detatil = "无法正确的获取当前用户正在进行中贷款审批信息!";
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );
}

exports.getSingleUserAllData = function (req, res, next) {

    //如果没有数据 则新建数据返回

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;
    var filter_type = req.query.type;
    var filter_status = req.query.status;

    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "获取贷款审批信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    if (filter_type && filter_type != "sd" && filter_type != "gjj" && filter_type != "hhd") {
        filter_type = "";
    }

    if (filter_status && filter_status != 0 && filter_status != 1 && filter_status != 2 && filter_status != 3) {
        filter_status = "";
    }

    loanApprovals.getSingleUserAllData(
        {
            uuid: uuid,
            filter_type: filter_type,
            filter_status: filter_status
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "获取贷款审批信息失败!";
                sendObj.error.detatil = "无法正确的获取贷款审批信息!";
                res.send(sendObj);
            } else {
                sendObj.code = 0;
                sendObj.jsonData = jsonObj;
                res.send(sendObj);
            }
        }
    );

}

exports.getUserList = function (req, res, next) {
    console.log("--getUserList--");
    res.send('This is not implemented now');
}

exports.getUserListIds = function (req, res, next) {
    console.log("--getUserListIds--");
    res.send('This is not implemented now');
}

/**
 * 更新正在内存中贷款审核的状态
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserApprovalingData = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;
    var putType = req.body.putType;
    var changeAdminName = req.body.changeAdminName;
    var changeNote = req.body.changeNote;


    if (!uuid) {
        sendObj.code = 2010;
        sendObj.error.title = "更新用户贷款审批信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    //wait,sthWrong,success,error,ing

    if (!putType || putType && putType != "success" && putType != "fail" && putType != "other") {
        sendObj.code = 2021;
        sendObj.error.title = "更新用户贷款审批信息时无法匹配更新状态标识!,[success,fail,other]";
        res.send(sendObj);
        return;
    }

    loanApprovals.putSingleUserApprovalingData(
        {
            uuid: uuid,
            putType: putType,
            changeAdminName: changeAdminName,
            changeNote: changeNote
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "提交新增贷款审批信息失败!";
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

exports.postSingleUserNewLoanApprovals = function (req, res, next) {//增加审批用户数据

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};

    var uuid = req.params.userid;
    var type = req.body.type;

    if (!uuid) {
        sendObj.code = 2001;
        sendObj.error.title = "新增贷款审批信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    if (!type) {
        sendObj.code = 2002;
        sendObj.error.title = "新增贷款审批信息时type不能为空!";
        res.send(sendObj);
        return;
    }

    loanApprovals.postSingleUserNewLoanApprovals(
        {
            uuid: uuid,
            type: type
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2003;
                sendObj.error.title = "提交新增贷款审批信息失败!";
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

exports.deleteSingleUserApprovalingData = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};//

    var uuid = req.params.userid;
    var changeStatus = req.body.changeStatus;
    var changeAdminName = req.body.changeAdminName;
    var changeNote = req.body.changeNote;

    if (!uuid) {
        sendObj.code = 2020;
        sendObj.error.title = "删除某个用户贷款审批信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }


    if (!changeStatus || changeStatus && changeStatus != 3 && changeStatus != 4) {
        sendObj.code = 2021;
        sendObj.error.title = "删除某个用户贷款审批信息时无法匹配删除状态标识且不能为空!,[3,4]";
        res.send(sendObj);
        return;
    }

    loanApprovals.deleteSingleUserApprovalingData(
        {
            uuid: uuid,
            changeStatus: changeStatus,
            changeAdminName: changeAdminName,
            changeNote: changeNote
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2022;
                sendObj.error.title = "删除某个用户贷款审批信息失败!";
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

exports.patchSingleUserApprovalingData = function (req, res, next) {//

    var sendObj = {code: -1, error: {title: "", detatil: ""}, jsonData: {}, strInfo: ""};//

    var uuid = req.params.userid;
    var stepIndex = req.body.stepIndex;
    var changeStatus = req.body.changeStatus;
    var changeShowMsg = req.body.changeShowMsg;
    var changeAdminName = req.body.changeAdminName;

    if (!uuid) {
        sendObj.code = 2010;
        sendObj.error.title = "更新用户贷款审批信息时uuid不能为空!";
        res.send(sendObj);
        return;
    }

    //wait,sthWrong,success,error,ing

    if (changeStatus && changeStatus != "wait" && changeStatus != "sthWrong" && changeStatus != "success" && changeStatus != "error" && changeStatus != "ing") {
        sendObj.code = 2021;
        sendObj.error.title = "更新用户贷款审批信息时无法匹配更新状态标识!,[wait,sthWrong,success,error,ing]";
        res.send(sendObj);
        return;
    }

    if (isNaN(parseInt(stepIndex))) {
        sendObj.code = 2021;
        sendObj.error.title = "更新用户贷款审批信息时步揍Index必须为数字!";
        res.send(sendObj);
        return;
    }

    //详细的数据校验
    loanApprovals.patchSingleUserApprovalingData(
        {
            uuid: uuid,
            stepIndex: stepIndex,
            changeStatus: changeStatus,
            changeShowMsg: changeShowMsg,
            changeAdminName: changeAdminName
        },
        function (err, jsonObj) {
            if (err) {
                sendObj.code = 2011;
                sendObj.error.title = "更新用户贷款审批信息失败!";
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

exports.put = function (req, res, next) {//更新数据
    res.send("put info");
}

exports.delete = function (req, res, next) {
    res.send("delete info");
}