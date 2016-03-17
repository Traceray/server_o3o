/**
 * Created by o3oNet on 2015-03-29.
 * 业务核心引擎
 */

'use strict';


/**
 *
 * @type {exports|module.exports}
 */
exports.oauth = require("./oauth.js"); //授权获取微信信息相关
exports.oauthAuthorizeURL = require("./oauthAuthorizeURL.js");


/**
 *wechat
 */

//exports.wepay = require('./wepay.js');
//exports.wechat = require('./wechat.js');
//exports.wxapi = require('./wxapi.js');


/**
 * component
 */
exports.comptAccept = require("./component/accept.js");//接受微信开放平台推送信息

exports.comptAuthorizePage = require("./component/authorizePage.js");

exports.receiveMsgEvent = require("./component/receiveMessagesEvents.js");

exports.red = require("./wechat/redPackets.js");

exports.wechat = require("./wechat/wechat.js");

exports.qiandao = require("./wechat/qiandao.js")









