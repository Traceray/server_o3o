/**
 * Created by o3oNet on 16-2-27.
 */

var promotPageServer = require("./promot.page.server.js");

var validator = require('is-my-json-valid');

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPromotionPageInfo = function (req, res, next) {

    var promotid = req.params.promotid;


    if (err) return next(new Error({code: "010101", error: {title: "promotid cannot be empty!", detatil: err}}));


    promotPageServer.getPromotionPageInfo({
        promotid: promotid
    }, function (err, data) {

        if (err) return next(new Error({
            code: "010102",
            error: {title: " getPromotionPageInfo info fail!", detatil: err}
        }));

        res.send({code: 0, error: {title: "", detatil: ""}, jsonData: jsonObj, strInfo: ""});

    });


}


/**
 * 获取多个
 * @param req
 * @param res
 * @param next
 */
exports.getPromotionsPageInfoList = function (req, res, next) {


    promotPageServer.getPromotionsPageInfoList({
        adminName: "adminName"
    }, function (err, data) {

        if (err) return next(new Error({
            code: "010102",
            error: {title: "get getPromotionsPageInfoList info fail!", detatil: err}
        }));

        res.send({code: 0, error: {title: "", detatil: ""}, jsonData: jsonObj, strInfo: ""});

    });


}


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.postPromotionPageInfo = function (req, res, next) {

    var data = req.body;

    console.log("---------------------");
    console.log(data);

    var promotid = data.promotid;
    var baseInfo = data.baseInfo;
    var pageInfo = data.pageInfo;
    var awardInfo = data.awardInfo;

    var validata = validator({
        required: true,
        type: 'string',
    });

    //TODO::校验数据

    if (!promotid) return res.send(new app.sendJsonObj(11104, "promotid could not bu null !").send());

    if (!validata(baseInfo)) return res.send(new app.sendJsonObj(11104, "baseInfo is not vaild !").send());

    if (!validata(pageInfo)) return res.send(new app.sendJsonObj(11104, "pageInfo is not vaild !").send());

    if (!validata(awardInfo)) return res.send(new app.sendJsonObj(11104, "awardInfo is not vaild !").send());


    //TODO::校验数据

    promotPageServer.postPromotionPageInfo({
        promotid: promotid,
        baseInfo: JSON.parse(baseInfo),
        pageInfo: JSON.parse(pageInfo),
        awardInfo: JSON.parse(awardInfo),
        notAvailable: 0,
    }, function (err, jsonObj) {

        if (err)console.error(err);
        if (err) return res.send(new app.sendJsonObj(10104, "save promotion page info fail!", err).send());

        res.send({code: 0, error: {title: "", detatil: ""}, jsonData: jsonObj, strInfo: ""});

    });

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.putPromotionPageInfo = function (req, res, next) {


}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deletePromotionPageInfo = function (req, res, next) {

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.patchPromotionPageInfo = function (req, res, next) {

}