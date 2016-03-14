/**
 * 微信开放平台 工具类
 * @param req
 * @param cb
 */


var WXBizMsgCrypt = require('wechat-crypto');
var xml2js = require('xml2js');

var wechatUtils = require("./wechatUtils.js");


var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var encodingAESKey = componentConfig.encodingAESKey;//公众号消息加解密Key
var token = componentConfig.token;//公众号消息校验Token


//TODO::后期考虑使用RESTAPI方法 解耦  保证安全的前提下

/**
 * 获取保存的 component_verify_ticket
 */
exports.getComponentVerifyTicket = function (callback) {

    /**
     * 获取数据
     */
    app.models.wechatcomponentverifyticket.findOne({
        where: {component_appid: component_appid},
        sort: 'ticketid DESC'
    }).exec(function (err, docs) {
        if (err) return callback(err);
        if (!docs) return callback(null, null);

        console.log("--------wechatcomponentverifyticket--------");
        console.log(docs);

        callback(null, docs.component_verify_ticket)
    });

}


/**
 * 保存获取到的 component_verify_ticket
 * @param req
 * @param cb
 */
exports.svaeComponentVerifyTicket = function (component_verify_ticket, callback) {

    console.log("@@@ ------ save component_verify_ticket ------------ @@@");
    console.dir(component_verify_ticket);

    /**
     * 保存数据
     */
    app.models.wechatcomponentverifyticket.create({
            component_appid: component_appid,
            component_verify_ticket: component_verify_ticket
        }
        , function (err, model) {
            if (err) return callback(err);
            callback(null, model)
        });

}


/**
 * 获取accessToken
 * @param callback
 */
exports.getComponentAccessToken = function (callback) {

    /**
     * 获取数据
     */
    app.models.wechatcomponentaccesstoken.findOne(
        {
            where: {component_appid: component_appid},
            sort: "tokenid DESC"
        }
    ).exec(function (err, docs) {
        if (err) return callback(err);
        if (!docs) return callback(null, null);
        callback(null, {
            component_access_token: docs.component_access_token,
            expireTime: docs.expireTime
        })
    });

}

/**
 * 保存accessToken
 * @param callback
 */
exports.saveComponentAccessToken = function (token, callback) {


    console.log("@@@ ------ save component_access_token ------------ @@@");
    console.dir(token);

    var component_access_token = token.accessToken;
    var expireTime = token.expireTime;

    /**
     * 保存数据
     */
    app.models.wechatcomponentaccesstoken.create({
        component_appid: component_appid,
        component_access_token: component_access_token,
        expireTime: expireTime
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });

}

/**
 * 保存信息
 * @param authorization_info
 * @param callback
 */
exports.svaeComponentAuthorizer = function (authorizerInfo, callback) {

    console.log("@@@ ------ save authorizerInfo_info ------------ @@@" + authorizerInfo);
    console.log(authorizerInfo);

    /**
     * 保存数据
     */
    app.models.wechatcomponentauthorizer.create({
        component_appid: component_appid,
        authorizer_appid: authorizerInfo.authorization_info.authorizer_appid,
        nick_name: authorizerInfo.authorizer_info.nick_name,
        head_img: authorizerInfo.authorizer_info.head_img,
        service_type_info: authorizerInfo.authorizer_info.service_type_info,
        verify_type_info: authorizerInfo.authorizer_info.verify_type_info,
        user_name: authorizerInfo.authorizer_info.user_name,
        business_info: authorizerInfo.authorizer_info.business_info,
        alias: authorizerInfo.authorizer_info.alias,
        qrcode_url: authorizerInfo.authorizer_info.qrcode_url,
        func_info: authorizerInfo.authorization_info.func_info,
        notAvailable: 0
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });
}

/**
 * 获取授权信息
 */
exports.getAuthorizerAccessToken = function (authorizer_appid, callback) { //TODO::有没有更好的方法解决 //NOTE:

    return function (callback) {
        /**
         * 获取数据
         */
        app.models.wechatcomponentauthorizeraccesstoken.findOne({
                where: {
                    component_appid: component_appid,
                    authorizer_appid: authorizer_appid
                },
                sort: "authorizeraccesstokenid DESC"
            }
        ).exec(function (err, docs) {
            if (err) return callback(err);
            if (!docs) return callback(null, "@@@ ------ get AuthorizerAccessToken empty------------ @@@");

            console.log(docs);

            callback(null, {
                refreshToken: docs.authorizer_refresh_token,//解决 component插件问题
                authorizer_refresh_token: docs.authorizer_refresh_token,
                authorizer_access_token: docs.authorizer_access_token,
                expires_in: docs.expires_in
            })
        });
    }

}

/**
 * 保存授权信息
 * @param token
 * @param callback
 */
exports.saveAuthorizerAccessToken = function (authorizer_appid, callback) {

    return function (token, callback) {

        console.log("@@@ ------ save authorizerAccessToken ------------ @@@");
        console.dir(token);

        //var authorizer_access_token = token.accessToken;
        // var authorizer_refresh_token = token.refreshToken;
        //var expireTime = token.expireTime;

        /**
         * 保存数据
         */
        app.models.wechatcomponentauthorizeraccesstoken.create({
            component_appid: component_appid,
            authorizer_appid: authorizer_appid,
            authorizer_access_token: token.authorizer_access_token,
            authorizer_refresh_token: token.authorizer_refresh_token,
            expires_in: token.expires_in
        }, function (err, model) {
            if (err) return callback(err);
            callback(null, model)
        });

    }

}
