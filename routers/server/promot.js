/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var promotAPI = require('../../api_server/server/promot');


var oauths_1 = [];

//TODO，aop校验模板

router.post('/:templName/:templType/initPromot/', [], promotAPI.initPromotInfo);//初始化

//router.post('/p/zp/2/basicInfo/', oauths_1, promotAPI.zhuanPanConf_2.basicInfoSet);//设置基本参数
//router.post('/p/zp/2/pageInfo/', oauths_1, promotAPI.zhuanPanConf_2.pageConfigSet);//配置页面信息
//router.post('/p/zp/2/awardInfo/', oauths_1, promotAPI.zhuanPanConf_2.awardConfigSet);//设置奖项参数
//router.post('/p/zp/2/awardRuleConf/', oauths_1, promotAPI.zhuanPanConf_2.awardRuleConfigSet);//配置奖项规则信息
//router.post('/p/zp/2/otherInfoConf/', oauths_1, promotAPI.zhuanPanConf_2.otherInfoConfigSet);//配置其他页面信息
//
////var oauths_2 = [oauth.oauthPromotType, oauth.oauthPromotLimit, oauth.oauthTimeInterval];
//
//router.post('/p/zp/2/initPromot/', oauths_2, promotAPI.zhuanPanInit_2.init);//初始化
//
//router.get('/p/zp/2/newPage/', oauths_1, promotAPI.zhuanPanPage_2.newCreatepage);//创建转盘页面
//router.get('/p/zp/2/managePromot/', oauths_1, promotAPI.zhuanPanPage_2.promotPage);//mangePromot 较权时才会主动读取参数


module.exports = router;