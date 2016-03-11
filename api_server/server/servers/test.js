/**
 * Created by o3oNet on 2015-04-06.
 */

'use strict';


var util = require('../../../utils/util.js');

var encoding = require('encoding');

var httpHelper = require('../../../lib/httpHelper.js');

var request = require('request');

var wxComponentsUtil = require("../../../utils/wechat/wxComponentsUtil.js");

exports.test1 = function (req, res, next) {
    console.log(" ---- test1 ");
    var name = req.params.name;
    var type = req.params.type;
    var promotid = req.params.promotid;

    wxComponentsUtil.getComponentVerifyTicket(function(err,data){

        console.error(err);
        console.log(data);
        res.send(data);
    });

    //res.send("code--" + req.query.code + "-state-" + req.query.state + "-");

    //res.send("test1" + name + "-" + type + "-" + promotid);
    //var err = new Error('无法找到。');
    //err.status = 500;
    //err.detail = "xiangxicuowu1";
    //err.code = 1036;
    //next(err);
    //return next(new Error(" @@@--- 获取访问者授权失败 ---@@@ "));


    //var wxComponentsUtil = require("../../../utils/wechat/wxComponentsUtil.js")
    //
    //wxComponentsUtil.getComponentAccessToken(function (err, data) {
    //    console.log(data)
    //    res.send(data);
    //});

    //wxComponentsUtil.saveComponentAccessToken("token", function (err, data) {
    //    console.log(data);
    //    res.send(data);
    //});


    //var Component = require("wechat-component");
    //
    //var wxComponentsUtil = require("../../../utils/wechat/wxComponentsUtil.js");
    //
    //var componentConfig = require("config").get("wechat.componentConfig");
    //var baseInfoConfig = require("config").get("app.baseInfo");
    //
    //var component_appid = componentConfig.component_appid;//开放平台appid
    //var component_appsecret = componentConfig.component_appsecret;
    //
    //var websiteUrl = baseInfoConfig.websiteUrl;
    //var protocol = baseInfoConfig.protocol;
    //
    //var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);


    //var bb = function (appid, get, save) {
    //    console.log(appid);
    //    get(function (err, hh) {
    //        console.log("err-" + err);
    //        console.log("hh-" + hh);
    //        res.send(0);
    //    });
    //}
    //
    //
    //var cc = function (aa, callback) {
    //    return function (callback) {
    //        callback(aa + "-bbb", aa + "-hhh")
    //    }
    //}
    //
    //bb(123, cc("ceshia"));


}

exports.test2 = function (req, res, next) {
    console.log(" ---- test2 ");
    res.send("test2");
}


exports.show = function (req, res) {
    /**
     * 测试Aliyun MNS
     */


    //
    //console.log("show - test");
    //
    //
    //request.post("http://localhost:9100/api/cgi-bin/token", {
    //    form: {
    //        grant_type: 'password',
    //        client_id: 'papers3',
    //        client_secret: '123',
    //        username: 'alex@example.com12345678',
    //        password: '1234567'
    //    },
    //    json: true
    //}, function (err, response, body) {
    //    //console.log(err);
    //    //console.log(response);
    //    //console.log(body)
    //    // assert.equal(typeof body, 'object')
    //    res.send(body);
    //})


    //request.post({
    //    url: "http://localhost:9100/api/cgi-bin/token",
    //    headers: {
    //        'content-type': 'application/x-www-form-urlencoded',
    //    },
    //    form: {
    //        grant_type: 'password',
    //
    //    },
    //    body: JSON.stringify({
    //        client_id: 'thom',
    //        client_secret: 'nightworld'
    //    }),
    //    strictSSL: false
    //}, function (e, r, user) {// strictSSL: false  可以不用校验ssl
    //    console.log(e);
    //    console.log(r);
    //    console.log(user)
    //
    //    res.send(user);
    //
    //});

    //var
    //    url = 'https://localhost:9101/api/v1/users'
    //    , qs =
    //    {
    //        screen_name: "scree"
    //        , user_id: "id"
    //    }
    //
    //
    //request.get({
    //    url: url,
    //    oauth: {},
    //    qs: qs,
    //    json: true,
    //    strictSSL: false
    //}, function (e, r, user) {// strictSSL: false  可以不用校验ssl
    //
    //    console.log(e);
    //    console.log(r);
    //
    //    console.log(user)
    //    res.send(user);
    //})

    //var tulingUrl = 'http://www.tuling123.com/openapi/api?key=88c057b3984131686fcc56f278f43cb8&info=' + encodeURIComponent("天气");
    //
    //console.log(tulingUrl);
    //
    //
    //request(tulingUrl, function (error, response, body) {
    //    if (!error && response.statusCode == 200) {
    //        console.log("___@___ %s ___@___", "从微信获取wechat_token成功!");
    //        var new_token = JSON.parse(body);
    //        res.send(new_token);
    //    }
    //});
    //
    //
    //return;
    ////res.send("Hello World");
    //console.log("url" + req.url);
    //console.log("originalUrl" + req.originalUrl);
    //console.log("hostname" + req.hostname);
    //console.log(req.ips);
    //console.log("protocol" + req.protocol)
    //console.log("xhr" + req.xhr)
    ////res.render("demo.hbs");
    //var ip = util.getUserRealIp(req);
    //console.log("------util.getUserRealIp(req)--" + util.getUserRealIp(req));
    //console.log(ip);
    //console.log("--util.getClientIp(req)----" + util.getClientIp(req));
    //console.log("----req.ip--" + req.ip)
    //console.log("ips");
    //console.log(req.ips);
    //res.send("asdas");

}

exports.show1 = function (req, res) {
    var userInfo = {
        phoneNumber: "",
        openid: "",
        nickName: "",
        headerUrl: "",
        age: "",
        sex: "",
        registerTime: "",
        address: [
            {
                name: "",
                phone: "",
                address: "",
                jingweidu: ""
            },
            {
                name: "",
                phone: "",
                address: "",
                jingweidu: ""
            }
        ],
        jifen: "",
        yue: ""
    }
    var name = req.session.name;
    res.send("name-" + name);
    //res.render("demo1.hbs");
}

exports.show2 = function (req, res) {
    //res.send("Hello World");

    req.session.name = "Trac";
    res.send("hello");
}