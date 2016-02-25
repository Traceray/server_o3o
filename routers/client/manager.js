/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var managerAPI = require('../../api_server/client/manager/index');

router.get("/index", managerAPI.indexPage.index);
router.get("/home", managerAPI.homePage.home);

//贷款审批
router.get("/dksp/daichuli", managerAPI.DaiChuLiDaiKuanShenPiPage.home);
router.get("/dksp/daichuli/:userid", managerAPI.DaiChuLiDaiKuanShenPiPage.detail);
router.get("/dksp/yichuli", managerAPI.YiChuLiDaiKuanShenPiPage.home);

//产权办理
router.get("/cqbl/daichuli", managerAPI.DaiChuLiChanQuanBanLiShenPi.home);
router.get("/cqbl/yichuli", managerAPI.YiChuLiChanQuanBanLiShenPi.home);

//客户端管理
router.get("/khdgl", managerAPI.KeHuDuanGuanLiPage.home);

//人员管理
router.get("/rygl", managerAPI.RenYuanGuanLiPage.home);

//数据中心
router.get("/sjzx", managerAPI.ShuJuZhongXinPage.home);

//系统设置
router.get("/xtsz", managerAPI.XiTongSheZhiPage.home);

module.exports = router;