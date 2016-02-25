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

//router.get('/oauth/:templName/:type/:promotid', wechatAPI.showLogic.test1);
//router.get('/oauth2/:templName/:type/:promotid', wechatAPI.showLogic.test2);

//router.get('/coauth/:templName/:type/:promotid', wechatAPI.showLogic.test1);//通过开放平台授权 获取基本信息
//router.get('/coauth2/:templName/:type/:promotid', wechatAPI.showLogic.test2);//通过开放平台授权 获取微信详细信息

router.get("/oauth2/base", wechatAPI.oauth.oauth2_BASE);
router.get("/oauth2/userinfo", wechatAPI.oauth.oauth2_USERINFO);

router.get("/oauth2/url/base", wechatAPI.oauth.oauth2URL_BASE);
router.get("/oauth2/url/userinfo", wechatAPI.oauth.oauth2URL_USERINFO);


/**
 * 微信开放平台
 */
var wechatComponentAPI = require('../../api_server/server/wechat/component');//开放平台
router.get('/component/accept', wechatComponentAPI.accept.getAccept);//开放平台
router.post('/component/accept', wechatComponentAPI.accept.postAccept);
router.get('/component/authorize', wechatComponentAPI.component.authorizePage);
router.get('/component/authorize/callback', wechatComponentAPI.component.authorizePageBack);

router.get('component/oauth/authorizeURL/:promtid', wechatComponentAPI.oauthAuthorizeURL.componentOauthAuthorizeURL);
router.get('component/oauth2/authorizeURL/:promtid', wechatComponentAPI.oauthAuthorizeURL.componentOauth2AuthorizeURL);

module.exports = router;