/**
 * Created by o3oNet on 16-2-27.
 */

var promotServer = require("./promot.info.server.js");

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPromotionInfo = function (req, res, next) {

    var promotid = req.params.promotid;


    if (err) return next(new Error({code: "010101", error: {title: "promotid cannot be empty!", detatil: err}}));


    promotServer.getPromotionInfo({
        promotid: promotid
    }, function (err, data) {

        if (err) return next(new Error({code: "010102", error: {title: "get promotion info fail!", detatil: err}}));

        res.send({code: 0, error: {title: "", detatil: ""}, jsonData: jsonObj, strInfo: ""});

    });


}


/**
 * 获取多个
 * @param req
 * @param res
 * @param next
 */
exports.getPromotionsInfoList = function (req, res, next) {


    promotServer.getPromotionsInfoList({
        adminName: "adminName"
    }, function (err, data) {

        if (err) return next(new Error({code: "010102", error: {title: "get promotion info fail!", detatil: err}}));

        res.send({code: 0, error: {title: "", detatil: ""}, jsonData: jsonObj, strInfo: ""});

    });


}


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.postPromotionInfo = function (req, res, next) {

    var data = req.body;

    var componentid = data.componentid;
    var appid = data.appid;
    var secret = data.secret;
    var authorizeType = data.authorizeType;
    var name = data.name;
    var templName = data.templName;
    var templType = data.templType;
    var merchantid = data.merchantid;
    var status = data.status;
    var createAdminName = data.createAdminName;
    var startTime = data.startTime;
    var endTime = data.endTime;
    var mainUrl = data.mainUrl;
    var withoutLoginUrl = data.withoutLoginUrl;
    var md5Key = data.md5Key;
    var base64 = data.base64;
    var useWeChat0auth = data.useWeChat0auth;
    var notAvailable = data.notAvailable;


    if (!authorizeType || authorizeType != "wechat_component" && authorizeType != "wechat_urlbind" & authorizeType != "website")
        return res.send(new app.sendJsonObj(10103, "authorizeType shoud be set right!").send());

    if (!templName) return res.send(new app.sendJsonObj(10103, "templName shoud be set right!").send());

    if (!templType || isNaN(templType)) return res.send(new app.sendJsonObj(10103, "templType shoud be set right and should to be integer!").send());

    console.log(data);

    //TODO::校验数据

    promotServer.postPromotionInfo({
        componentid: componentid,
        appid: appid,
        secret: secret,
        authorizeType: authorizeType,
        name: name,
        templName: templName,
        templType: templType,
        merchantid: {
            ids: ["12", "342"]
        },
        status: status,
        createAdminName: createAdminName,
        startTime: startTime,
        endTime: endTime,
        mainUrl: mainUrl,
        withoutLoginUrl: withoutLoginUrl,
        md5Key: md5Key,
        base64: base64,
        useWeChat0auth: useWeChat0auth,
        notAvailable: notAvailable,
    }, function (err, jsonObj) {

        if (err)console.error(err);
        if (err) return res.send(new app.sendJsonObj(10104, "save promotion info fail!", err).send());

        res.send({code: 0, error: {title: "", detatil: ""}, jsonData: jsonObj, strInfo: ""});

    });

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.putPromotionInfo = function (req, res, next) {

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deletePromotionInfo = function (req, res, next) {

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.patchPromotionInfo = function (req, res, next) {

}