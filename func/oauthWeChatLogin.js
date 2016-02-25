/**
 * Created by Administrator on 2015/4/15.
 */

'use strict'

var weUtil = require('../utils/weUtil/weUtil.js');
var util = require("../utils/util.js");


/**
 * 公共方法 微信静默授权获取用户opendid 不获取用户信息
 * @param req
 * @param callback
 */
exports.oauth = function (req, callback) {

    var code = req.query.code;
    var state = req.query.state;

    console.log(" @@@-- @code:" + code + ":" + ":state:" + state + " --@@@ ");

    if (!code) {
        console.error(" @@@--- 获取访问者微信授权失败,请使用微信浏览器打开 ---@@@ ");
        callback(" @@@--- 获取访问者微信授权失败,请使用微信浏览器打开 ---@@@ ");
        return;
    }

    req.session.code = code;//缓存
    req.session.state = state;

    weUtil.oauth(code, function (err, jsonObj) {
        if (err) {
            console.error(err);
            callback(" @@@--- 获取微信授权信息失败 ---@@@ ");
            return;
        }

        var openid = jsonObj.openid;

        if (!openid) {
            callback(" @@@--- 对不起，无法获取到您的微信授权 ---@@@ ");
            return;
        }

        console.log(" @@@--- 微信授权通过 -- 获取到了用户信息  ---@@@ " + openid);

        //保存信息到session中
        req.session.openid = openid;

        callback(null, jsonObj);

    });


}


/**
 * 公共方法 获取用户基本信息
 * @param req
 * @param callback
 */
exports.oauth2 = function (req, callback) {

    var code = req.query.code;
    var state = req.query.state;

    console.log(" @@@-- code:" + code + ":" + " --@@@ ");

    if (!code) {
        console.error(" @@@--- 获取访问者授权失败 ---@@@ ");
        callback(" @@@--- 获取访问者授权失败 ---@@@ ");
        return;
    }

    req.session.code = code;//缓存
    req.session.state = state;


    weUtil.oauth2(code, function (err, data) {
        if (err) {
            console.error(err);
            callback(" @@@--- 获取微信授权信息失败 ---@@@ ");
            return;
        }

        var jsonObj = util.tryParseJson("" + data);

        if (!jsonObj) {
            console.error("  @@---------------  parse oauth  wechat data failed ----------------------------@@  ");
            callback("  @@---------------  parse oauth  wechat data failed ----------------------------@@  ");
            return;
        }

        var openid = jsonObj.openid;

        if (!openid) {
            console.error("从微信返回的数据无法解析出openid 为空或undefined");
            callback("@@@--- 获取访问者授权失败 ---@@@");
            return;
        }

        console.log(" @@@--- 微信授权通过 -- 获取到了用户信息  ---@@@ " + openid);

        //保存信息到session中
        req.session.openid = openid;

        callback(null, jsonObj);

    });


}