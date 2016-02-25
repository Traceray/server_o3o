/**
 * Created by o3oNet on 2015-04-06.
 */

'use strict';

var client = require('../../../lib/connRedis1.js');
var weUtil = require("../../../utils/weUtil/weUtil.js");
var util = require("../../../utils/util.js");
var wechatConfig = require("config").get("wechat");
var fs = require("fs");

var WXPay = require('weixin-pay');

exports.oauthJSApi = function (req, res) {
    var pageUrl = req.body.url;

    var sendObj = {code: -1, error: {title: "", detail: ""}, jsonData: {}, strInfo: ""};

    //校验
    weUtil.getJSApiTicket(pageUrl, function (err, wxConfig) {
        if (err) {
            console.error(" @@@-- 获取JSsdk配置失败! --@@@ !");
            sendObj.code = 1;
            sendObj.error.title = "获取JSsdk配置失败!";
            sendObj.error.detail = err;
            res.send(sendObj);
            return;
        }
        sendObj.code = -1;
        sendObj.jsonData = wxConfig;
        res.send(sendObj);
    });

}

exports.payment = function (req, res) {
    var openid = req.session.openid;
    //32商户订单号 201511191332 + 当前时间搓 + 唯一ID号
    var ip = util.getUserRealIp(req);
    var config = {
        //appid: wechatConfig.wePayConfig.appid,
        //mch_id: wechatConfig.wePayConfig.mch_id,
        device_info: "WEB",
        body: "公众平台支付测试",
        detail: "公众号商品详细信息",
        attach: "自定义数据",
        out_trade_no: '20150331' + Math.random().toString().substr(2, 10),
        total_fee: 1,
        spbill_create_ip: ip,
        goods_tag: "goods_tag",
        notify_url: "http://www.o3onet.com/ff/wechat/pay/notify",
        trade_type: "JSAPI",
        product_id: "o3oNet_FF_001",
        openid: "oD0QyuPc1nNZuiJ6O69InNc63mlk"
    }
    console.log(config);

    debugger;
    var wxpay = WXPay({
        appid: wechatConfig.wePayConfig.appid,
        mch_id: wechatConfig.wePayConfig.mch_id,
        partner_key: 'o3oNetFFff199110121LiuShaocHenxj', //微信商户平台API密钥
        pfx: fs.readFileSync('./cert/apiclient_cert.p12'), //微信商户平台证书
    });

    wxpay.getBrandWCPayRequestParams(config, function (err, result) {
        debugger;
        console.log(result);
        // in express
        //res.render('wxpay/jsapi', {payargs: result})
        res.render("wxpay.hbs", {
            payargs: result
        });

    });
}

exports.getWCPayRequestParams = function (req, res) {
    var ip = util.getUserRealIp(req);
    var config = {
        //appid: wechatConfig.wePayConfig.appid,
        //mch_id: wechatConfig.wePayConfig.mch_id,
        device_info: "WEB",
        body: "公众平台支付测试",
        detail: "公众号商品详细信息",
        attach: "自定义数据",
        out_trade_no: '20150331' + Math.random().toString().substr(2, 10),
        total_fee: 1,
        spbill_create_ip: ip,
        goods_tag: "goods_tag",
        notify_url: "http://www.o3onet.com/ff/wechat/pay/notify",
        trade_type: "JSAPI",
        product_id: "o3oNet_FF_001",
        openid: "oD0QyuPc1nNZuiJ6O69InNc63mlk"
    }
    console.log(config);

    debugger;
    var wxpay = WXPay({
        appid: wechatConfig.wePayConfig.appid,
        mch_id: wechatConfig.wePayConfig.mch_id,
        partner_key: 'o3oNetFFff199110121LiuShaocHenxj', //微信商户平台API密钥
        pfx: fs.readFileSync('./cert/apiclient_cert.p12'), //微信商户平台证书
    });

    wxpay.getBrandWCPayRequestParams(config, function (err, result) {
        debugger;
        console.log(result);
        // in express
        //res.render('wxpay/jsapi', {payargs: result})
        res.send(result);

    });
}

exports.notify = function (req, res) {
    console.log("notify");
    console.log(req.ip);
    res.send("OK!");
}

exports.getPrepayId = function (req, res) {
    var openid = req.session.openid;
    //32商户订单号 201511191332 + 当前时间搓 + 唯一ID号
    var ip = req.ip;
    console.log(ip);
    var ip = util.getUserRealIp(req);
    console.log(ip);
    var config = {
        appid: wechatConfig.wePayConfig.appid,
        mch_id: wechatConfig.wePayConfig.mch_id,
        device_info: "WEB",
        body: "公众平台支付测试",
        detail: "公众号商品详细信息",
        attach: "自定义数据",
        out_trade_no: '20150331' + Math.random().toString().substr(2, 10),
        total_fee: 1,
        spbill_create_ip: ip,
        goods_tag: "goods_tag",
        notify_url: "http://www.o3onet.com/ff/wechat/pay/notify",
        trade_type: "JSAPI",
        product_id: "o3oNet_FF_001",
        openid: openid
    }

    console.log(config);

    wxpay.getBrandWCPayRequestParams(config, function (err, result) {
        debugger;
        console.log(result);
        // in express
        //res.render('wxpay/jsapi', {payargs: result})
        res.send(result);

    });


    //{
    //    openid: openid,
    //        body: '公众号支付测试',
    //    detail: '公众号支付测试',
    //    out_trade_no: '20150331' + Math.random().toString().substr(2, 10),
    //    total_fee: 1,
    //    spbill_create_ip: '192.168.2.210',
    //    notify_url: 'http://wxpay_notify_url'
    //}
}