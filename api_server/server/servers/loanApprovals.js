/**
 * Created by o3oNet on 16-1-26.
 */

var request = require('request');
var EventProxy = require("eventproxy");

exports.applyLoanApprovaling = function (req, res, next) {
    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};


    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(" @@@-- 增加审批时发生了错误 --@@@ ");
        console.error(err);
        sendObj.code = "10235";
        sendObj.error.title = err.title;
        res.send(sendObj);
    });

    ep.all("applyLoanApprovaling", function (a) {
            console.log(" !!!-- 增加审批时成功  ----!!! ");


            sendObj.code = "-1";
            console.log(a);
            sendObj.jsonData = a;
            res.send(sendObj);

            return;
        }
    );

    console.log("applyLoanApprovaling --- uuid" + req.session.uuid);


    request.post(app.clientAPI.getSingleUserApprovalingDataAPI + "/" + req.session.uuid, {
        form: {
            uuid: req.session.uuid,
            type: req.body.type
        },
        json: true
    }, function (err, response, body) {
        if (err) ep.emit("error", err);
        if (err) return;
        if (body.code != 0) {
            ep.emit("error", body.error);
            return;
        }
        ep.emit("applyLoanApprovaling", body.jsonData);
    });

}