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
 *
 * @param req
 * @param res
 * @param next
 */
exports.oauth = function (req, res, next) {

    var promotid = req.params.promotid;

    //TODO::RESTFUL
    /**
     * 根据活动promotid来获取信息
     * @type {string}
     */

    var scope = "snsapi_userinfo";
    var redirectUrl = "promotUrl";
    var appid = "wxbc9b7da0b82ac2b8";
    var secret = "";
    var authorizeType = "wechat_component";

    //检验授权方式
    if (authorizeType == "wechat_component") {
        var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken, wxComponentsUtil.saveAuthorizerAccessToken);
    } else if (authorizeType == "wechat_urlbind") {
        var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));
    } else {
        return next(new Error(" @@@ --- 该活动并为指定微信公众平台授权方式或是授权信息已经失效 --- @@@ "));
    }

    oauthApi.getAccessToken(req.query.code, function (err, result) {
        if (err) return next(new Error(" @@@ --- 获取用户微信授权信息失败 --- @@@ ") + err.toString());

        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        //TODO::
        /**
         *
         */
        if (scope != "snsapi_userinfo") {//获取基本信息

            return res.redirect(redirectUrl);

        } else {//获取微信信息


            oauthApi.getUser(openid, function (err, result) {
                if (err) return next(new Error(" @@@ --- 获取用户微信资料信息失败 --- @@@ ") + err.toString());
                var userInfo = result;

                return res.redirect(redirectUrl);
            });


        }


    });


}