/**
 * Created by o3oNet on 16-1-24.
 * 微信授权认证相关
 */

var Component = require("wechat-component");

var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var componentConfig = require("config").get("wechat.componentConfig");
var baseInfoConfig = require("config").get("app.baseInfo");

var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var websiteUrl = baseInfoConfig.websiteUrl;
var protocol = baseInfoConfig.protocol;


var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);

/**
 * 获取第三方授权微信信息 -- 基本信息
 * @param req
 * @param res
 * @param next
 */
exports.componentOauthAuthorizeURL = function (req, res, next) {

    var templName = req.params.templName;
    var type = req.params.type;
    var promotid = req.params.promotid;

    var appid = "wxbc9b7da0b82ac2b8";

    //TODO::校验 promotid的合法性

    console.log(" @@@-- :code:" + code + ":templName:" + templName + ":type:" + type + ":promotid:" + promotid + ":state:" + state + " --@@@ ");

    if (!code) return next(new Error(" @@@--- 错误码1032,微信授权时获取访问者微信授权码失败 ---@@@ "));
    if (!templName) return next(new Error(" @@@--- 错误码1033,微信授权时获取活动模板名失败 ---@@@ "));
    if (!type) return next(new Error(" @@@--- 错误码1034,微信授权时获取活动类别失败 ---@@@ "));
    if (!promotid) return next(new Error(" @@@--- 错误码1035,微信授权时获取活动编号失败  ---@@@ "));


    var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));

    var redirectURI = protocol + websiteUrl + "/server/test/";

    var authorizeURL = oauthApi.getAuthorizeURL(redirectURI, "snsapi_base", "snsapi_base");

    res.redirect(authorizeURL);

}


/**
 * 获取第三方授权微信信息 -- 详细信息
 * @param req
 * @param res
 * @param next
 */
exports.componentOauth2AuthorizeURL = function (req, res, next) {

    var templName = req.params.templName;
    var type = req.params.type;
    var promotid = req.params.promotid;

    var appid = "wxbc9b7da0b82ac2b8";

    //TODO::校验 promotid的合法性

    console.log(" @@@-- :code:" + code + ":templName:" + templName + ":type:" + type + ":promotid:" + promotid + ":state:" + state + " --@@@ ");

    if (!code) return next(new Error(" @@@--- 错误码1032,微信授权时获取访问者微信授权码失败 ---@@@ "));
    if (!templName) return next(new Error(" @@@--- 错误码1033,微信授权时获取活动模板名失败 ---@@@ "));
    if (!type) return next(new Error(" @@@--- 错误码1034,微信授权时获取活动类别失败 ---@@@ "));
    if (!promotid) return next(new Error(" @@@--- 错误码1035,微信授权时获取活动编号失败  ---@@@ "));


    var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));

    var redirectURI = protocol + websiteUrl + "/server/test/";

    var authorizeURL = oauthApi.getAuthorizeURL(redirectURI, "snsapi_userinfo", "snsapi_userinfo");

    res.redirect(authorizeURL);

}





