/**
 * Created by o3oNet on 16-1-24.
 * 微信授权认证相关
 */

var OAuth = require('wechat-oauth');
var request = require('request');

var appConfig = require("config").get("app");
var wechatCOnfig = require("config").get("wechat.wxAppConfig");


var client = new OAuth(wechatCOnfig.appid, wechatCOnfig.secret);

var redirectUrl = "http://" + appConfig.baseInfo.websiteUrl + "/" + appConfig.baseInfo.appName + "/" + appConfig.baseInfo.prefixPath + "/show/";

var oauthRedirectUrl = "http://" + appConfig.baseInfo.websiteUrl + "/" + appConfig.baseInfo.appName + "/wechat/oauth2/";

var saveUserInfoAPI = "http://" + appConfig.baseInfo.websiteUrl + "/" + appConfig.baseInfo.appName + "/v1/users/wechat/";


console.log(saveUserInfoAPI);

//var oauthApi = new OAuth('appid', 'secret', function (openid, callback) {
//    // 传入一个根据openid获取对应的全局token的方法
//    // 在getUser时会通过该方法来获取token
//    fs.readFile(openid + ':access_token.txt', 'utf8', function (err, txt) {
//        if (err) {
//            return callback(err);
//        }
//        callback(null, JSON.parse(txt));
//    });
//}, function (openid, token, callback) {
//    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
//    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
//    // 持久化时请注意，每个openid都对应一个唯一的token!
//    fs.writeFile(openid + ':access_token.txt', JSON.stringify(token), callback);
//});

//TODO::解决全局缓存的问题

exports.oauth2URL_BASE = function (req, res, next) {
    var url = client.getAuthorizeURL(oauthRedirectUrl + "base", appConfig.baseInfo.name, 'snsapi_base');
    res.redirect(url);
}

exports.oauth2URL_USERINFO = function (req, res, next) {
    var url = client.getAuthorizeURL(oauthRedirectUrl + "userinfo", appConfig.baseInfo.name, 'snsapi_userinfo');
    console.log(url);
    res.redirect(url);
}

exports.oauth2_BASE = function (req, res, next) {

    client.getAccessToken(req.query.code, function (err, result) {

        if (result.errcode != 0) {
            res.redirect(redirectUrl);
            return;
        }

        var accessToken = result.data.access_token;
        var openid = result.data.openid;
        res.redirect(redirectUrl);

    });

}

exports.oauth2_USERINFO = function (req, res, next) {


    client.getAccessToken(req.query.code, function (err, result) {

        console.log(" wei win result");

        console.log(result);

        //if (result.errcode != 0) {
        //    res.redirect(redirectUrl);
        //    return;
        //}

        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        client.getUser(openid, function (err, result) {
            if (err) {
                console.error("!!!---获取用户信息错误---!!!");
                console.error(err);
                res.redirect(redirectUrl);
                return;
            }
            var userInfo = result;


            var uuid = req.session.uuid;

            console.log("oauth2_USERINFO - uuid " + uuid);

            if (uuid) {
                request.patch(saveUserInfoAPI + "/" + uuid, {
                    form: {
                        openid: openid,
                        nickname: userInfo.nickname,
                        sex: userInfo.sex,
                        province: userInfo.province,
                        city: userInfo.city,
                        country: userInfo.country,
                        headimgurl: userInfo.headimgurl,
                    },
                    json: true
                }, function (err, response, body) {
                    console.error(err);
                    console.log(body);

                    if (err) {
                        console.error("!!!---微信授权获取用户信息并保存失败---!!!");
                        console.error(err.toString());
                        res.redirect(redirectUrl);
                        return;
                    }

                    if (body.code != 0) {
                        console.error("!!!---微信授权获取用户信息并保存失败---!!!");
                        res.redirect(redirectUrl);
                    }

                    if (!err && body.code == 0) {
                        req.session.openid = openid;
                        req.session.uuid = body.jsonData.uuid;
                        res.redirect(redirectUrl);
                    }

                });
            } else {
                request.post(saveUserInfoAPI, {
                    form: {
                        openid: openid,
                        nickname: userInfo.nickname,
                        sex: userInfo.sex,
                        province: userInfo.province,
                        city: userInfo.city,
                        country: userInfo.country,
                        headimgurl: userInfo.headimgurl,
                    },
                    json: true
                }, function (err, response, body) {
                    console.error(err);
                    console.log(body);

                    if (err) {
                        console.error("!!!---微信授权获取用户信息并保存失败---!!!");
                        console.error(err.toString());
                        res.redirect(redirectUrl);
                        return;
                    }

                    if (body.code != 0) {
                        console.error("!!!---微信授权获取用户信息并保存失败---!!!");
                        res.redirect(redirectUrl);
                    }

                    if (!err && body.code == 0) {
                        req.session.openid = openid;
                        req.session.uuid = body.jsonData.uuid;
                        res.redirect(redirectUrl);
                    }

                });
            }


        });

    });

}




