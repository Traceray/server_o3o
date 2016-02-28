/**
 * Created by Administrator on 2015/5/2.
 */

'use strict';

var client = require('../../../../../lib/connRedis.js');
var pools = require('../../../../../lib/mysqlPooling.js');

var EventProxy = require('eventproxy');
var oss = require('../../../../../lib/oss.js');

var promotConfig = require('../../config/promotConfig.js');

var promotCommFunc = require('../../func/promotCommFunc.js');
var promotCommConfig = require("../../func/promotCommConfig.js");

/**
 * 保存活动基本信息
 * @param req
 * @param res
 * @param next
 */
exports.basicInfoSet = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var ep = new EventProxy();

    ep.fail(function (err) {
        debugger;
        console.error(err);
        sendObj.code = 0;
        sendObj.error.title = "保存活动基本信息时发生了错误，请重试!";
        sendObj.error.detailInfo = "" + err;
        res.send(sendObj);
    });

    ep.all("saveBasicInfo", function (a) {
        debugger;
        sendObj.code = -1;
        sendObj.strInfo = "ok";
        res.send(sendObj);
    });

    promotCommConfig.promotBasicInfoSet(req, ep, "saveBasicInfo");

}

/**
 * 保存页面配置信息
 * @param req
 * @param res
 * @param next
 */
exports.pageConfigSet = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(err);
        sendObj.code = 0;
        sendObj.error.title = "保存页面配置信息时发生了错误，请重试!";
        sendObj.error.detailInfo = "" + err;
        res.send(sendObj);
    });

    ep.all("savePageImageInfo", "saveInfo", "saveAppInfo", "incrbyPromotVersion", function (a, b, c, d) {
        sendObj.code = -1;
        sendObj.strInfo = "ok";
        res.send(sendObj);
    });

    //1.异步保存页面图片消息
    __savePageImageInfo(req, ep, "savePageImageInfo");
    //2.保存基本信息到redis数据库中
    __savePageInfoConfig(req, ep, "saveInfo");
    //3.保存平台消息到卡券页面内
    __saveAppInfoConfig(req, ep, "saveAppInfo");
    //4.增加一次版本号
    promotCommFunc.incrbyPromotVersion(req, ep, "incrbyPromotVersion");

}

/**
 * 保存奖项配置信息
 * @param req
 * @param res
 * @param next
 */
exports.awardConfigSet = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(err);
        sendObj.code = 0;
        sendObj.error.title = "保存奖项配置信息时发生了错误，请重试!";
        sendObj.error.detailInfo = "" + err;
        res.send(sendObj);
    });

    ep.all("saveAwardImageInf", "saveInfo", "incrbyPromotVersion", function (a, b, c) {
        sendObj.code = -1;
        sendObj.strInfo = "ok";
        res.send(sendObj);
    });

    //TODO::校验参数

    //1.异步保存奖项图片信息
    __saveAwardImageInfo(req, ep, "saveAwardImageInf");
    //2.保存奖项信息
    __saveAwardInfoConfig(req, ep, "saveInfo");
    //3.增加一次版本号
    promotCommFunc.incrbyPromotVersion(req, ep, "incrbyPromotVersion");

}

/**
 * 保存中奖规则信息
 * @param req
 * @param res
 * @param next
 */
exports.awardRuleConfigSet = function (req, res, next) {//TODO::更加完善的出奖规则和方案
    debugger;

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var ep = new EventProxy();

    ep.fail(function (err) {
        debugger;
        console.error(err);
        sendObj.code = 0;
        sendObj.error.title = "保存活动中奖规则时发生了错误，请重试!";
        sendObj.error.detailInfo = "" + err;
        res.send(sendObj);
    });

    ep.all("awardRuleConfig", function (a) {
        debugger;
        sendObj.code = -1;
        sendObj.strInfo = "ok";
        res.send(sendObj);
    });

    promotCommConfig.awardRuleConfigSet(req, ep, "awardRuleConfig");

}

exports.otherInfoConfigSet = function (req, res, next) {

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    var ep = new EventProxy();

    ep.fail(function (err) {
        debugger;
        console.error(err);
        sendObj.code = 0;
        sendObj.error.title = "保存活动高级规则时发生了错误，请重试!";
        sendObj.error.detailInfo = "" + err;
        res.send(sendObj);
    });

    ep.all("otherInfoConfig", function (a) {
        debugger;
        sendObj.code = -1;
        sendObj.strInfo = "ok";
        res.send(sendObj);
    });

    promotCommConfig.otherInfoConfigSet(req, ep, "otherInfoConfig");

}


function __savePageImageInfo(req, ep, emitName) {

    var params = req.body;
    var promotid = params.promotid || req.session.promotid;

    var top_1_img = params.top_1_img;
    var top_2_img = params.top_2_img;
    var top_3_img = params.top_3_img;
    var imgUrl_arrow = params.imgUrl_arrow;
    var backgroundImg = params.backgroundImg;

    var images = [
        {
            destKeyName: "top-1.png",
            sourceFileName: top_1_img
        },
        {
            destKeyName: "top-2.png",
            sourceFileName: top_2_img
        },
        {
            destKeyName: "top-3.png",
            sourceFileName: top_3_img
        },
        {
            destKeyName: "arrow.png",
            sourceFileName: imgUrl_arrow
        },
        {
            destKeyName: "background.png",
            sourceFileName: backgroundImg
        }
    ];

    promotCommFunc.copyFileToPromotOss(promotid, images, "zp/2", ep, emitName);

}

function __saveAppInfoConfig(req, ep, emitName) {
    var params = req.body;//保存页面基本信息
    var promotid = params.promotid;
    var jsonObj = {};
    if (params.appid) {
        jsonObj.appid = params.appid;
        jsonObj.secret = params.secret;
    } else {
        jsonObj.appid = "";
        jsonObj.secret = "";
    }
    jsonObj.component_appid = params.component_appid;
    console.dir(jsonObj);
    client.hmset('promotConfig:promotid:' + promotid, jsonObj, ep.done(emitName));
}


function __savePageInfoConfig(req, ep, emitName) {

    var params = req.body;//保存页面基本信息
    var promotid = params.promotid || req.session.promotid;

    var jsonObj = {};
    if (params.backgroundColor) {
        jsonObj.backgroundColor = params.backgroundColor;
    }
    if (params.top_1_margin) {
        jsonObj.top_1_margin = params.top_1_margin;
    }
    if (params.top_2_margin) {
        jsonObj.top_2_margin = params.top_2_margin;
    }
    if (params.top_3_margin) {
        jsonObj.top_3_margin = params.top_3_margin;
    }
    if (params.arrow_padding) {
        jsonObj.arrow_padding = params.arrow_padding;
    }
    if (params.backgroundImg) {
        jsonObj.backgroundStyle = "img";
    } else {
        jsonObj.backgroundStyle = "color";
    }
    if (params.pageConfigRule) {
        jsonObj.pageConfigRule = params.pageConfigRule;
    } else {
        jsonObj.pageConfigRule = "";
    }

    //不能做非空判断,避免所有项均为空，无法保存

    client.hmset('promotPageConfig:promotid:' + promotid, jsonObj, ep.done(emitName));

}

/**
 * 配置奖品图片
 * @param req
 * @param ep
 * @param emitName
 * @private
 */
function __saveAwardImageInfo(req, ep, emitName) {

    var params = req.body;
    var promotid = params.promotid || req.session.promotid;
    var awardConfig = params.awardConf;

    var images = [];
    awardConfig.forEach(function (award, index) {
        var image = {};
        image.destKeyName = "award_" + index + ".png";
        image.sourceFileName = award.awardImgUrl;
        images.push(image);
    });

    promotCommFunc.copyFileToPromotOss(promotid, images, "zp/2", ep, emitName);

}

/**
 * 保存奖项信息
 * @param req
 * @param ep
 * @param emitName
 * @private
 */
function __saveAwardInfoConfig(req, ep, emitName) {
    debugger;
    var params = req.body;
    var promotid = params.promotid || req.session.promotid;
    var awardConfig = params.awardConf;
    var awardPlace2Level = params.awardPlace2Level;

    var jsonObj = {
        awardConfig: JSON.stringify(awardConfig), //转换为字符串存储，JSON。parse().取出
        awardPlace2Level: awardPlace2Level
    }

    console.dir(jsonObj);

    client.hmset('promotPageConfig:promotid:' + promotid, jsonObj, ep.done(emitName));

}


//function _checkBasicInfoParams(req, res) {
//    var sendObj = {
//        code: -1,
//        error: {
//            title: "",
//            detail: ""
//        },
//        jsonData: {},
//        strInfo: ""
//    }
//
//    var params = req.body;
//    var promotTitle = params.promotTitle;
//    var merchantid = params.merchantId;
//    var promotid = params.promotid || req.session.promotid;
//    var imgUrl_wxShareImg = params.imgUrl_wxShareImg;
//    var wxShareLinkUrl = params.wxShareLinkUrl;//可空
//    var promotIntro = params.promotIntro;//可空
//
//    if (!promotTitle) {
//        sendObj.code = 0;
//        sendObj.error.title = "活动标题不能为空";
//        sendObj.error.detailInfo = "";
//        res.send(sendObj);
//        return false;
//    }
//    if (!merchantid) {
//        sendObj.code = 0;
//        sendObj.error.title = "商户编号不能为空";
//        sendObj.error.detailInfo = "";
//        res.send(sendObj);
//        return false;
//    }
//    if (!promotid) {
//        sendObj.code = 0;
//        sendObj.error.title = "活动编号不能为空";
//        sendObj.error.detailInfo = "";
//        res.send(sendObj);
//        return false;
//    }
//    //转发图片必填
//    if (!imgUrl_wxShareImg) {
//        sendObj.code = 0;
//        sendObj.error.title = "转发的图片不能为空";
//        sendObj.error.detailInfo = "";
//        res.send(sendObj);
//        return false;
//    }
//    return true;
//}

exports.test = function (req, res, next) {
    //var jsonObj = {
    //    key1:11,
    //    key3:32
    //}
    //client.hmset('promotPageConfig:test:promotid:' + "100001", jsonObj, function (err, reply) {//中奖规则
    //    if (err) {
    //        console.error(err);
    //    }
    //    res.send(reply);
    ////});
    client.hgetall('promotPageConfig:promotid:' + "200001", function (err, jsonObj) {//中奖规则
        console.dir(jsonObj);
        res.send(jsonObj);
    });

    //client.hincrby('promotPageConfig:test:promotid:' + "100001", 'version', 1, function (err, reply) {
    //    if (err) console.error(err);
    //    console.log(reply);
    //    res.send(reply);
    //});

    //var imgUrl_wxShareImg = "http://njwxe.o3onet.com/public/assets/temp/1.jpg";
    //var CopySource = imgUrl_wxShareImg.substr(imgUrl_wxShareImg.indexOf("/public"));
    //res.send(CopySource);

    //var promotid = "200001";
    //
    //var imgUrl_wxShareImg = "http://njwxe.o3onet.com/public/assets/zp/2/100001/img/repeat.jpg";
    ////以下链接一点都不能错-阿里坑
    //var CopySource = "/njwxe/" + imgUrl_wxShareImg.substr(imgUrl_wxShareImg.indexOf("public"));
    //var key = "public/assets/zp/2/" + promotid + "/img/wxShareImg.png";
    //oss.copyObject({
    //        Bucket: 'njwxe',
    //        CopySource: CopySource,
    //        Key: key,
    //        //CopySourceIfMatch: '',
    //        //CopySourceIfNoneMatch: '',
    //        //CopySourceIfModifiedSince: '',
    //        //CopySourceIfUnmodifiedSince: '',
    //        //CopySourceIfModifiedSince: '',
    //        //MetadataDirective: 'REPLACE',     // 'REPLACE' 表示覆盖 meta 信息，'COPY' 表示不覆盖，只拷贝
    //        //AccessControlAllowOrigin: '',
    //        ContentType: 'image/png',
    //        CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
    //        ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
    //        ContentEncoding: 'utf-8'        // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
    //    },
    //    function (err, data) {
    //        if (err) {
    //            console.log('error:', err);
    //            return;
    //        }
    //        console.log('success:', data);
    //        res.send(data);
    //    });

    //var fs = require('fs');
    //
    //fs.readFile('test.json', function (err, data) {
    //    if (err) {
    //        console.log('error:', err);
    //        return;
    //    }
    //
    //    oss.putObject({
    //            Bucket: 'njwxe',
    //            Key: 'test.json',
    //            Body: data,
    //            AccessControlAllowOrigin: '',
    //            ContentType: 'text/plain',
    //            CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
    //            ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
    //            ContentEncoding: 'utf-8',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
    //            ServerSideEncryption: 'AES256'
    //        },
    //        function (err, data) {
    //
    //            if (err) {
    //                console.log('error:', err);
    //                return;
    //            }
    //
    //            console.log('success:', data);
    //
    //        });
    //});

    //function _checkBasicInfoParams(req, ep) {
    //    debugger;
    //    var params = req.body;
    //    var promotTitle = params.promotTitle;
    //    var merchantid = params.merchantId;
    //    var promotid = params.promotid || req.session.promotid;
    //    var templName = req.session.templName;//模板名称
    //    var imgUrl_wxShareImg = params.imgUrl_wxShareImg;
    //    var promotIntro = params.promotIntro;//可空
    //    var wxShareLinkUrl = params.wxShareLinkUrl;//可空
    //
    //    if (!promotTitle) {
    //        debugger;
    //        ep.emit("error", "活动标题不能为空");
    //        return false;
    //    }
    //    if (!merchantid) {
    //        ep.emit("error", "商户编号不能为空");
    //        return false;
    //    }
    //    if (!promotid) {
    //        ep.emit("error", "活动编号不能为空");
    //        return false;
    //    }
    //    //转发图片必填
    //    if (!imgUrl_wxShareImg) {
    //        ep.emit("error", "转发的图片不能为空");
    //        return false;
    //    }
    //
    //    //other
    //    return true;
    //}


}

