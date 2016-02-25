/**
 * Created by o3oNet on 16-1-25.
 */

var appConfig = require("config").get("app");

var redirectWechatUrl = "/" + appConfig.baseInfo.appName + "/wechat/oauth2/url/" + "userinfo";//是否需要确认登陆

var redirectUrl = "/" + appConfig.baseInfo.appName + "/" + appConfig.baseInfo.prefixPath + "/show/";//直接到系统

/**
 * 客户端系统的入口文件
 * 1.权限控制
 * 2.访问次数控制
 * 3.个性化页面
 * 4.根据客户端的不同返回不同的页面(apple,android)
 * 5.访问次数限制
 * 6.IP访问控制
 * 7.统计访问信息
 */

exports.entryIndex = function (req, res, next) {

    //1.判断用户使用的客户端

    var userAgent = req.get("user-agent").toLowerCase();
    console.log(userAgent);
    if (userAgent.match(/MicroMessenger/i) == "micromessenger") {//是否微信访问
        //TODO::查看系统缓存中是否存在uuid来判断是否为注册用户
        res.redirect(redirectWechatUrl);
    } else {
        res.redirect(redirectUrl);
    }


}