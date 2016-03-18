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

    console.log("@@@ ------ save authorizerInfo_info ------------ @@@");
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

    console.log(" @@@ -- start getAuthorizerAccessToken -- @@@ -" + authorizer_appid);

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

        console.log(err)
        console.log(docs)

        if (err) return callback(err);
        if (!docs) return callback(null, "@@@ ------ get AuthorizerAccessToken empty------------ @@@");

        console.log(docs);

        callback(null, {
            accessToken: docs.authorizer_access_token,
            refreshToken: docs.authorizer_refresh_token,//解决 component插件问题
            authorizer_refresh_token: docs.authorizer_refresh_token,
            authorizer_access_token: docs.authorizer_access_token,
            expireTime: docs.expireTime
        })
    });

}

/**
 * 保存授权信息
 * @param token
 * @param callback
 */
exports.saveAuthorizerAccessToken = function (authorizer_appid, token, callback) {


    console.log("@@@ ------ save authorizerAccessToken ------------ @@@");
    console.dir(token);

    var authorizer_access_token = token.accessToken;
    var authorizer_refresh_token = token.refreshToken;
    var expireTime = token.expireTime;

    /**
     * 保存数据
     */
    app.models.wechatcomponentauthorizeraccesstoken.create({
        component_appid: component_appid,
        authorizer_appid: authorizer_appid,
        authorizer_access_token: authorizer_access_token,
        authorizer_refresh_token: authorizer_refresh_token,
        expireTime: expireTime
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });

}

/**
 * 获取第三方平台授权认证获取用户信息时的access_token 与授权的不同
 */
exports.getComponentOpendIdAccessToken = function (openid, callback) {


    /**
     * 获取数据
     */
    app.models.wechatcomponentauthorizeraccesstoken.findOne({
            where: {
                openid: openid,
            },
            sort: "id DESC"
        }
    ).exec(function (err, docs) {

        console.log(err)

        if (err) return callback(err);
        if (!docs) return callback(null, "@@@ ------ get AuthorizerAccessToken empty------------ @@@");

        console.log(docs);

        callback(null, {
            openid: docs.openid,
            access_token: docs.access_token,
            refresh_token: docs.refresh_token,
            expires_in: docs.expires_in,
            create_at: docs.create_at,
        })
    });


}


/**
 * 保存第三方平台授权认证获取用户信息时的access_token 与授权的不同
 */
exports.saveComponentOpendIdAccessToken = function (openid, token, callback) {

    //
    //:{ access_token: 'OezXcEiiBSKSxW0eoylIeBKYoFJHGTOX1D0QEedDpww4F3M3N2lcVxZioZ6QlBecKxuEIBsdJtJEH4Bk9E5nB91BDwrBqARzPSh7RKWzb-z96mxDT03r4WEwhWhTfHbRdPT7LYfwK5Co6chU28ws9y72vJdHBAF5YBxFtNSm8fdOkGuwb_Q8IeLMWgveDuKx',
    //2016-03-18 10:38:52:  expires_in: 7200,
    //2016-03-18 10:38:52:  refresh_token: 'OezXcEiiBSKSxW0eoylIeBKYoFJHGTOX1D0QEedDpww4F3M3N2lcVxZioZ6QlBecHkvVaCcHONgC-njZvVmKGl5gs7cL5DD66fmGWgMx3qSbDn0UmDAHLRuOPVtBF3Yy-9p9mVzdZ-bGYB83L_iy3Y_HQXMOT_GUgVuOoLW4HjoA6ZYJzkGqAQ3uWZ1VNgY7',
    //2016-03-18 10:38:52:  openid: 'oMcl1t3G0brAjJ9Z3dJK-xFgQiXQ',
    //2016-03-18 10:38:52:  scope: 'snsapi_userinfo',
    //2016-03-18 10:38:52:  create_at: 1458268732737 }

    /**
     * 保存数据
     */
    app.models.wechatcomponentopenidaccesstoken.create({
        openid: openid,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_in: token.expires_in,
        create_at: token.create_at,
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });


}

