/**
 * Created by o3oNet on 16-2-26.
 */


/**
 * 微信开放平台 授权确认
 * @type {*|exports|module.exports}
 */

var Component = require("wechat-component");

var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var componentConfig = require("config").get("wechat.componentConfig");
var baseInfoConfig = require("config").get("app.baseInfo");

var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var websiteUrl = baseInfoConfig.websiteUrl;
var protocol = baseInfoConfig.protocol;
var apiBaseUrl = baseInfoConfig.apiBaseUrl;

var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);


exports.authorizePage = function (req, res, next) {

    var redirectURI = protocol + websiteUrl + apiBaseUrl + "/wechat/component/authorize/callback";

    component.getAuthorizeURL(redirectURI, function (err, authorizeURL) {

        if (err) return res.send(new app.sendJsonObj(10201, "微信开放平台获取授权网页失败 !", err).send(null, __dirname, 1, "serverPage"));

        console.log(authorizeURL);

        res.render("wechat/componentAuthorizePage.hbs", {
            href: authorizeURL
        });

    });

}

exports.authorizePageBack = function (req, res, next) {

    var authorization_code = req.query.auth_code;

    console.log(" @@@ -- get component authorization_code -- @@@ - " + authorization_code);

    component.queryAuth(authorization_code, function (err, authorizationInfo) {//获取授权码信息

        if (err) console.error(err);

        var authorization_info = authorizationInfo.authorization_info;

        console.log("  @@@ -- get authorizationInfo back -- @@@ ");
        console.log(authorization_info);

        if (err) return res.send(new app.sendJsonObj(10203, "保存第三方平台authorization_info时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

        wxComponentsUtil.saveAuthorizerAccessToken(authorization_info.authorizer_appid, {//返回方法
            accessToken: authorization_info.authorizer_access_token,
            refreshToken: authorization_info.authorizer_refresh_token,
            expireTime: (new Date().getTime()) + (authorization_info.expires_in - 10) * 1000
        }, function (err, data) {

            if (err) return res.send(new app.sendJsonObj(10204, "保存第三方平台saveAuthorizerAccessToken时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

            component.getAuthorizerInfo(authorization_info.authorizer_appid, function (err, authorizerInfo) {

                console.log("  @@@ -- get authorizerInfo back -- @@@ ");
                console.log(authorizerInfo);

                wxComponentsUtil.svaeComponentAuthorizer(authorizerInfo, function (err, data) {

                    if (err) return res.send(new app.sendJsonObj(10203, "保存第三方平台authorizer_info时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

                    var sendObj = {strInfo: "", code: -1, error: {title: "", detail: ""}, jsonData: {}};
                    sendObj.strInfo = "授权成功!";
                    sendObj.jsonData.authorizerInfo = authorizerInfo;
                    res.send(sendObj);

                });

            });


        });

    });

}

exports.authorizePageBack1 = function (req, res, next) {

    var authorization_code = req.query.auth_code;

    console.log(" @@@ -- get component authorization_code get -- @@@ - " + authorization_code);

    component.getAccessToken(function (err, component_access_token) {

        if (err) return res.send(new app.sendJsonObj(10202, "获取第三方平台access_token时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

        component.queryAuth(authorization_code, function (err, authorization_info) {

            wxComponentsUtil.svaeComponentAuthorizer(authorization_info, function (err, data) {

                if (err) return res.send(new app.sendJsonObj(10203, "保存第三方平台authorization_info时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

                wxComponentsUtil.saveAuthorizerAccessToken(authorization_info.authorizer_appid, {
                    authorizer_refresh_token: authorization_info.authorizer_refresh_token,
                    authorizer_access_token: authorization_info.authorizer_access_token,
                    expires_in: authorization_info.expires_in,
                }, function (err, data) {

                    if (err) return res.send(new app.sendJsonObj(10204, "保存第三方平台saveAuthorizerAccessToken时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

                    var sendObj = {strInfo: "", code: -1, error: {title: "", detail: ""}, jsonData: {}};
                    sendObj.strInfo = "授权成功!";
                    sendObj.jsonData.authorization_info = authorization_info;
                    res.send(sendObj);

                });


            });

        });

    });

}