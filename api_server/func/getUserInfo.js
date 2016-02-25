/**
 * Created by o3oNet on 16-1-25.
 */

/**
 * getUsersLoanApprovalingList 直接调用了该文件
 * @type {request|exports|module.exports}
 */

var request = require('request');
var EventProxy = require("eventproxy");

module.exports = function (data, callback) {

    var userInfo = {};

    var uuid = data.uuid;
    if (!uuid) {
        callback(null, userInfo);
        return;
    }

    console.log(" !!!-- 开始获取用户的信息 -- uuid -- " + uuid + " --!!! ");
    var recordTimeLabel = "--- Get UserInfo Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(" @@@-- 获取用户信息时失败 --@@@ ");
        console.error(err);
        callback(err);
    });

    ep.all("getWeChatInfo", "getUserBaseInfo", function (a, b) {
            console.log(" !!!-- 获取用户信息成功 -- uuid -- " + uuid + " --!!! ");
            console.timeEnd(recordTimeLabel);

            userInfo.wechatInfo = a;
            userInfo.baseInfo = b;

            callback(null, userInfo);
        }
    )
    ;

    request.get(app.clientAPI.SingleUserBaseInfoAPI + "/" + uuid, {
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
        ep.emit("getWeChatInfo", body.jsonData);
    });


    request.get(app.clientAPI.getSingleUserBaseInfoAPI + "/" + uuid, {
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
        ep.emit("getUserBaseInfo", body.jsonData);
    });

}