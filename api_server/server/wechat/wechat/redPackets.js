/**
 * Created by Administrator on 2016/3/17 0017.
 */

var OAuth = require('wechat-oauth');
var Component = require("wechat-component");
var fs = require('fs');

var request = require("request");

var wxUtil = require("../../../../utils/wechat/wxUtil.js");
var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var baseInfoConfig = require("config").get("app.baseInfo");
var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);

var websiteUrl = baseInfoConfig.websiteUrl;
var protocol = baseInfoConfig.protocol;

var util = require("../../../../utils/util.js");


var weixin = require("./weixin.js")

exports.send = function (req, res, next) {


    var num = util.fRandomBy(100, 200);

    console.log(" num - " + num);

    var data = {
        min_value: 100,
        max_value: 200,
        total_amount: 101,
        re_openid: "oMcl1t3G0brAjJ9Z3dJK-xFgQiXQ",
        showName: "摇一摇红包活动",
        clientIp: "101.200.86.253",
        luckyMoneyWishing: "生活更美好",
        mch_id: "1314935701",
        wxappid: "wxbc9b7da0b82ac2b8",
        wxkey: "m9jrvj9TV616V9w6gvp95V91vV99JfrV",
        send_name: "沈阳泛美传媒"
    }

    weixin.sendLuckyMoney(req, res, data, function (err, ret) {
        console.log(" ok ")
        console.log(err)
        console.log(ret)
        res.send(ret);
    });


    /*
     var scope = "snsapi_userinfo";
     //var redirectUrl = "promotUrl";
     var appid = "wxbc9b7da0b82ac2b8";
     var secret = "b82d9c4fbfc91c9a571357ccaa93d497";
     var authorizeType = "wechat_urlbind";

     console.log(" @@@ -- req.query.code -- @@@ - " + req.query.code);

     if (!req.query.code) {

     //检验授权方式
     if (authorizeType == "wechat_component") {
     var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));
     } else if (authorizeType == "wechat_urlbind") {
     var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));
     } else {
     return next(new Error(" @@@ --- 该活动并为指定微信公众平台授权方式或是授权信息已经失效 --- @@@ "));
     }

     var redirectURI = protocol + websiteUrl + "/wechat/red/send";

     return res.redirect(oauthApi.getAuthorizeURL(redirectURI, "state", "snsapi_userinfo"));

     } else {

     //检验授权方式
     if (authorizeType == "wechat_component") {
     var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));
     } else if (authorizeType == "wechat_urlbind") {
     var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));
     } else {
     return next(new Error(" @@@ --- 该活动并为指定微信公众平台授权方式或是授权信息已经失效 --- @@@ "));
     }

     }

     oauthApi.getAccessToken(req.query.code, function (err, result) {
     if (err) return next(new Error(" @@@ --- 获取用户微信授权信息失败 --- @@@ ") + err.toString());

     var accessToken = result.data.access_token;
     var openid = result.data.openid;

     console.log(" get openid - " + openid);

     var num = util.fRandomBy(100, 200);

     console.log(" num - " + num);

     var data = {
     min_value: 100,
     max_value: 200,
     total_amount: num,
     re_openid: "oMcl1t3G0brAjJ9Z3dJK-xFgQiXQ",
     showName: "摇一摇红包活动",
     clientIp: "101.200.86.253",
     luckyMoneyWishing: "生活更美好",
     mch_id: "1314935701",
     wxappid: "wxbc9b7da0b82ac2b8",
     wxkey: "m9jrvj9TV616V9w6gvp95V91vV99JfrV",
     send_name: "沈阳泛美传媒"
     }

     weixin.sendLuckyMoney(req, res, data, function (err, ret) {
     console.log(" ok ")
     console.log(err)
     console.log(ret)
     res.send(ret);
     });

     //var SEND_REDPACK_URL = "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack";
     //var PFX = '/home/oopsdata1/cert/apiclient_cert.p12';
     //
     //
     //request({
     //        url: SEND_REDPACK_URL,
     //        method: 'POST',
     //        body: xml,
     //        agentOptions: {
     //            pfx: fs.readFileSync(PFX),
     //            passphrase: '1247504701'
     //        }
     //    },
     //    function (err, response, body) {
     //        console.log(body);
     //    });


     });
     */

}