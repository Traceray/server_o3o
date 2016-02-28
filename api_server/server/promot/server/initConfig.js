/**
 * Created by Administrator on 2015/5/2.
 */

'use strict';

//var client = require('../../../../../lib/connRedis.js');
//var pools = require('../../../../../lib/mysqlPooling.js');
//
//var oss = require('../../../../../lib/oss.js');
var util = require('../../../../utils/util.js');
//
//var promotCommFunc = require('../../func/promotCommFunc.js');
//var promotConfig = require('../../config/promotConfig.js');
//
//var pGV = require('../../../../../global/promotGlobalVariable.js');
//
//var EventProxy = require('eventproxy');
//var crypto = require('crypto');
//

var request = require('request');

var promotAPIUrl = require("../API.js");

/**
 * 初始化配置
 * @param req
 * @param res
 * @param next
 */
exports.initPromotInfo = function (req, res, next) {


    //1.api 保存基本信息
    //返回的数据
    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    //var username = req.session.username.trim();


    var templName = req.params.templName;
    var templType = req.params.templType;

    //TODO::校验模板文件 templName  templType

    //TODO::获取
    var createAdminName = "shaolanhui";
    var authorizeType = "wechat_component";
    var componentid = "componentid";
    var name = "自推广";
    var appid = "appid";
    var secret = "secret";
    var merchantid = {
        ids: ["12", "342"]
    };


    request.post(promotAPIUrl.promotInfo, {
        form: {
            componentid: componentid,
            appid: appid,
            secret: secret,
            authorizeType: authorizeType,
            name: name,
            templName: templName,
            templType: templType,
            merchantid: merchantid,
            status: 0,
            createAdminName: createAdminName,
            startTime: new Date(),
            endTime: util.dateAdd(new Date(), "month", 1),
            useWeChat0auth: 1,
            notAvailable: 0,
        },
        json: true
    }, function (err, response, body) {

        if (err) return res.send(new app.sendJsonObj(200101, "活动初始化时调用API网络错误,或不可用", err).send(true));

        if (body.code != 0) return res.send(body);

        console.log(" @@@ --- 开始创建活动 -- 用户名 -- %s -- 活动模板 -- %s --- @@@ ", createAdminName, templName);
        var recordTimeLabel = "--- Create Promotion Cost Time - " + new Date().getTime();
        console.time(recordTimeLabel);

        var promotid = body.jsonData.promotid;

        __initPageInfo(promotid, templName, templType, function (err, data) {
            console.log("here");
            res.send(data);
        });

        //var ep = new EventProxy();
        //ep.fail(function (err) {
        //    console.error(err);
        //    sendObj.code = 0;
        //    sendObj.error.title = "初始化活动信息时发生了错误，请重试!";
        //    sendObj.error.detail = err;
        //    res.send(sendObj);
        //});
        //ep.all("initPageInfo", "initAwardRuleInfo", "copyCommFileToPromotDir", "saveMainUrl", function (a, b, c, d) {
        //    console.log("--- 成功创建活动 -- 用户名 -- %s -- 活动模板 -- %s --- ", username, templName);
        //    console.timeEnd(recordTimeLabel);
        //
        //    sendObj.code = -1;
        //    sendObj.strInfo = "创建成功!";
        //    res.send(sendObj);
        //});
        //
        ////1.初始化页面信息
        //__initPageInfo(promotid, templName, templType, ep, "initPageInfo");
        ////2.初始化奖项规则信息
        //promotCommFunc.initAwardRuleInfo(promotid, ep, "initAwardRuleInfo");
        ////3.复制静态文件信息
        //__copyCommFileToPromotDir(promotid, templName, ep, "copyCommFileToPromotDir");
        ////4.生成入口地址
        //__saveMainUrl(promotid, templName, ep, "saveMainUrl");

    })


}


/**
 * 初始化活动消息
 * @param promotid
 * @param ep
 * @param emitName
 * @private
 */
function __initPageInfo(promotid, templName, templType, cb, emitName) {


    var baseInfo = {
        useWeChat0auth: true, //是否需要确认授权登陆
        forceRepeatToGetAward: true,//是否需要强制关注
        haveZeroAward: false,//是否有0等奖
        isOnline: false,//是否在线
    };

    var awardInfo = [
        {
            awardTitle: "未中奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        },
        {
            awardTitle: "一等奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        },
        {
            awardTitle: "二等奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        },
        {
            awardTitle: "三等奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        },
        {
            awardTitle: "四等奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        },
        {
            awardTitle: "五等奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        },
        {
            awardTitle: "六等奖", awardName: "", awardShareTitle: "", awardImgUrl: ""
        }
    ];


    var pageInfoConfig = require("./" + templName + "/" + templType + "/" + "pageInfoConfig.js");

    pageInfoConfig.initPageInfo({
        promotid: promotid,
        templName: templName,
        templType: templType,
        baseInfo: baseInfo,
        awardInfo: awardInfo
    }, function (err, jsonObj) {
        if (err) console.error(err);
        cb(null, jsonObj);
    });

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

