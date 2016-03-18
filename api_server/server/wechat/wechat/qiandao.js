/**
 * Created by Administrator on 2016/3/17 0017.
 */

var OAuth = require('wechat-oauth');
var Component = require("wechat-component");
var fs = require('fs');

var request = require("request");

var wxUtil = require("../../../../utils/wechat/wxUtil.js");
var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var baseInfoConfig = require("config").get("app.baseInfo");
var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);

var websiteUrl = baseInfoConfig.websiteUrl;
var protocol = baseInfoConfig.protocol;

var util = require("../../../../utils/util.js");

var weixin = require("./weixin.js")

exports.show = function (req, res, next) {

    var scope = "snsapi_userinfo";
    //var redirectUrl = "promotUrl";
    var appid = "wxbc9b7da0b82ac2b8";
    var secret = "b82d9c4fbfc91c9a571357ccaa93d497";
    var authorizeType = "wechat_component";

    //res.render("./wechat/qiandao/qiandao.hbs", {
    //    openid: "oMcl1t3G0brAjJ9Z3dJK-xFgQiXQ",
    //    userInfo: {
    //        headimgurl: "http://wx.qlogo.cn/mmopen/pb4pbeotvU8icraRRbm3a8kufiarhEVvb8lia3skqktb45lxTcKVic8mXIZKEqr6Gib6YhavmEGbIA3pvK25YZlLicaepYoUKVc3nf/0"
    //    }
    //});


    console.log(" @@@ -- req.query.code -- @@@ - " + req.query.code);

    if (!req.query.code) {

        //检验授权方式
        if (authorizeType == "wechat_component") {
            var oauthApi = component.getOAuth(appid, wxComponentsUtil.getComponentOpendIdAccessToken, wxComponentsUtil.saveComponentOpendIdAccessToken);
        } else if (authorizeType == "wechat_urlbind") {
            var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));
        } else {
            return next(new Error(" @@@ --- 该活动并为指定微信公众平台授权方式或是授权信息已经失效 --- @@@ "));
        }

        var redirectURI = protocol + websiteUrl + "/ztg/wechat/qiandao/show";

        var url = oauthApi.getAuthorizeURL(redirectURI, "state", scope);

        console.log(url)

        return res.redirect(url);

    } else {

        console.log(" @@@ -- req.query.code -- @@@ " + req.query.code);

        //检验授权方式
        if (authorizeType == "wechat_component") {
            var oauthApi = component.getOAuth(appid, wxComponentsUtil.getComponentOpendIdAccessToken, wxComponentsUtil.saveComponentOpendIdAccessToken);
        } else if (authorizeType == "wechat_urlbind") {
            var oauthApi = new OAuth(appid, secret, wxUtil.getWechatAccessToken(appid), wxUtil.saveWechatAccessToken(appid));
        } else {
            return next(new Error(" @@@ --- 该活动并为指定微信公众平台授权方式或是授权信息已经失效 --- @@@ "));
        }

        var redirectURI = protocol + websiteUrl + "/ztg/wechat/qiandao/show";
        var url = oauthApi.getAuthorizeURL(redirectURI, "state", scope);
        console.log(url)

        oauthApi.getAccessToken(req.query.code, function (err, result) {

            if (err) console.error(err);

            if (err) return res.send(err);

            console.log(result);

            var accessToken = result.data.access_token;
            var openid = result.data.openid;

            console.log(" get openid - " + openid);

            oauthApi.getUser(openid, function (err, result) {
                if (err) {
                    console.error("!!!---获取用户信息错误---!!!");
                    console.error(err);
                    res.redirect(url);
                    return;
                }
                var userInfo = result;

                /**
                 * TODO::使用RESTFULAPI保存用户信息
                 */
                console.log(userInfo)


                //获取用户信息

                res.render("./wechat/qiandao/qiandao.hbs", {
                    openid: openid,
                    userInfo: userInfo
                })


            });


        });


    }


}

exports.accept = function (req, res, next) {

    var data = req.body;
    var username = data.username;
    var phoneNum = data.phoneNum;
    var openid = data.openid;
    var headimgurl = data.headimgurl;

    /**
     * 保存数据
     */
    app.models.qiandaoinfo.create({
        username: username,
        phoneNum: phoneNum,
        openid: openid,
        headimgurl: headimgurl
    }, function (err, model) {
        if (err) console.error(err)
        if (err) {

        }

        var num = util.fRandomBy(100, 200);

        var randomNum = util.fRandomBy(1, 100);

        if (randomNum > 90) {
            num = 1888
        }

        if (randomNum < 26) {
            num = util.fRandomBy(180, 500);
        }

        console.log(" num - " + num);

        var data = {
            min_value: 100,
            max_value: 2000,
            total_amount: num,
            re_openid: "oMcl1t3G0brAjJ9Z3dJK-xFgQiXQ",
            showName: "摇一摇红包活动",
            clientIp: "182.92.238.110",
            luckyMoneyWishing: "生活更美好",
            mch_id: "1314935701",
            wxappid: "wxbc9b7da0b82ac2b8",
            wxkey: "m9jrvj9TV616V9w6gvp95V91vV99JfrV",
            send_name: "沈阳泛美传媒"
        }

        weixin.sendLuckyMoney(req, res, data, function (err, ret) {

            console.log("ok");
            console.log(err);
            console.log(ret);

            var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

            if (err) {
                sendObj.code = 1;
                sendObj.strInfo = "红包发送失败,请重试!";
                res.send(sendObj);
                return;
            }

            if (ret.result_code == "SUCCESS") {

                /**
                 * save info
                 */
                app.models.hongbaoinfo.create({
                    openid: openid,
                    num: num
                }, function (err, model) {
                    sendObj.code = -1;
                    sendObj.strInfo = "红包发送成功!";
                    res.send(sendObj);
                    return;
                });

            } else {
                sendObj.code = ret.err_code;
                sendObj.strInfo = ret.err_code_des;
                res.send(sendObj);
            }

        });


    });

}
