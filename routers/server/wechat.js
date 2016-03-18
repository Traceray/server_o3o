/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

//TODO::微信的服务 放到统一API接口中

var wechatAPI = require('../../api_server/server/wechat');

//router.post('/oauthJSApi', wechatAPI.wechat.oauthJSApi);//验证权限
//
//router.get("/pay/payment", wechatAPI.wechat.payment);
//
//router.post("/pay/getWCPayParams", wechatAPI.wechat.getWCPayRequestParams);
//
//router.post("/pay/notify", wechatAPI.wechat.notify);

//router.get('/wechat/oauth/o3o', wechatAPI.wechatRedirect.o3oOauth);

router.get('/oauth/authorizeURL/:promotid', wechatAPI.oauthAuthorizeURL.promotOauthAuthorizeURL);

/**
 * 微信公众平台绑定服务
 */


/**
 * 微信开放平台
 */
router.get('/component/accept', wechatAPI.comptAccept.getAccept);//开放平台
router.post('/component/accept', wechatAPI.comptAccept.postAccept);

router.get('/component/authorize', wechatAPI.comptAuthorizePage.authorizePage);
router.get('/component/authorize/callback', wechatAPI.comptAuthorizePage.authorizePageBack);

router.post('/component/receive/:appid', wechatAPI.receiveMsgEvent.receive);//公众号消息与事件接收URL


router.get("/qiandao/show/", wechatAPI.qiandao.show);
router.post("/qiandao/accept/", wechatAPI.qiandao.accept);
router.get("/red/send/", wechatAPI.red.send);
router.get("/wechat", wechatAPI.wechat.wechat);


module.exports = router;