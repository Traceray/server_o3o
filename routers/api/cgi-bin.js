/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var cgiBin = require('../../api_server/api/cgi-bin/index');

router.all("/token", app.oauth.grant());//直接使用框架


module.exports = router;