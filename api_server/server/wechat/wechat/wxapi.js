/**
 * Created by o3oNet on 16-1-6.
 */

/**
 * 微信主动API
 * @type {API|exports|module.exports}
 */

var WechatAPI = require('wechat-api');
//var wechatUtil = require("../../../utils/weUtil/wechatUtil");

var wechatConfig = require("../../../config/wechatConfig.js");

var appid = wechatConfig.wxAppConfig.appid;
var secret = wechatConfig.wxAppConfig.secret;

//var api = new WechatAPI(appid, secret, function (callback) {
//    // 传入一个获取全局token的方法
//    //从全局缓存读取
//
//    wechatUtil.getWechatToken(appid, secret, function (err, access_token) {
//        if (err) {
//            console.error("error" + err);
//            return callback(err);
//        }
//        console.log("access_token--" + access_token);
//        callback(null, access_token);
//
//    });
//
//}, function (token, callback) {
//    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
//    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
//    //缓存到数据库
//    console.log("savetocken");
//});

var api = new WechatAPI(appid, secret);


exports.wxCreateMenu = function (req, res) {//微信公众平台APP

    var menu = JSON.stringify(require("../../config/menu.json"));

    console.log(menu);

    api.createMenu(menu, function (err, result) {

        console.log("create");
        if (err) {
            console.error(err);
            res.send("error" + err);
        }

        console.log(result);
        res.send(result);
    });

}




