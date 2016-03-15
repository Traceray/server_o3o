/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var serversAPI = require('../../api_server/server/servers');

var test = require('../../api_server/server/wechat/component/receiveMessagesEvents');

router.get('/test', serversAPI.showLogic.test1);
router.get('/test1', test.test1);
router.get('/test2', test.test2);

router.get('/test/oauth/:name/:type/:promotid', serversAPI.showLogic.test1);
router.get('/test/oauth2/:name/:type/:promotid', serversAPI.showLogic.test2);


router.get('/show', serversAPI.showLogic.show);
router.get('/show1', serversAPI.showLogic.show1);
router.get('/show2', serversAPI.showLogic.show2);

router.get('/wechat/oauth/o3o', serversAPI.wechatRedirect.o3oOauth);

router.post('/sendMsg', serversAPI.sendMsgInfo.sendMsg);//发送短信验证码

router.post('/registerByPhone', serversAPI.registerUserInfo.registerByPhone);//手机号验证并注册成用户

router.post('/applyLoanApprovaling', serversAPI.loanApprovals.applyLoanApprovaling);//贷款申请


module.exports = router;