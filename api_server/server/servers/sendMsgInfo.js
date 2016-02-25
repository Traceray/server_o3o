/**
 * Created by Administrator on 2015/11/28.
 */

var sendMessages = require("../../../func/sendMessages.js");
var utilSaveFunc = require("../../../func/utilSaveFunc.js");

//发送短信验证码
exports.sendMsg = function (req, res) {
    //1校验电话号码
    //2.生成短信验证码并缓存
    //3.发送短信息
    //4.异步保存发送的记录(redis,mysql)
    //TODO::控制每个电话号码每天最多发送的次数

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    //1.
    var phoneNum = req.body.phoneNum;

    //.一定得校验电话号码

    //2.
    utilSaveFunc.generateMsgIdentityCode(phoneNum, 5, function (err, identifyCode) {
        if (err) {
            sendObj.code = "1001";
            sendObj.error.title = "生成短信验证码失败";
            sendObj.error.detail = err;
            res.send(sendObj);
            return;
        }
        //3.
        sendMessages.sendMsg_identifyCode({mobile: phoneNum, identifyCode: identifyCode}, function (err) {
            if (err) {
                sendObj.code = "1002";
                sendObj.error.title = "调用接口发送短信验证码失败";
                sendObj.error.detail = err;
                res.send(sendObj);
                return;
            }
            sendObj.code = "-1";
            sendObj.strInfo = identifyCode;
            res.send(sendObj);

            //4.

        });


    });

}

