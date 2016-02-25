/**
 * Created by Administrator on 2015/11/26.
 */

var httpHelper = require('../lib/httpHelper.js');
var xml2js = require('xml2js');
var request = require('request');
var apiStore = require("config").get("apiStore");
var urlencode = require('urlencode2');

exports.sendMsg_identifyCode = function (opt, callback) {

    var mobile = opt.mobile;
    var identifyCode = opt.identifyCode;
    var content = "【自餐厅】校验码:" + identifyCode + " 用于手机账号注册(30分钟内有效)";
    var url = "http://apis.baidu.com/kingtto_media/106sms/106sms?mobile=" + mobile + "&content=" + urlencode(content);

    request.get(
        {
            url: url,
            headers: {
                'apikey': apiStore.msg106Apikey
            }
        }
        , function (error, response, body) {
            if (error) {
                callback(error);
                return;
            }

            if (!error && response.statusCode == 200) {
                xml2js.parseString(body, {
                    trim: true,
                    explicitArray: false
                }, function (err, json) {
                    if (err) {
                        console.error("__@@@__ %s __@@@__" + "请求短信服务失败!")
                        console.error(err);
                        callback(err);
                        return false;
                    }

                    var data = json ? json.returnsms : {};

                    var returnstatus = data.returnstatus;

                    if (returnstatus != "Success") {
                        console.error("__@@@__ %s __@@@__" + "发送验证码短信失败!")
                        console.error(data);
                        callback("fail")
                    } else {
                        callback(null, "ok")
                    }
                });
            }

        });
}


exports.sendMsgTest = function (req, res, callback) {

    var mobile = "15279282851";
    //var content = "【自餐厅】校验码:236587 用于手机账号注册(30分钟内有效)";
    var content = "【自餐厅】 您的自餐厅美食已经被确认。由自餐厅专送人员邵澜星15288888888为您配送。";
    var url = "http://apis.baidu.com/kingtto_media/106sms/106sms?mobile=" + mobile + "&content=" + urlencode(content);

    console.log(url);

    request.get(
        {
            url: url,
            headers: {
                'apikey': apiStore.msg106Apikey
            }
        }
        , function (error, response, body) {
            if (error) {
                callback(error);
                return;
            }
            console.log(error);
            console.log(body);

            if (!error && response.statusCode == 200) {
                //var info = JSON.parse(body);
                xml2js.parseString(body, {
                    trim: true,
                    explicitArray: false
                }, function (err, json) {
                    if (err) {
                        console.error(err);
                        return false;
                    }

                    var data = json ? json.returnsms : {};

                    var returnstatus = data.returnstatus;

                    if (returnstatus != "Success") {
                        res.send(data)
                    } else {
                        res.send(data);
                    }

                    console.log(data);
                    res.send(data);
                });

            }


        });

}