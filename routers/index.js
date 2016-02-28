/**
 * 路由文件
 * 将路由文件分层处理
 */

var express = require('express');
var router = express.Router();

var routers = {};

//API RESTFUL API
routers.cgiBin = require('./api/cgi-bin.js');//
routers.v1API = require('./api/v1-api.js');//
routers.v3API = require('./api/v3-api.js');//

//SERVER 逻辑路由
routers.wechat = require('./server/wechat.js');//
routers.servers = require('./server/servers.js');//

//CLIENT 客户端 包含手机端和服务器端
routers.o3o = require('./client/o3o.js');//
routers.manager = require('./client/manager.js');//

//活动信息配置
routers.promot = require('./server/promot.js');//

//加载权限控制
//权限控制在各个分节点里
router.use('/server', routers.servers);//核心引擎路由
router.use('/wechat', routers.wechat);
router.use("/o3o", routers.o3o);
router.use("/manager", routers.manager);//相应的静态文件应该在public/manager中
router.use("/cgi-bin", routers.cgiBin);//安全相关
router.use("/v1", routers.v1API);//API
router.use("/v3", routers.v3API);//API

router.use("/p", routers.promot);//活动配置


module.exports = router;
