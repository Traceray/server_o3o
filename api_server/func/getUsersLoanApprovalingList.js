/**
 * Created by o3oNet on 16-1-25.
 */

var request = require('request');
var EventProxy = require("eventproxy");

var getUserInfo = require("./getUserInfo");

module.exports = function (data, callback) {


    console.log(" !!!-- 开始获取正在进行中的贷款审批数据 --!!! ");
    var recordTimeLabel = "--- Get getUsersLoanApprovalingList Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(" @@@-- 获取当前正在进行中的贷款审批数据时失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("getUsersLoanApprovalingList", function (a, b) {
        console.log(" !!!-- 获取正在进行中的贷款审批数据成功 --!!! ");
        console.timeEnd(recordTimeLabel);

        var userInfoEp = new EventProxy();

        userInfoEp.fail(function (err) {
            ep.emit("error", err)
        });

        userInfoEp.after("getUserInfo", a.length, function (list) {
            callback(null, list);
        });

        a.forEach(function (row, index) {

            var uuid = row.uuid;

            //TODO::可以在这里做一些数据的修改

            var latestData = JSON.parse(row.latestData);
            var progressBar = Math.round((parseInt(latestData.currentStepIndex) + 1 ) / latestData.totalStepNum * 10000) / 100 + "%";
            var currentStatusTitle = latestData.steps[parseInt(latestData.currentStepIndex)].title;
            var processString = (parseInt(latestData.currentStepIndex) + 1 ) + " / " + latestData.totalStepNum;

            getUserInfo(
                {
                    uuid: uuid
                }, function (err, jsonData) {

                    if (err) userInfoEp.emit("error", err);
                    if (err) return;
                    var data = {
                        uuid: uuid,
                        loanApprovals: Object.assign({
                            progressBar: progressBar,
                            currentStatusTitle: currentStatusTitle,
                            processString: processString
                        }, latestData),
                        userInfo: jsonData
                    }
                    userInfoEp.emit("getUserInfo", data);
                }
            );

        });


    });

    request.get(app.clientAPI.getUsersLoanApprovalingListAPI, {
        form: {},
        json: true
    }, function (err, response, body) {
        if (err) ep.emit("error", err);
        if (err) return;
        console.log(body);
        if (body.code != 0) {
            ep.emit("error", body.error);
            return;
        }
        ep.emit("getUsersLoanApprovalingList", body.jsonData);
    });


}