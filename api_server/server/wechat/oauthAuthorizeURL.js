/**
 * Created by o3oNet on 16-2-27.
 */


var OAuth = require('wechat-oauth');
var Component = require("wechat-component");

var wxUtil = require("../../../utils/wechat/wxUtil.js");
var wxComponentsUtil = require("../../../utils/wechat/wxComponentsUtil.js");

var baseInfoConfig = require("config").get("app.baseInfo");
var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);

var websiteUrl = baseInfoConfig.websiteUrl;
var protocol = baseInfoConfig.protocol;


/**
 * 获取微信授权微信URL
 * @param req
 * @param res
 * @param next
 */
exports.promotOauthAuthorizeURL = function (req, res, next) {

    var promotid = req.params.promotid;

    /**
     * 根据活动promotid来获取信息
     * @type {string}
     */

    var appid = "wxbc9b7da0b82ac2b8";
    var secret = "";
    var componentid = "";
    var authorizeType = "";
    //TODO::校验 promotid的合法性


    //检验授权方式
    if (authorizeType == "wechat_component") {
        var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));
    } else if (authorizeType == "wechat_urlbind") {
        var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));
    } else {
        return next(new Error({
            code: "10101",
            msgInfo: " @@@ --- 该活动并为指定微信公众平台授权方式或是授权信息已经失效 --- @@@ ",
            error: {}
        }));
    }

    if (!promotid) return next(new Error({
        code: "10102",
        msgInfo: "@@@--- 微信授权时获取活动编号失败  ---@@@ ",
        error: {}
    }));

    var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));

    var redirectURI = protocol + websiteUrl + "/wechat/oauth/" + promotid;

    var authorizeURL = oauthApi.getAuthorizeURL(redirectURI, "state", "scope");

    res.redirect(authorizeURL);


}