/**
 * Created by o3oNet on 16-2-26.
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


exports.authorizePage = function (req, res, next) {

    var redirectURI = protocol + websiteUrl + "/wechat/component/authorize/callback";

    component.getAuthorizeURL(redirectURI, function (err, authorizeURL) {
        if (err) console.error(err);
        if (err) return next(new Error("@@@ --- 获取授权网页失败!" + err.toString() + " --- @@@ "));

        console.log(authorizeURL);

        res.render("wechat/componentAuthorizePage.hbs", {
            href: authorizeURL
        });

    });

}

exports.authorizePageBack = function (req, res, next) {

    var authorization_code = req.query.auth_code;

    component.getAccessToken(function (err, component_access_token) {
        if (err) return next(new Error(" @@@ --- 获取第三方平台access_token时发生了错误! " + err.toString() + " --- @@@ "));

        component.queryAuth(authorization_code, function (err, authorization_info) {

            wxComponentsUtil.svaeComponentAuthorizer(authorization_info, function (err, data) {

                if (err) return next(new Error(" @@@ --- 保存第三方平台authorization_info时发生了错误! " + err.toString() + " --- @@@ "));

                wxComponentsUtil.saveAuthorizerAccessToken(authorization_info.authorizer_appid, {
                    authorizer_refresh_token: authorization_info.authorizer_refresh_token,
                    authorizer_access_token: authorization_info.authorizer_access_token,
                    expires_in: authorization_info.expires_in,
                }, function (err, data) {

                    if (err) return next(new Error(" @@@ --- 保存第三方平台saveAuthorizerAccessToken时发生了错误! " + err.toString() + " --- @@@ "));

                    var sendObj = {strInfo: "", code: -1, error: {title: "", detail: ""}, jsonData: {}};
                    sendObj.strInfo = "授权成功!";
                    sendObj.jsonData.authorization_info = authorization_info;
                    res.send(sendObj);

                });


            });

        });

    });

}