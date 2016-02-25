/**
 * Created by Administrator on 2015/11/19.
 */

//转发系统到微信

var wechatConfig = require('config').get("wechat.wxAppConfig");

var urlencode = require('urlencode2');

exports.o3oOauth = function (req, res) {
    var appid = wechatConfig.appid;
    var withoutLoginUrl = "http://www.o3onet.com/ff/o3o/show/home/homePage";
    var redirectUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + urlencode(withoutLoginUrl) + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    res.redirect(redirectUrl);
}