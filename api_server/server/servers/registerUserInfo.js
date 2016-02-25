/**
 * Created by Administrator on 2015/11/28.
 */

var request = require('request');
var EventProxy = require("eventproxy");

//发送短信验证码
exports.registerByPhone = function (req, res, next) {
    //1.验证验证码
    //2.看看是否能获取到微信信息
    //3.看看

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var phoneNum = req.body.phoneNum;
    var identityCode = req.body.identityCode;
    var key = "identityNum" + ":" + phoneNum;
    var realName = req.body.realName;
    var identifyNum = req.body.identifyNum;

    app.redisClient.get(key, function (err, reply) {
        if (err) {
            sendObj.code = "1003";
            sendObj.error.title = "获取短信验证码失败";
            sendObj.error.detail = err;
            res.send(sendObj);
            return;
        }
        if (reply == identityCode) {

            var ep = new EventProxy();

            ep.fail(function (err) {
                console.error(" @@@-- 注册用户时发生了错误 --@@@ ");
                console.error(err);
                sendObj.code = "1023";
                sendObj.error.title = err.title;
                res.send(sendObj);
            });

            ep.all("registerByPhone", function (a) {
                    console.log(" !!!-- 注册用户信息成功 -- phoneNum -- " + phoneNum + " --!!! ");

                    req.session.uuid = a.uuid;
                    console.log("uuid----" + a.uuid);

                    sendObj.code = "-1";
                    sendObj.jsonData = {
                        uuid: uuid
                    };
                    res.send(sendObj);

                    return;
                }
            );

            var uuid = req.session.uuid;

            console.log(uuid);

            if (uuid) {
                request.patch(app.clientAPI.SingleUserBaseInfoAPI + "/" + uuid, {
                    form: {
                        uuid: uuid,
                        phoneNum: phoneNum,
                        realName: realName,
                        identifyNum: identifyNum
                    },
                    json: true
                }, function (err, response, body) {
                    if (err) ep.emit("error", err);
                    if (err) return;
                    if (body.code != 0) {
                        ep.emit("error", body.error);
                        return;
                    }
                    ep.emit("registerByPhone", body.jsonData);
                });
            } else {
                request.post(app.clientAPI.SingleUserBaseInfoAPI, {
                    form: {
                        phoneNum: phoneNum,
                        realName: realName,
                        identifyNum: identifyNum
                    },
                    json: true
                }, function (err, response, body) {
                    if (err) ep.emit("error", err);
                    if (err) return;
                    if (body.code != 0) {
                        ep.emit("error", body.error);
                        return;
                    }
                    ep.emit("registerByPhone", body.jsonData);
                });
            }


        } else {

            sendObj.code = "1023";
            sendObj.error.title = "验证码输入错误,请检查";
            res.send(sendObj);
            return;

        }
    });

}