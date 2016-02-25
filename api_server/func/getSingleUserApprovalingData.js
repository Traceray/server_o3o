/**
 * Created by o3oNet on 16-1-26.
 */
var request = require('request');
var EventProxy = require("eventproxy");

var getUserInfo = require("./getUserInfo");

module.exports = function (data, callback) {

    var uuid = data.uuid;

    console.log(" !!!-- 开始获取某个用户正在进行中的贷款审批数据 " + uuid + "--!!! ");
    var recordTimeLabel = "--- Get getSingleUserApprovalingData Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(" @@@-- 获取某个用户正在进行中的贷款审批数据时失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("getSingleUserApprovalingData", function (a) {
        console.log(" !!!-- 获取某个用户正在进行中的贷款审批数据成功 --!!! ");
        console.timeEnd(recordTimeLabel);

        if (!a) {
            callback(null, {
                uuid: "",
                loanApprovals: {},
                userInfo: {}
            });
        }

        var progressBar = Math.round((parseInt(a.currentStepIndex) + 1 ) / a.totalStepNum * 10000) / 100 + "%";
        var currentStatusTitle = a.steps[parseInt(a.currentStepIndex)].title;
        var processString = (parseInt(a.currentStepIndex) + 1 ) + " / " + a.totalStepNum;

        getUserInfo(
            {
                uuid: uuid
            }, function (err, jsonData) {

                if (err) callback(err);
                if (err) return;
                var data = {
                    uuid: uuid,
                    loanApprovals: Object.assign({
                        progressBar: progressBar,
                        currentStatusTitle: currentStatusTitle,
                        processString: processString
                    }, a),
                    userInfo: jsonData
                }
                callback(null, data)
            }
        );


    });


    request.get(app.clientAPI.getSingleUserApprovalingDataAPI + "/" + uuid, {
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
        ep.emit("getSingleUserApprovalingData", body.jsonData);
    });

}