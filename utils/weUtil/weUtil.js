/**
 * Created by Administrator on 2015/11/17.
 */
var appConfig = require("config").get("app");
var wechatConfig = require("config").get("wechat");

var client = require('../../lib/connRedis1.js');
var httpHelper = require('../../lib/httpHelper.js');
var wepayUtil = require("./wePayUtil.js");
var util = require('../util.js');

var WXPay = require('weixin-pay');


/***
 * 封装各种微信相关的请求
 * @param pageUrl
 * @param callback
 */

//获取jssdk的ApiTicket
exports.getJSApiTicket = function (pageUrl, callback) {

    var appid = wechatConfig.wxAppConfig.appid;
    var secret = wechatConfig.wxAppConfig.secret;

    var JSApiTicketKeyName = appConfig.multipleShare.sysName + ":" + "jsapi_ticket:" + appid;

    client.get(JSApiTicketKeyName, function (err, reply) {
        if (err) {
            console.error("___@___ %s ___@___", "从Redis数据库获取jsApiTicket失败 redisKey=" + JSApiTicketKeyName);
            console.error(err.stack);
            callback(err);
            return;
        }

        //TODO:::

        //redis中存在
        if (reply) {

            console.log("___@___ %s ___@___", "jsapi_ticket is alive redisKey = " + JSApiTicketKeyName);
            console.log("jsapi_ticket:" + reply.toString());

            var ret = {
                noncestr: wepayUtil.createNonceStr(),
                timestamp: wepayUtil.createTimestamp(),
                url: pageUrl,
                jsapi_ticket: reply.toString()
            }

            var signature = wepayUtil.createJSApiSign(ret);

            var wxConfig = {
                appId: appid,
                timestamp: ret.timestamp,
                nonceStr: ret.noncestr,
                signature: signature
            }

            console.log("___&___ %s ___&___", "generate JSsdk sign success : URL : " + pageUrl);
            console.log(wxConfig);

            callback(null, wxConfig);
            return;
        }

        //不存在则重新生成并保存
        console.log("___&___ %s ___&___", "jsapi_ticket is out of alive redisKey=" + JSApiTicketKeyName);
        //访问微信API
        var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
        httpHelper.get(url, 30000, function (err, data) {
            if (err) {
                console.error("___@___ %s ___@___", "链接微信WXAPI获取access_token失败 URL: " + url);
                console.error(err.stack);
                callback(err);
                return;
            }

            var json = util.tryParseJson("" + data);

            if (!json) {
                console.error("无法解析json字符串为obj");
                callback(" cannot parse data from weixin  ");
                return;
            }

            var access_token = json.access_token;

            if (!access_token) {
                console.error("access_token为空或undefined");
                callback("access_token is empty or undefined");
                return;
            }

            //访问微信API
            var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";
            httpHelper.get(url, 30000, function (err, data) {
                if (err) {
                    console.error("___@___ %s ___@___", "链接微信WXAPI获取jsapi_ticket失败 URL: " + url);
                    console.error(err.stack);
                    callback(err);
                    return;
                }

                var json = util.tryParseJson("" + data);

                if (!json) {
                    console.error("无法解析json字符串为obj");
                    callback(" cannot parse data from weixin  ");
                    return;
                }

                var jsapi_ticket = json.ticket;

                if (!jsapi_ticket) {
                    console.error("jsapi_ticket为空或undefined");
                    callback("jsapi_ticket is empty or undefined");
                    return;
                }
                console.log("jsapi_ticket:" + jsapi_ticket);

                //异步缓存中奖规则
                client.set(JSApiTicketKeyName, jsapi_ticket, function (err, reply) {//中奖规则
                    if (err) {
                        console.error("___@___ %s ___@___", "将jsApiTicket缓存到redis失败 redisKey=" + JSApiTicketKeyName);
                        console.error(err.stack);
                        callback(err);
                        return;
                    }

                    console.log("___&___ %s ___&___", "set jsapi_ticket ok");

                    client.expire(JSApiTicketKeyName, 6000, function (err, reply) {
                        if (err) {
                            console.error("___&___ %s ___&___", "set redis key expire fail");
                            return;
                        }
                        if (reply != 1) {
                            console.error("___&___ %s ___&___", "set jsapi_ticket expire failed ");
                        } else {
                            console.log("___&___ %s ___&___", "set jsapi_ticket expire scuess ");
                        }

                    });
                });

                //返回数据
                var ret = {
                    noncestr: wepayUtil.createNonceStr(),
                    timestamp: wepayUtil.createTimestamp(),
                    url: pageUrl,
                    jsapi_ticket: jsapi_ticket
                }

                var signature = wepayUtil.createJSApiSign(ret);

                var wxConfig = {
                    appId: appid,
                    timestamp: ret.timestamp,
                    nonceStr: ret.noncestr,
                    signature: signature
                }

                console.log("___&___ %s ___&___", "generate JSsdk sign success : URL : " + pageUrl);
                console.log(wxConfig);
                callback(null, wxConfig);

            }, "'UTF-8'");
        }, "'UTF-8'");


    });

}

//获取微信支付时的预订单号
exports.getReplayId = function () {

    WXPay.getBrandWCPayRequestParams({
        openid: '微信用户 openid',
        body: '公众号支付测试',
        detail: '公众号支付测试',
        out_trade_no: '20150331' + Math.random().toString().substr(2, 10),
        total_fee: 1,
        spbill_create_ip: '192.168.2.210',
        notify_url: 'http://wxpay_notify_url'
    }, function (err, result) {
        debugger;
        // in express
        //res.render('wxpay/jsapi', {payargs: result})


    });

}


/**
 * 微信静默授权 仅获取openid
 * @param code
 * @param callback
 */
exports.oauth = function (code, callback) {

    var appid = wechatConfig.wxAppConfig.appid;
    var secret = wechatConfig.wxAppConfig.secret;

    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=authorization_code";

    console.log("  @@---------------  pre get oauth  wechat ----------------------------@@  ");
    console.log(" @@@-- appid:" + appid + " --@@@ ");
    console.log(" @@@-- url:" + url + " --@@@ ");

    httpHelper.get(url, 30000, function (err, data) {
        if (err) {
            console.error("  @@---------------  get oauth  wechat data failed  ----------------------------@@  ");
            console.error(err);
            callback(err);
            return;
        }

        var jsonObj = util.tryParseJson("" + data);

        console.log("  @@---------------  geted oauth  wechat data scuessed  ----------------------------@@  ");
        console.log(" !!!------ jsonObj -------!!! ");
        console.log(jsonObj);

        if (!jsonObj) {
            console.error("  @@---------------  parse oauth  wechat data failed ----------------------------@@  ");
            callback("  @@---------------  parse oauth  wechat data failed ----------------------------@@  ");
            return;
        }

        //TODO::校验微信

        if (jsonObj.errcode) {
            console.error("_____@_______ %s _____@_____", "微信返回了一个错误");
            console.error("_____@_______ %s _____@_____", jsonObj.errmsg);
            callback(jsonObj.errmsg);
            return;
        }

        var access_token = jsonObj.access_token;
        var openid = jsonObj.openid;//用户唯一标识

        if (!access_token) {
            console.error("从微信返回的数据无法解析出access_token 为空或undefined");
            callback("access_token is empty or undefined");
            return;
        }

        if (!openid) {
            console.error("从微信返回的数据无法解析出openid 为空或undefined");
            callback("openid is empty or undefined");
            return;
        }

        console.log("  @@---------------  parse oauth  wechat data scuessed ----------------------------@@  ");
        console.log(" @@@-- openid:" + openid + " --@@@ ");

        //返回openid
        callback(null, jsonObj);


    }, 'UTF-8');


}

/**
 * 微信授权 获取用户基本信息
 * @param code
 * @param callback
 */
exports.oauth2 = function (code, callback) {

    var appid = wechatConfig.wxAppConfig.appid;
    var secret = wechatConfig.wxAppConfig.secret;

    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=authorization_code";

    console.log("  @@---------------  pre get oauth2  wechat ----------------------------@@  ");
    console.log(" @@@-- appid:" + appid + " --@@@ ");
    console.log(" @@@-- url:" + url + " --@@@ ");


    httpHelper.get(url, 30000, function (err, data) {
        if (err) {
            console.error("  @@---------------  geted oauth2 wechat data failed  ----------------------------@@  ");
            console.error(err);
            callback(err);
            return;
        }

        var jsonObj = util.tryParseJson("" + data);

        console.log("  @@---------------  geted oauth2 wechat data scuessed  ----------------------------@@  ");
        console.log(" @@@------ jsonObj -------@@@ ");
        console.log(jsonObj);

        if (!jsonObj) {
            console.error("  @@---------------  parse oauth2  wechat data failed ----------------------------@@  ");
            callback("  @@---------------  parse oauth2  wechat data failed ----------------------------@@  ");
            return;
        }

        if (jsonObj.errcode) {
            console.error("_____@_______ %s _____@_____", "微信返回了一个错误");
            console.error("_____@_______ %s _____@_____", jsonObj.errmsg);
            callback(jsonObj.errmsg);
            return;
        }

        var access_token = jsonObj.access_token;
        var openid = jsonObj.openid;//用户唯一标识

        if (!access_token) {
            console.error("从微信返回的数据无法解析出access_token 为空或undefined");
            callback("access_token is empty or undefined");
            return;
        }

        if (!openid) {
            console.error("从微信返回的数据无法解析出openid 为空或undefined");
            callback("openid is empty or undefined");
            return;
        }

        console.log("  @@---------------  parse oauth2  wechat data scuessed ----------------------------@@  ");
        console.log(" @@@-- openid:" + openid + " --@@@ ");

        var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN";

        httpHelper.get(url, 30000, function (err, data) {
            if (err) {
                console.error("  @@---------------  get userinfo data failed ----------------------------@@  ");
                console.error(err);
                callback(err);
                return;
            }

            console.log("  @@---------------  get userinfo data scuessed ----------------------------@@  ");
            console.log(" @@@-- openid:" + openid + " --@@@ ");
            console.log(" !!!------ data -------!!! ");
            console.log(data);

            //TODO::将这些数据存储在项目数据库中，便于统计
            callback(null, data);//调用各自的回调函数处理信息
        }, 'UTF-8');

    }, 'UTF-8');


}