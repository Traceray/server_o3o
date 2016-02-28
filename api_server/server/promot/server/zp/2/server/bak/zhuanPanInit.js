/**
 * Created by Administrator on 2015/5/2.
 */

'use strict';

var client = require('../../../../../lib/connRedis.js');
var pools = require('../../../../../lib/mysqlPooling.js');

var oss = require('../../../../../lib/oss.js');
var util = require('../../../../../util/util.js');

var promotCommFunc = require('../../func/promotCommFunc.js');
var promotConfig = require('../../config/promotConfig.js');

var pGV = require('../../../../../global/promotGlobalVariable.js');

var EventProxy = require('eventproxy');
var crypto = require('crypto');

exports.init = function (req, res, next) {
    //返回的数据
    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var username = req.session.username.trim();
    var templName = req.body.templName.trim();

    console.log("--- 开始创建活动 -- 用户名 -- %s -- 活动模板 -- %s --- ", username, templName);
    var recordTimeLabel = "--- Create Promotion Cost Time - " + new Date().getTime();
    console.time(recordTimeLabel);

    promotCommFunc.savePromotInfo(username, templName, function (err, promotid) {
        debugger;
        if (err) {
            console.error(err);
            sendObj.code = "0";
            sendObj.error.title = "创建活动时发生了错误，请重试!";
            sendObj.error.detail = err;
            res.send(sendObj);
            return;
        }

        req.session.promotid = promotid;
        req.session.templName = templName;

        var ep = new EventProxy();
        ep.fail(function (err) {
            console.error(err);
            sendObj.code = 0;
            sendObj.error.title = "初始化活动信息时发生了错误，请重试!";
            sendObj.error.detail = err;
            res.send(sendObj);
        });
        ep.all("initPageInfo", "initAwardRuleInfo", "copyCommFileToPromotDir", "saveMainUrl", function (a, b, c, d) {
            console.log("--- 成功创建活动 -- 用户名 -- %s -- 活动模板 -- %s --- ", username, templName);
            console.timeEnd(recordTimeLabel);

            sendObj.code = -1;
            sendObj.strInfo = "创建成功!";
            res.send(sendObj);
        });

        //1.初始化页面信息
        __initPageInfo(promotid, ep, "initPageInfo");
        //2.初始化奖项规则信息
        promotCommFunc.initAwardRuleInfo(promotid, ep, "initAwardRuleInfo");
        //3.复制静态文件信息
        __copyCommFileToPromotDir(promotid, templName, ep, "copyCommFileToPromotDir");
        //4.生成入口地址
        __saveMainUrl(promotid, templName, ep, "saveMainUrl");

    });

}

/**
 * 初始化活动消息
 * @param promotid
 * @param ep
 * @param emitName
 * @private
 */
function __initPageInfo(promotid, ep, emitName) {

    var jsonObj = {};
    jsonObj.backgroundColor = "#0c0e0f";
    jsonObj.fontColor = "#e4dd27";
    jsonObj.backgroundStyle = "color";// 默认为img

    jsonObj.top_1_margin = "";
    jsonObj.top_2_margin = "";
    jsonObj.top_3_margin = "";
    jsonObj.arrow_padding = "";

    jsonObj.showAwardTheme = "normal";
    jsonObj.useWeChat0auth = true;
    jsonObj.forceRepeatToGetAward = true;
    jsonObj.haveZeroAward = false;
    jsonObj.zeroAwardTheme = "";
    jsonObj.isOnline = false;

    jsonObj.viewTemplUrl = "";

    var awardPlace2Level = ["7", "8", "2", "4", "1,3", "6", "5"];//初始化配置
    jsonObj.awardPlace2Level = JSON.stringify(awardPlace2Level);

    var awardInfo = [
        {
            awardTitle: "未中奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        },
        {
            awardTitle: "一等奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        },
        {
            awardTitle: "二等奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        },
        {
            awardTitle: "三等奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        },
        {
            awardTitle: "四等奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        },
        {
            awardTitle: "五等奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        },
        {
            awardTitle: "六等奖",
            awardName: "",
            awardShareTitle: "",
            awardImgUrl: ""
        }
    ];

    jsonObj.awardConfig = JSON.stringify(awardInfo);

    client.hmset('promotPageConfig:promotid:' + promotid, jsonObj, ep.done(emitName));

}

/**
 *  复制信息到目录下
 * @param promotid
 * @param templName  模板名称
 * @param ep
 * @param emitName
 * @private
 */
function __copyCommFileToPromotDir(promotid, templName, ep, emitName) {

    //var prefixPath = "/njwxe/public/assets/zp/2/comm/";
    //var keyPath = "public/assets/zp/2/" + promotid + "/";

    var templUrl = promotCommFunc.getTemplUrlFromTemplName(templName);
    var prefixPath = "/" + promotConfig.ossConf.commFilesBuketName + "/public/assets/" + templUrl + "/comm/";
    var keyPath = "public/assets/" + templUrl + "/" + promotid + "/";

    var fileNames = [
        "img/ico.png",
        "img/wap-weixin.png",
        "img/repeat.png",
        "img/arrow.png",
        "img/top-1.png",
        "img/top-2.png",
        "img/top-3.png",
        "img/award_0.png",
        "img/award_1.png",
        "img/award_2.png",
        "img/award_3.png",
        "img/award_4.png",
        "img/award_5.png",
        "img/award_6.png",
        "js/jquery.min.js",
        "js/awardRotate.js",
        "css/common.css",
        "css/demo.css"
    ];

    var fileEp = new EventProxy();
    fileEp.fail(ep.done(emitName));

    fileEp.after("copyFile", fileNames.length, function (list) {
        ep.emit(emitName);
    });


    fileNames.forEach(function (item) {
        debugger;
        var CopySource = prefixPath + item;
        var key = keyPath + item;
        oss.copyObject({
                Bucket: promotConfig.ossConf.promotFileBuketname,
                CopySource: CopySource,
                Key: key,
                CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
                ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
                ContentEncoding: 'utf-8'        // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
            },
            fileEp.group('copyFile')
        );
    });
}

/**
 * 生成活动的主入口
 * @param promotid
 * @param templName
 * @param ep
 * @param emitName
 * @private
 */
function __saveMainUrl(promotid, templName, ep, emitName) {

    var templUrl = promotCommFunc.getTemplUrlFromTemplName(templName);
    var mainUrl = pGV.promotServerUrl + "p/" + templUrl + "/oauth2/" + promotid;
    var withoutLoginUrl = pGV.promotServerUrl + "p/" + templUrl + "/oauth/" + promotid;


    console.log("promotid:" + promotid);
    var base64 = _getPromotidBase64(promotid);

    var md5 = crypto.createHash('md5');
    var md5Key = md5.update(mainUrl).digest('base64');

    var saveEp = new EventProxy();
    saveEp.fail(ep.done(emitName));

    saveEp.all("saveInfoToRedis", "saveInfoToMysql", function (a, b, c) {
        ep.emit(emitName);
    });

    var jsonObj = {};
    jsonObj.promotid = promotid;
    jsonObj.appid = "";
    jsonObj.secret = "";
    jsonObj.mainUrl = mainUrl;
    jsonObj.withoutLoginUrl = withoutLoginUrl;
    jsonObj.md5Key = md5Key;
    jsonObj.base64 = base64;
    jsonObj.useWeChat0auth = true;

    client.hmset("promotConfig:promotid:" + promotid, jsonObj, saveEp.done("saveInfoToRedis"));

    pools.mysqlPromotPool.getConnection(function (err, conn) {
        if (err) {
            saveEp.emit("error", err);
            return;
        }
        //TODO::注入风险
        var insertSQL = "UPDATE PROMOTION SET ? WHERE PROMOTID = ? ";
        var updates = {
            mainUrl: mainUrl,
            withoutLoginUrl: withoutLoginUrl,
            appid: "",
            secret: "",
            md5Key: md5Key,
            base64: base64,
            useWeChat0auth: 1
        };
        conn.query(insertSQL, [updates, promotid], function (err, rows) {
            conn.release();
            if (err) {
                saveEp.emit("error", err);
            } else {
                saveEp.emit("saveInfoToMysql", rows);
            }
        });
    });

}

/**
 * 将promotid 进行一定方式的加密处理
 * 取md5的前4位进行base64加密
 * @param promotid
 */
function _getPromotidBase64(promotid) {
    //取md5的4位
    var md5 = crypto.createHash('md5');
    var md5Key = md5.update(promotid + "").digest('base64');
    var str = "" + md5Key.substr(9, 4) + promotid;
    return new Buffer(str).toString('base64');
}

