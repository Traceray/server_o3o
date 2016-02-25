/**
 * Created by o3oNet on 2015-03-29.
 * 业务核心引擎
 */

'use strict';

//管理端首页
exports.indexPage = require('./indexPage.js');

//主页
exports.homePage = require('./homePage.js');

//产权办理
exports.DaiChuLiChanQuanBanLiShenPi = require('./chanquanbanli/DaiChuLiChanQuanBanLiShenPi.js');//待处理产权办理
exports.YiChuLiChanQuanBanLiShenPi = require('./chanquanbanli/YiChuLiChanQuanBanLiShenPi.js');//已处理产权审批

//贷款审批
exports.DaiChuLiDaiKuanShenPiPage = require('./daikuanshenpi/DaiChuLiDaiKuanShenPiPage.js');//待处理贷款审批
exports.YiChuLiDaiKuanShenPiPage = require('./daikuanshenpi/YiChuLiDaiKuanShenPiPage.js');//已处理贷款审批

//客户端管理
exports.KeHuDuanGuanLiPage = require('./kehuduanguanli/KeHuDuanGuanLiPage.js');

//人员管理
exports.RenYuanGuanLiPage = require('./renyuanguanli/RenYuanGuanLiPage.js');

//数据中心
exports.ShuJuZhongXinPage = require('./shujuzhongxin/ShuJuZhongXinPage.js');

//系统设置
exports.XiTongSheZhiPage = require('./xitongshezhi/XiTongSheZhiPage.js');












