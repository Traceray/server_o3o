/**
 * 微信开放平台 工具类
 * @param req
 * @param cb
 */


var WXBizMsgCrypt = require('wechat-crypto');
var xml2js = require('xml2js');

var wechatUtils = require("./wechatUtils.js");


var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var encodingAESKey = componentConfig.encodingAESKey;//公众号消息加解密Key
var token = componentConfig.token;//公众号消息校验Token


//TODO::后期考虑使用RESTAPI方法 解耦  保证安全的前提下

/**
 * 获取保存的 component_verify_ticket
 */
exports.getComponentVerifyTicket = function (callback) {

    /**
     * 获取数据
     */
    app.models.wechatcomponentverifyticket.findOne({
        where: {component_appid: component_appid},
        sort: 'ticketid DESC'
    }).exec(function (err, docs) {
        if (err) return callback(err);
        if (!docs) return callback(null, null);

        console.log("--------wechatcomponentverifyticket--------");
        console.log(docs);

        callback(null, docs.component_verify_ticket)
    });

}


/**
 * 保存获取到的 component_verify_ticket
 * @param req
 * @param cb
 */
exports.svaeComponentVerifyTicket = function (component_verify_ticket, callback) {

    console.log("@@@ ------ get component_verify_ticket ------------ @@@" + component_verify_ticket);

    /**
     * 保存数据
     */
    app.models.wechatcomponentverifyticket.create({
        component_appid: component_appid,
        component_verify_ticket: component_verify_ticket
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });

}


/**
 * 获取accessToken
 * @param callback
 */
exports.getComponentAccessToken = function (callback) {

    /**
     * 获取数据
     */
    app.models.wechatcomponentaccesstoken.findOne({
        component_appid: component_appid
    }).exec(function (err, docs) {
        if (err) return callback(err);
        if (!docs) return callback(null, null);
        callback(null, {
            component_access_token: docs.component_access_token,
            expires_in: docs.expires_in
        })
    });

}

/**
 * 保存accessToken
 * @param callback
 */
exports.saveComponentAccessToken = function (token, callback) {


    console.log("@@@ ------ get component_access_token ------------ @@@" + token.toString());
    console.dir(token);

    var component_access_token = token.accessToken;

    var expires_in = token.expireTime;

    /**
     * 保存数据
     */
    app.models.wechatcomponentaccesstoken.create({
        component_appid: component_appid,
        component_access_token: component_access_token,
        expires_in: expires_in
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });

}

/**
 * 保存信息
 * @param authorization_info
 * @param callback
 */
exports.svaeComponentAuthorizer = function (authorization_info, callback) {

    console.log("@@@ ------ get authorization_info ------------ @@@" + authorization_info);

    /**
     * 保存数据
     */
    app.models.wechatcomponentauthorizer.create({
        component_appid: component_appid,
        authorizer_appid: authorization_info.authorizer_appid,
        authorizer_refresh_token: authorization_info.authorizer_refresh_token,
        nick_name: authorization_info.nick_name,
        head_img: authorization_info.head_img,
        service_type_info: authorization_info.service_type_info,
        verify_type_info: authorization_info.verify_type_info,
        user_name: authorization_info.user_name,
        alias: authorization_info.alias,
        business_info: authorization_info.business_info,
        qrcode_url: authorization_info.qrcode_url,
        func_info: authorization_info.func_info,
        notAvailable: 0
    }, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });
}

/**
 * 获取授权信息
 */
exports.getAuthorizerAccessToken = function (authorizer_appid, callback) { //TODO::有没有更好的方法解决 //NOTE:

    return function (callback) {
        /**
         * 获取数据
         */
        app.models.wechatcomponentauthorizeraccesstoken.findOne({
            component_appid: component_appid,
            authorizer_appid: authorizer_appid
        }).exec(function (err, docs) {
            if (err) return callback(err);
            if (!docs) return callback(null, null);
            callback(null, {
                authorizer_refresh_token: docs.authorizer_refresh_token,
                authorizer_access_token: docs.authorizer_access_token,
                expires_in: docs.expires_in
            })
        });
    }

}

/**
 * 保存授权信息
 * @param token
 * @param callback
 */
exports.saveAuthorizerAccessToken = function (authorizer_appid, token, callback) {

    return function (token, callback) {

        console.log("@@@ ------ get authorizerAccessToken ------------ @@@" + token.toString());

        /**
         * 保存数据
         */
        app.models.wechatcomponentauthorizeraccesstoken.create({
            component_appid: component_appid,
            authorizer_appid: authorizer_appid,
            authorizer_refresh_token: token.authorizer_refresh_token,
            authorizer_access_token: token.authorizer_access_token,
            expires_in: token.expires_in
        }, function (err, model) {
            if (err) return callback(err);
            callback(null, model)
        });

    }

}

/**
 *
 * @param req
 * @param cb
 */
exports.getWxJsonFromXmlData = function (req, callback) {

    /**
     * 从req中获取xmldata
     */
    wechatUtils.getMessage(req, function (err, result) {
        if (err) {
            err.name = 'BadMessage' + err.name;
            return callback(err);
        }

        req.weixin = wechatUtils.formatMessage(result.xml);

        var cryptor = new WXBizMsgCrypt(token, encodingAESKey, component_appid);
        var decrypted = cryptor.decrypt(req.weixin.Encrypt);

        var messageWrapXml = decrypted.message;

        if (messageWrapXml === '') {
            return callback("Invalid");
        }

        req.weixin_xml = messageWrapXml;

        xml2js.parseString(messageWrapXml, {trim: true}, function (err, result) {
            if (err) {
                err.name = 'BadMessage' + err.name;
                return callback.call(this, err);
            }

            req.weixin = wechatUtils.formatMessage(result.xml);

            callback(null, req.weixin);

        });

    });

}


exports.encryptXml = function (content, ToUserName, FromUserName, message) {

    var cryptor = new WXBizMsgCrypt(token, encodingAESKey, component_appid);
    var wrap = {};
    wrap.encrypt = cryptor.encrypt(xml);
    wrap.nonce = parseInt((Math.random() * 100000000000), 10);
    wrap.timestamp = new Date().getTime();
    wrap.signature = cryptor.getSignature(wrap.timestamp, wrap.nonce, wrap.encrypt);


    var wrapTpl = '<xml>' +
        '<Encrypt><![CDATA[<%-encrypt%>]]></Encrypt>' +
        '<MsgSignature><![CDATA[<%-signature%>]]></MsgSignature>' +
        '<TimeStamp><%-timestamp%></TimeStamp>' +
        '<Nonce><![CDATA[<%-nonce%>]]></Nonce>' +
        '</xml>';

    var encryptWrap = ejs.compile(wrapTpl);


    return encryptWrap(wrap);
}

/*!
 * 编译过后的模版
 */
//
///*!
// * 响应模版
// */
//var ejs = require('ejs');
//
//var tpl = ['<xml>',
//    '<ToUserName><![CDATA[<%-toUsername%>]]></ToUserName>',
//    '<FromUserName><![CDATA[<%-fromUsername%>]]></FromUserName>',
//    '<CreateTime><%=createTime%></CreateTime>',
//    '<% if (msgType === "device_event" && (Event === "subscribe_status" || Event === "unsubscribe_status")) { %>',
//    '<% if (Event === "subscribe_status" || Event === "unsubscribe_status") { %>',
//    '<MsgType><![CDATA[device_status]]></MsgType>',
//    '<DeviceStatus><%=DeviceStatus%></DeviceStatus>',
//    '<% } else { %>',
//    '<MsgType><![CDATA[<%=msgType%>]]></MsgType>',
//    '<Event><![CDATA[<%-Event%>]]></Event>',
//    '<% } %>',
//    '<% } else { %>',
//    '<MsgType><![CDATA[<%=msgType%>]]></MsgType>',
//    '<% } %>',
//    '<% if (msgType === "news") { %>',
//    '<ArticleCount><%=content.length%></ArticleCount>',
//    '<Articles>',
//    '<% content.forEach(function(item){ %>',
//    '<item>',
//    '<Title><![CDATA[<%-item.title%>]]></Title>',
//    '<Description><![CDATA[<%-item.description%>]]></Description>',
//    '<PicUrl><![CDATA[<%-item.picUrl || item.picurl || item.pic %>]]></PicUrl>',
//    '<Url><![CDATA[<%-item.url%>]]></Url>',
//    '</item>',
//    '<% }); %>',
//    '</Articles>',
//    '<% } else if (msgType === "music") { %>',
//    '<Music>',
//    '<Title><![CDATA[<%-content.title%>]]></Title>',
//    '<Description><![CDATA[<%-content.description%>]]></Description>',
//    '<MusicUrl><![CDATA[<%-content.musicUrl || content.url %>]]></MusicUrl>',
//    '<HQMusicUrl><![CDATA[<%-content.hqMusicUrl || content.hqUrl %>]]></HQMusicUrl>',
//    '<ThumbMediaId><![CDATA[<%-content.thumbMediaId || content.mediaId %>]]></ThumbMediaId>',
//    '</Music>',
//    '<% } else if (msgType === "voice") { %>',
//    '<Voice>',
//    '<MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>',
//    '</Voice>',
//    '<% } else if (msgType === "image") { %>',
//    '<Image>',
//    '<MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>',
//    '</Image>',
//    '<% } else if (msgType === "video") { %>',
//    '<Video>',
//    '<MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>',
//    '<Title><![CDATA[<%-content.title%>]]></Title>',
//    '<Description><![CDATA[<%-content.description%>]]></Description>',
//    '</Video>',
//    '<% } else if (msgType === "hardware") { %>',
//    '<HardWare>',
//    '<MessageView><![CDATA[<%-HardWare.MessageView%>]]></MessageView>',
//    '<MessageAction><![CDATA[<%-HardWare.MessageAction%>]]></MessageAction>',
//    '</HardWare>',
//    '<FuncFlag>0</FuncFlag>',
//    '<% } else if (msgType === "device_text" || msgType === "device_event") { %>',
//    '<DeviceType><![CDATA[<%-DeviceType%>]]></DeviceType>',
//    '<DeviceID><![CDATA[<%-DeviceID%>]]></DeviceID>',
//    '<% if (msgType === "device_text") { %>',
//    '<Content><![CDATA[<%-content%>]]></Content>',
//    '<% } else if ((msgType === "device_event" && Event != "subscribe_status" && Event != "unsubscribe_status")) { %>',
//    '<Content><![CDATA[<%-content%>]]></Content>',
//    '<Event><![CDATA[<%-Event%>]]></Event>',
//    '<% } %>',
//    '<SessionID><%=SessionID%></SessionID>',
//    '<% } else if (msgType === "transfer_customer_service") { %>',
//    '<% if (content && content.kfAccount) { %>',
//    '<TransInfo>',
//    '<KfAccount><![CDATA[<%-content.kfAccount%>]]></KfAccount>',
//    '</TransInfo>',
//    '<% } %>',
//    '<% } else { %>',
//    '<Content><![CDATA[<%-content%>]]></Content>',
//    '<% } %>',
//    '</xml>'].join('');
//
//var compiled = ejs.compile(tpl);
//
//function _reply(content, fromUsername, toUsername, message) {
//    var info = {};
//    var type = 'text';
//    info.content = content || '';
//    info.createTime = new Date().getTime();
//    if (message && (message.MsgType === 'device_text' || message.MsgType === 'device_event')) {
//        info.DeviceType = message.DeviceType;
//        info.DeviceID = message.DeviceID;
//        info.SessionID = isNaN(message.SessionID) ? 0 : message.SessionID;
//        info.createTime = Math.floor(info.createTime / 1000);
//        if (message['Event'] === 'subscribe_status' || message['Event'] === 'unsubscribe_status') {
//            delete info.content;
//            info.DeviceStatus = isNaN(content) ? 0 : content;
//        } else {
//            if (!(content instanceof Buffer)) {
//                content = String(content);
//            }
//            info.content = new Buffer(content).toString('base64');
//        }
//        type = message.MsgType;
//        if (message.MsgType === 'device_event') {
//            info['Event'] = message['Event'];
//        }
//    } else if (Array.isArray(content)) {
//        type = 'news';
//    } else if (typeof content === 'object') {
//        if (content.hasOwnProperty('type')) {
//            type = content.type;
//            if (content.content) {
//                info.content = content.content;
//            }
//            if (content.HardWare) {
//                info.HardWare = content.HardWare;
//            }
//        } else {
//            type = 'music';
//        }
//    }
//    info.msgType = type;
//    info.toUsername = toUsername;
//    info.fromUsername = fromUsername;
//    return compiled(info);
//};







