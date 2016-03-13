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


                var authorization_code = message.Content.substr(16);

                console.log(" @@@ -- get component authorization_code -- @@@ - " + authorization_code);

                /**
                 * 保存测试
                 */

                component.queryAuth(authorization_code, function (err, authorization_info) {

                    console.log(authorization_info);

                    wxComponentsUtil.svaeComponentAuthorizer(authorization_info, function (err, data) {

                        //if (err) return res.send(new app.sendJsonObj(10203, "保存第三方平台authorization_info时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

                        console.log(authorization_info);

                        wxComponentsUtil.saveAuthorizerAccessToken(authorization_info.authorizer_appid, {
                            authorizer_refresh_token: authorization_info.authorizer_refresh_token,
                            authorizer_access_token: authorization_info.authorizer_access_token,
                            expires_in: authorization_info.expires_in,
                        }, function (err, data) {

                            if (err) return res.send(new app.sendJsonObj(10204, "保存第三方平台saveAuthorizerAccessToken时发生了错误!", err).send(null, __dirname, 1, "serverPage"));

                            //QUERY_AUTH_CODE:
                            var wechatApi = component.getAPI(appid, wxComponentsUtil.getAuthorizerAccessToken(appid), wxComponentsUtil.saveAuthorizerAccessToken(appid));
                            wechatApi.sendText(message.FromUserName, authorization_code + "_from_api", function (err, data) {
                                if (err) return console.error(err);
                                if (data) console.log(data)
                            });


                        });


                    });

                });


            }


        }

        if (message.MsgType == "text") {


        }


    } else {//非测试号


    }


});
