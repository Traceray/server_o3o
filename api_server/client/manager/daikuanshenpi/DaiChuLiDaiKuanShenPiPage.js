/**
 * Created by o3oNet on 16-1-18.
 * 待处理贷款审批
 */


var EventProxy = require("eventproxy");

var func = require("../../../func");

//显示主页
exports.home = function (req, res, next) {

    //分别获取数据
    var hbsData = {};

    //res.render("manager/home.hbs", hbsData);//

    //TODO::数据访问权限 缓存数据到MongoDB中 分页


    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error("显示贷款审批页面失败!");
        console.error(err);
        res.send("查询数据失败，请返回重试!");
        return;
    });

    ep.all("getUsersLoanApprovalingList", function (a) {
        var hdsData = {};
        hdsData.usersLoanApprovals = a;

        res.render("manager/daikuanshenpi/DaiChuLiDaiKuanShenPiPage.hbs", hdsData);


    });


    func.getUsersLoanApprovalingList(
        {}, function (err, jsonObj) {
            if (err) ep.emit("error", err);
            if (err) return;
            ep.emit("getUsersLoanApprovalingList", jsonObj);
        }
    );

}


exports.detail = function (req, res, next) {
    var uuid = req.params.userid;
    if (!uuid) {
        res.send("无法获取到当前用户的贷款审批信息,可能该用户已经审批完成!");
        return;
    }

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error("显示贷款审批页面失败!");
        console.error(err);
        res.send("查询数据失败，请返回重试!");
        return;
    });

    ep.all("getSingleUserApprovalingData", function (a) {
        var hdsData = {};
        hdsData.userLoanApprovalingData = a;
        //res.send(hdsData);

        res.render("manager/daikuanshenpi/DaiChuLiDaiKuanShenPiXiangXiPage.hbs", hdsData);

    });


    func.getSingleUserApprovalingData(
        {
            uuid: uuid
        }, function (err, jsonObj) {
            if (err) ep.emit("error", err);
            if (err) return;
            ep.emit("getSingleUserApprovalingData", jsonObj);
        }
    );


}
