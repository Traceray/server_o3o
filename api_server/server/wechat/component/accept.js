/**
 * Created by o3oNet on 16-2-26.
 */


var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

/**
 * 微信开放平台接受事件
 * @param req
 * @param res
 * @param next
 */

exports.getAccept = function (req, res, next) {
    console.log("getFailInfo");
    console.log(req);
}


exports.postAccept = function (req, res, next) {

    //设置component_verify_ticket
    wxComponentsUtil.svaeComponentVerifyTicket(req, function (err, data) {

        if (err) console.error(err);
        console.log(data);
        res.send("success");

    })


}