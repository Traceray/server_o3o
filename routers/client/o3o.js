/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var o3oAPI = require('../../api_server/client/o3o/index');

router.get('/show/*', o3oAPI.server.oauth);//显示SPA应用的页面

router.get('/index', o3oAPI.entry.entryIndex);//系统的入口

module.exports = router;