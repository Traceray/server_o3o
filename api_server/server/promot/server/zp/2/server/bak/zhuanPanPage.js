/**
 * Created by Administrator on 2015/5/8.
 */
'use strict';

var PGV = require("../../../../../global/promotGlobalVariable.js");
var client = require('../../../../../lib/connRedis.js');

var EventProxy = require('eventproxy');

exports.newCreatepage = function (req, res, next) {

    //TODO::增加权限控制
    var hbsData = {};

    hbsData.username = req.session.username;
    hbsData.promotid = req.session.promotid;
    hbsData.promotTypeName = "转盘2";
    hbsData.activeSiderbar = 'new';

    hbsData.demoIframeSrc = PGV.promotServerUrl + "p/zp/2/show/" + hbsData.promotid + "/-1";

    var ep = new EventProxy();
    ep.fail(function (err) {
        //TODO::返回错误页面信息
        res.send("对不起服务器发生了错误！" + err);
    });

    ep.all("getPageConfig", "getAwardRuleConfig", "getPromotConfig", function (pageReply, awardReply, promotPeply) {

        console.dir(pageReply);

        console.dir(awardReply);

        console.dir(promotPeply);

        /**
         * 基本信息
         */
        hbsData.promotTitle = pageReply.promotTitle;
        hbsData.merchantId = pageReply.merchantid;
        hbsData.wxShareLinkUrl = pageReply.wxShareLinkUrl;
        hbsData.promotIntro = pageReply.promotIntro;
        hbsData.base64Url = PGV.promotServerUrl + "promot/" + promotPeply.base64;
        hbsData.addBase64Url = PGV.appConfig.mainUrl + "r/add/" + promotPeply.base64 + "";
        if (pageReply.wxShareImgKey) {
            hbsData.wxShareImgUrl = PGV.o3oNetConfig.ossPageImgServerUrl + pageReply.wxShareImgKey;
        } else {
            hbsData.wxShareImgUrl = "";
        }

        hbsData.appid = promotPeply.appid;
        hbsData.secret = promotPeply.secret;
        hbsData.component_appid = promotPeply.component_appid;

        console.log("_____________hbsData______________");
        console.log(hbsData);

        /**
         *页面设置
         */
        hbsData.top_1_img_url = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/top-1.png";
        hbsData.top_2_img_url = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/top-2.png";
        hbsData.top_3_img_url = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/top-3.png";
        hbsData.imgUrl_arrow = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/arrow.png";

        if (pageReply.backgroundColor) {
            hbsData.backgroundColor = pageReply.backgroundColor;
        } else {
            hbsData.backgroundColor = "#eeeeee";
        }

        if (pageReply.backgroundStyle === "img") {
            hbsData.backgroundImgUrl = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/background.png";
        } else {
            hbsData.backgroundImgUrl = "";
        }

        /**
         * 奖项信息
         */

        var awardPlace2Level = JSON.parse(pageReply.awardPlace2Level);
        awardPlace2Level.forEach(function (awardTo, index) {
            var strs = awardTo.split(",");
            strs.forEach(function (num) {
                eval("" + "hbsData.awardTo_" + num + " = " + index);
            });
        });

        hbsData.awards = JSON.parse(pageReply.awardConfig);

        /**
         * 奖项规则信息
         */
        var awardPercents = awardReply.awardPercents.split(",");
        awardPercents.forEach(function (temp, index) {
            eval("hbsData.awardPercent_" + (index + 1) + " = '" + temp + "%'");
        });

        var awardTotals = awardReply.awardTotals.split(",");
        awardTotals.forEach(function (temp, index) {
            eval("hbsData.awardTotal_" + (index + 1) + " = " + temp + "");
        });

        hbsData.limitConfInterDays = awardReply.limitConfInterDays;
        hbsData.limitConfCount = awardReply.limitConfCount;

        hbsData.day_selects_1 = awardReply.day_selects_1;
        hbsData.startTime_1 = awardReply.startTime_1;
        hbsData.endTime_1 = awardReply.endTime_1;
        hbsData.times_selects = awardReply.times_selects;
        hbsData.startTime_times = awardReply.startTime_times;
        hbsData.endTime_times = awardReply.endTime_times;


        hbsData.isFemaleTimes = awardReply.isFemaleTimes;

        /**
         * 其他高级设置
         */
        hbsData.promotStartTime = pageReply.promotStartTime;
        hbsData.promotEndTime = pageReply.promotEndTime;
        hbsData.useWeChat0auth = pageReply.useWeChat0auth;
        hbsData.forceRepeatToGetAward = pageReply.forceRepeatToGetAward;
        hbsData.haveZeroAward = pageReply.haveZeroAward;
        hbsData.backgroundStyle = pageReply.backgroundStyle;
        hbsData.showAwardTheme = pageReply.showAwardTheme;
        hbsData.isOnline = pageReply.isOnline;

        debugger;

        console.dir(hbsData);

        /**
         * 返回数据
         */

        res.render("p/zp/2/admin-new-zp-2.hbs", hbsData);

    });

    client.hgetall('promotPageConfig:promotid:' + hbsData.promotid, ep.done("getPageConfig"));

    client.hgetall('promotAwardRuleConfig:promotid:' + hbsData.promotid, ep.done("getAwardRuleConfig"));

    client.hgetall("promotConfig:promotid:" + hbsData.promotid, ep.done("getPromotConfig"));

}

/**
 * 管理
 * @param req
 * @param res
 * @param next
 */
exports.promotPage = function (req, res, next) {

    //TODO::增加权限控制
    var hbsData = {};
    hbsData.username = req.session.username;
    hbsData.promotid = req.session.promotid;
    hbsData.promotTypeName = "转盘2";
    hbsData.activeSiderbar = 'new';

    hbsData.demoIframeSrc = PGV.promotServerUrl + "p/zp/2/show/" + hbsData.promotid + "/-1";

    var ep = new EventProxy();
    ep.fail(function (err) {
        //TODO::返回错误页面信息
        res.send("对不起服务器发生了错误！" + err);
    });

    ep.all("getPageConfig", "getAwardRuleConfig", "getPromotConfig", function (pageReply, awardReply, promotPeply) {

        console.dir(pageReply);

        console.dir(awardReply);

        console.dir(promotPeply);

        /**
         * 基本信息
         */
        hbsData.promotTitle = pageReply.promotTitle;
        hbsData.merchantId = pageReply.merchantid;
        hbsData.wxShareLinkUrl = pageReply.wxShareLinkUrl;
        hbsData.promotIntro = pageReply.promotIntro;
        hbsData.base64Url = PGV.promotServerUrl + "promot/" + promotPeply.base64;
        hbsData.addBase64Url = PGV.appConfig.mainUrl + "r/add/" + promotPeply.base64 + "";

        if (pageReply.wxShareImgKey) {
            hbsData.wxShareImgUrl = PGV.o3oNetConfig.ossPageImgServerUrl + pageReply.wxShareImgKey;
        } else {
            hbsData.wxShareImgUrl = "";
        }


        hbsData.appid = promotPeply.appid;
        hbsData.secret = promotPeply.secret;
        hbsData.component_appid = promotPeply.component_appid;

        console.log("_____________hbsData______________");
        console.log(hbsData);


        /**
         *页面设置
         */
        hbsData.top_1_img_url = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/top-1.png";
        hbsData.top_2_img_url = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/top-2.png";
        hbsData.top_3_img_url = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/top-3.png";
        hbsData.imgUrl_arrow = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/arrow.png";

        if (pageReply.backgroundColor) {
            hbsData.backgroundColor = pageReply.backgroundColor;
        } else {
            hbsData.backgroundColor = "#eeeeee";
        }

        if (pageReply.backgroundStyle === "img") {
            hbsData.backgroundImgUrl = PGV.o3oNetConfig.ossPageImgServerUrl + "public/assets/zp/2/" + hbsData.promotid + "/img/background.png";
        } else {
            hbsData.backgroundImgUrl = "";
        }

        /**
         * 奖项信息
         */

        var awardPlace2Level = JSON.parse(pageReply.awardPlace2Level);
        awardPlace2Level.forEach(function (awardTo, index) {
            var strs = awardTo.split(",");
            strs.forEach(function (num) {
                eval("" + "hbsData.awardTo_" + num + " = " + index);
            });
        });

        hbsData.awards = JSON.parse(pageReply.awardConfig);

        /**
         * 奖项规则信息
         */
        var awardPercents = awardReply.awardPercents.split(",");
        awardPercents.forEach(function (temp, index) {
            eval("hbsData.awardPercent_" + (index + 1) + " = '" + temp + "%'");
        });

        var awardTotals = awardReply.awardTotals.split(",");
        awardTotals.forEach(function (temp, index) {
            eval("hbsData.awardTotal_" + (index + 1) + " = " + temp + "");
        });

        hbsData.limitConfInterDays = awardReply.limitConfInterDays;
        hbsData.limitConfCount = awardReply.limitConfCount;

        hbsData.day_selects_1 = awardReply.day_selects_1;
        hbsData.startTime_1 = awardReply.startTime_1;
        hbsData.endTime_1 = awardReply.endTime_1;
        hbsData.times_selects = awardReply.times_selects;
        hbsData.startTime_times = awardReply.startTime_times;
        hbsData.endTime_times = awardReply.endTime_times;


        hbsData.isFemaleTimes = awardReply.isFemaleTimes;

        /**
         * 其他高级设置
         */
        hbsData.promotStartTime = pageReply.promotStartTime;
        hbsData.promotEndTime = pageReply.promotEndTime;
        hbsData.useWeChat0auth = pageReply.useWeChat0auth;
        hbsData.forceRepeatToGetAward = pageReply.forceRepeatToGetAward;
        hbsData.haveZeroAward = pageReply.haveZeroAward;
        hbsData.backgroundStyle = pageReply.backgroundStyle;
        hbsData.showAwardTheme = pageReply.showAwardTheme;
        hbsData.isOnline = pageReply.isOnline;

        debugger;

        console.dir(hbsData);

        /**
         * 返回数据
         */

        res.render("p/zp/2/admin-new-zp-2.hbs", hbsData);

    });

    client.hgetall('promotPageConfig:promotid:' + hbsData.promotid, ep.done("getPageConfig"));

    client.hgetall('promotAwardRuleConfig:promotid:' + hbsData.promotid, ep.done("getAwardRuleConfig"));

    client.hgetall("promotConfig:promotid:" + hbsData.promotid, ep.done("getPromotConfig"));

}