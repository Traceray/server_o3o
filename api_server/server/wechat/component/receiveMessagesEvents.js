/**
 * Created by Administrator on 2016/3/11 0011.
 */
var Component = require("wechat-component");

var wxUtil = require("../../../../utils/wechat/wxUtil.js");
var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var componentConfig = require("config").get("wechat.componentConfig");
var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);


var wechat = require('wechat');


exports.receive = wechat({
    token: componentConfig.token,
    appid: componentConfig.component_appid,
    encodingAESKey: componentConfig.encodingAESKey
}, function (req, res, next) {

    var appid = req.params.appid;
    console.log(" @@@ -- 获取到了 -" + appid + "- 微信推送消息 -- @@@ ");

    // 微信输入信息都在req.weixin上
    var message = req.weixin;

    console.dir(message);

    if (appid == "wx570bc396a51b8ff8") {//微信开发平台发布全网测试验证

        if (message.MsgType == "event") {//事件推送  根据不同的事件做不同的处理

            var content = message.Event + "from_callback";
            res.reply({
                content: content,
                type: 'text'
            });

        }

        if (message.MsgType == "text") {

            console.log(message.Content);

            if (message.Content == "TESTCOMPONENT_MSG_TYPE_TEXT") {//

                console.log(" @@@ -- SEND TESTCOMPONENT_MSG_TYPE_TEXT SCUESS -- @@@");

                res.reply({
                    content: "TESTCOMPONENT_MSG_TYPE_TEXT_callback",
                    type: 'text'
                });

            } else if (message.Content.indexOf("QUERY_AUTH_CODE") != -1) {//

                res.reply({
                    content: "",
                    type: 'text'
                });

                //QUERY_AUTH_CODE:
                var oauthApi = component.getOAuth(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));
                oauthApi.sendText(message.FromUserName, message.Content.substr(16) + "_from_api", function (err, data) {
                    if (err) return console.error(err);
                    if (data) console.log(data)
                });

            }


        }

        if (message.MsgType == "text") {


        }


    } else {//非测试号


    }


});


//exports.receive = function (req, res, next) {
//
//    var appid = req.params.appid;
//
//    console.log(" @@@ -- 获取到了 -" + appid + "- 微信推送消息 -- @@@ ");
//
//    wxComponentsUtil.getWxJsonFromXmlData(req, function (err, jsonData) {
//
//        console.dir(jsonData);
//
//        //TODO::根据不同的公众号做出不同的反应
//
//        if (appid == "wx570bc396a51b8ff8") {//微信开发平台发布全网测试验证
//
//            if (jsonData.MsgType == "event") {//事件推送  根据不同的事件做不同的处理
//
//                var content = event + "from_callback";
//
//
//
//            }
//
//        }
//
//
//        var event = jsonData.Event;
//
//        var content = event + "from_callback";
//
//        /**
//         * 根据条件对返回的XML数据加密
//         * @param xml
//         */
//        function encryptXml(xml) {
//            var component_appid = pGV.wxComponentConfig.component_appid;
//            var encodingAESKey = pGV.wxComponentConfig.encodingAESKey;
//            var token = pGV.wxComponentConfig.token;
//            var cryptor = new WXBizMsgCrypt(token, encodingAESKey, component_appid);
//            var wrap = {};
//            wrap.encrypt = cryptor.encrypt(xml);
//            wrap.nonce = parseInt((Math.random() * 100000000000), 10);
//            wrap.timestamp = new Date().getTime();
//            wrap.signature = cryptor.getSignature(wrap.timestamp, wrap.nonce, wrap.encrypt);
//            return encryptWrap(wrap);
//        }
//
//        var message = jsonData;
//
//        res.send(encryptXml(reply(content, message.ToUserName, message.FromUserName, message)));
//
//
//    });
//}