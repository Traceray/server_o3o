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
var encodingAESKey = componentConfig.encodingAESKey;
var token = componentConfig.token;


//TODO::后期考虑使用RESTAPI方法 解耦  保证安全的前提下

/**
 * 获取accessToken
 * @param callback
 */
exports.getWechatAccessToken = function (appid, callback) {


    return function (callback) {

        /**
         * 获取数据
         */
        app.models.wechataccesstoken.findOne({
            appid: appid
        }).exec(function (err, docs) {
            if (err) return callback(err);
            if (!docs) return callback(null, null);
            callback(null, {
                access_token: docs.access_token,
                refresh_token: docs.refresh_token,
                expires_in: docs.expires_in
            })
        });


    }


}

/**
 * 保存accessToken
 * @param callback
 */
exports.saveWechatAccessToken = function (appid, token, callback) {

    return function (token, callback) {

        console.log("@@@ ------ get wechat_access_token ------------ @@@" + token.toString());

        /**
         * 保存数据
         */
        app.models.wechataccesstoken.create({
            appid: appid,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            expires_in: token.expires_in
        }, function (err, model) {
            if (err) return callback(err);
            callback(null, model)
        });

    }


}

