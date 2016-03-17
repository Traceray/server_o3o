/**
 * Created by o3oNet on 16-1-6.
 */

/**
 * 微信主动API
 * @type {API|exports|module.exports}
 */

var wechat = require('wechat');
var request = require('request');
var encoding = require('encoding');

var httpHelper = require('../../../../lib/httpHelper.js');

var wechatConfig = require("config").get("wechat.wxAppConfig");
var tuling123Config = require("config").get("tuling123");

var wxConfig = {
    appid: wechatConfig.appid,
    tocken: wechatConfig.tocken,
    encodingAESKey: wechatConfig.encodingAESKey
}

console.log(wxConfig);

exports.wechat = wechat(wxConfig.tocken, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    var message = req.weixin;

    console.log("message.FromUserName---" + message.FromUserName);

    if (message.MsgType === 'event') {
        console.log("接受到事件");
        if (message.Event === 'subscribe') {
            console.log("接受到关注事件");
            res.reply([
                {
                    title: '欢迎关注赛马矿山机械。',
                    description: '赛马矿山机械',
                    picurl: 'http://cdn.o3onet.com/smksjx/weclome.png',
                    url: 'http://wx.smksjx.o3onet.com/smksjx/o3o/show/taobao'
                }
            ]);
        }

    } else if (message.MsgType === 'text') {

        console.log("接受文本消息" + message.Content);

        var tulingUrl = 'http://www.tuling123.com/openapi/api?key=' + tuling123Config.APIKey + '&info=' + encodeURIComponent(message.Content);

        console.log(tulingUrl);

        request(tulingUrl, function (error, response, data) {

            console.log(data);

            if (!error && response.statusCode == 200) {
                console.log("___@___ %s ___@___", "成功获取到图灵机器人信息!");
                var data = JSON.parse(data);

                res.reply({
                    content: data.text,
                    type: 'text'
                });
            } else {
                console.error(error);
                console.log("___@___ %s ___@___", "没有成功获取到图灵机器人信息!");
                res.reply({
                    content: '好像出了什么问题,无法信息,请点击客户服务,会有专人为您服务!',
                    type: 'text'
                });
            }

        });


    }

});





