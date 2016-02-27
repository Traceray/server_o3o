/**
 * Created by o3oNet on 16-2-26.
 */


var wechatUtils = require("./wechatUtils.js");
var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var encodingAESKey = componentConfig.encodingAESKey;
var token = componentConfig.token;


/**
 * 微信开放平台接受事件
 * @param req
 * @param res
 * @param next
 */

exports.getAccept = function (req, res, next) {
    console.log("getFailInfo");
    console.log(req);
    res.send("success");
}

/**
 * 接受微信推送事件
 * @param req
 * @param res
 * @param next
 */
exports.postAccept = function (req, res, next) {


    /**
     * 从req中获取xmldata
     */
    wechatUtils.getMessage(req, function (err, result) {
        if (err) return next(new Error("BadMessage" + err.toString()));

        req.weixin = wechatUtils.formatMessage(result.xml);

        var cryptor = new WXBizMsgCrypt(token, encodingAESKey, component_appid);
        var decrypted = cryptor.decrypt(req.weixin.Encrypt);

        var messageWrapXml = decrypted.message;

        if (messageWrapXml === '') return next(new Error("getMessage messageWrapXml component_verify_ticket Invalid"));

        req.weixin_xml = messageWrapXml;
        xml2js.parseString(messageWrapXml, {trim: true}, function (err, result) {
            if (err) return next(new Error("BadMessage" + err.toString()));

            req.weixin = wechatUtils.formatMessage(result.xml);


            var InfoType = req.weixin.InfoType;

            if (InfoType == "component_verify_ticket") {

                //设置component_verify_ticket
                wxComponentsUtil.svaeComponentVerifyTicket(req.weixin.ComponentVerifyTicket, function (err, data) {

                    if (err) console.error(err);
                    if (!err) console.log(" @@@ --- 设置微信开放平台component_verify_ticket 成功 --- @@@" + data.toString());
                    res.send("success");

                });


            } else if (InfoType == "unauthorized") {

                console.log(" @@@ --- 微信开放平台取消授权 --- @@@" + req.weixin.AuthorizerAppid);

                res.send("success");

            } else if (InfoType == "authorized") {

                console.log(" @@@ --- 微信开放平台授权成功 --- @@@" + req.weixin.AuthorizerAppid);

                res.send("success");

            } else if (InfoType == "updateauthorized") {

                console.log(" @@@ --- 微信开放平台更新授权成功 --- @@@" + req.weixin.AuthorizerAppid);

                res.send("success");

            } else {

                res.send("success");
                
            }


        });

    });


}