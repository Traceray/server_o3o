/**
 * Created by Administrator on 2015/11/7.
 */

var request = require('request');
var client = require('../lib/connRedis.js');
var pGV = require('../global/promotGlobalVariable.js');
var pools = require('../lib/mysqlPooling.js');

var xml2js = require('xml2js');
var WXBizMsgCrypt = require('wechat-crypto');


//从数据库中获取（刷新）授权公众号的令牌 该API用于在授权方令牌（authorizer_access_token）失效时，可用刷新令牌（authorizer_refresh_token）获取新的令牌。
exports.getAuthorizerAccessToken = function (authorizer_appid, callback) {


    var authorizer_access_token_KeyName = "authorizer_access_token:authorizer_appid:" + authorizer_appid + ":" + pGV.wxComponentConfig.component_appid;
    client.get(authorizer_access_token_KeyName, function (err, reply) {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        var authorizer_access_token = reply;
        if (reply) {
            console.log(" authorizer_access_token is alive -- " + authorizer_access_token);
            callback(null, authorizer_access_token);
        } else {

            //先从数据库获取authorizer_refresh_token
            var authorizer_refresh_token_KeyName = "authorizer_refresh_token:authorizer_appid:" + authorizer_appid + ":" + pGV.wxComponentConfig.component_appid;
            client.get(authorizer_refresh_token_KeyName, function (err, reply) {
                if (err) {
                    console.error(err);
                    callback(err);
                    return;
                }
                if (!reply) {
                    console.error("get authorizer_refresh_token fail from redis");

                    //从mysql数据库中获取
                    pools.mysqlInfoPool.getConnection(function (err, conn) {
                        if (err) console.error(err);
                        //TODO::配置

                        var selectSQL = "SELECT  authorizer_refresh_token FROM authorization WHERE authorizer_appid = ? AND component_appid = ?";


                        conn.query(selectSQL, [authorizer_appid, pGV.wxComponentConfig.component_appid], function (err, rows) {
                            if (err) {
                                console.error(err);
                                callback(err);
                                return;
                            } else {
                                var authorizer_refresh_token = rows[0].authorizer_refresh_token;
                                console.log("get authorizer_refresh_token back from mysql");
                                getComponentAccessToken(pGV.wxComponentConfig.component_appid, function (err, component_access_token) {
                                    if (err) {
                                        console.error(err);
                                        callback(err);
                                        return;
                                    }

                                    request.post("https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=" + component_access_token, {
                                            body: JSON.stringify({
                                                component_appid: pGV.wxComponentConfig.component_appid,
                                                authorizer_appid: authorizer_appid,
                                                authorizer_refresh_token: authorizer_refresh_token
                                            })
                                        }
                                        , function (err, response, body) {
                                            if (err) {
                                                callback(err);
                                                return;
                                            }

                                            var authorizer_access_token = JSON.parse(body).authorizer_access_token;

                                            console.log("  @@-------------------authorizer_access_token-------------------@@  ");
                                            console.log(authorizer_access_token);
                                            console.log("@@-------------------authorizer_access_token-------------------@@");

                                            //authorizer_access_token redis数据
                                            client.set(authorizer_access_token_KeyName, authorizer_access_token, function (err, reply) {
                                                if (err) {
                                                    callback(err);
                                                    return;
                                                }
                                                console.log(" set authorizer_access_token ok ");
                                                client.expire(authorizer_access_token_KeyName, 6000, function (err, reply) {
                                                    if (err) {
                                                        console.error("set redis key authorizer_access_token expire fail");
                                                        callback(err);
                                                        return;
                                                    }
                                                    console.log("set redis key authorizer_access_token  expire scuess ");
                                                    callback(null, authorizer_access_token);
                                                });

                                            });

                                        });

                                });

                            }
                        });


                        callback("get authorizer_refresh_token fail");
                        return;
                    });
                } else {
                    var authorizer_refresh_token = reply.toString();
                    console.log("get authorizer_refresh_token back");
                    getComponentAccessToken(pGV.wxComponentConfig.component_appid, function (err, component_access_token) {
                        if (err) {
                            console.error(err);
                            callback(err);
                            return;
                        }

                        request.post("https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=" + component_access_token, {
                                body: JSON.stringify({
                                    component_appid: pGV.wxComponentConfig.component_appid,
                                    authorizer_appid: authorizer_appid,
                                    authorizer_refresh_token: authorizer_refresh_token
                                })
                            }
                            , function (err, response, body) {
                                if (err) {
                                    callback(err);
                                    return;
                                }

                                var authorizer_access_token = JSON.parse(body).authorizer_access_token;

                                console.log("  @@-------------------authorizer_access_token-------------------@@  ");
                                console.log(authorizer_access_token);
                                console.log("@@-------------------authorizer_access_token-------------------@@");

                                //authorizer_access_token redis数据
                                client.set(authorizer_access_token_KeyName, authorizer_access_token, function (err, reply) {
                                    if (err) {
                                        callback(err);
                                        return;
                                    }
                                    console.log(" set authorizer_access_token ok ");
                                    client.expire(authorizer_access_token_KeyName, 6000, function (err, reply) {
                                        if (err) {
                                            console.error("set redis key authorizer_access_token expire fail");
                                            callback(err);
                                            return;
                                        }
                                        console.log("set redis key authorizer_access_token  expire scuess ");
                                        callback(null, authorizer_access_token);
                                    });

                                });

                            });

                    });
                }

            });

        }

    });

}

//获取第三方平台令牌（component_access_token），增加了component_verify_ticket参数。component_verify_ticket由公众平台每隔10分钟，持续推送给第三方平台方（在创建公众号第三方平台审核通过后，才会开始推送）
var getComponentAccessToken = function (componentAppid, callback) {

    var component_appid = pGV.wxComponentConfig.component_appid;
    if (componentAppid) {
        component_appid = componentAppid;
    }

    var accessKeyName = "component_access_token:component_appid:" + component_appid + ":" + pGV.wxComponentConfig.component_appid;

    client.get(accessKeyName, function (err, reply) {
        if (err) {
            callback(err);
            return;
        }

        if (reply) {
            console.log('component_access_token is alive ' + reply.toString());
            callback(null, reply.toString());
        } else {
            var verifyKeyName = "component_verify_ticket:" + component_appid + ":" + pGV.wxComponentConfig.component_appid;
            client.get(verifyKeyName, function (err, reply) {
                if (err) {
                    callback(err);
                    return;
                }
                var component_verify_ticket = reply;

                console.log("@@-------------------component_verify_ticket-------------------@@");
                console.log(component_verify_ticket);
                console.log("@@-------------------component_verify_ticket-------------------@@");

                //1.获取第三方平台access_token
                request.post("https://api.weixin.qq.com/cgi-bin/component/api_component_token", {
                        body: JSON.stringify({
                            component_appid: component_appid,
                            component_appsecret: pGV.wxComponentConfig.component_appsecret,
                            component_verify_ticket: component_verify_ticket
                        })
                    }
                    , function (err, response, body) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        var component_access_token = JSON.parse(body).component_access_token;

                        console.log("@@-------------------component_access_token-------------------@@");
                        console.log(component_access_token);
                        console.log("@@-------------------component_access_token-------------------@@");

                        //保存component_access_token redis数据
                        client.set(accessKeyName, component_access_token, function (err, reply) {
                            if (err) {
                                callback(err);
                                return;
                            }
                            console.log(" set component_access_token ok ");
                            client.expire(accessKeyName, 6000, function (err, reply) {
                                if (err) {
                                    console.error("set redis key component_access_token expire fail");
                                    ep.emit("error", err);
                                    return;
                                }
                                console.log("set redis key component_access_token  expire scuess ");
                                callback(null, component_access_token);
                            });

                        });

                    });
            });
        }

    });

}
exports.getComponentAccessToken = getComponentAccessToken;

exports.getWxJsonFromXmlData = function (req, cb) {
    var component_appid = pGV.wxComponentConfig.component_appid;
    var encodingAESKey = pGV.wxComponentConfig.encodingAESKey;
    var token = pGV.wxComponentConfig.token;

    /**
     * 从req中获取xmldata
     */
    getMessage(req, function (err, result) {
        if (err) {
            err.name = 'BadMessage' + err.name;
            cb(err);
        }
        req.weixin = formatMessage(result.xml);

        var cryptor = new WXBizMsgCrypt(token, encodingAESKey, component_appid);
        var decrypted = cryptor.decrypt(req.weixin.Encrypt);

        var messageWrapXml = decrypted.message;
        if (messageWrapXml === '') {
            var error = "Invalid";
            cb(error);
            return;
        }

        req.weixin_xml = messageWrapXml;
        xml2js.parseString(messageWrapXml, {trim: true}, function (err, result) {
            if (err) {
                err.name = 'BadMessage' + err.name;
                cb.call(this, err);
                return;
            }
            req.weixin = formatMessage(result.xml);

            cb(null, formatMessage(result.xml));

        });

    });

}

exports.svaeComponentVerifyTicket = function (req, cb) {

    var component_appid = pGV.wxComponentConfig.component_appid;
    var encodingAESKey = pGV.wxComponentConfig.encodingAESKey;
    var token = pGV.wxComponentConfig.token;

    var keyName = "component_verify_ticket:" + component_appid + ":" + pGV.wxComponentConfig.component_appid;
    /**
     * 从req中获取xmldata
     */
    getMessage(req, function (err, result) {
        if (err) {
            err.name = 'BadMessage' + err.name;
            cb(err);
        }
        req.weixin = formatMessage(result.xml);

        var cryptor = new WXBizMsgCrypt(token, encodingAESKey, component_appid);
        var decrypted = cryptor.decrypt(req.weixin.Encrypt);

        var messageWrapXml = decrypted.message;
        if (messageWrapXml === '') {
            var error = "Invalid";
            cb(error);
            return;
        }

        req.weixin_xml = messageWrapXml;
        xml2js.parseString(messageWrapXml, {trim: true}, function (err, result) {
            if (err) {
                err.name = 'BadMessage' + err.name;
                cb.call(this, err);
                return;
            }
            req.weixin = formatMessage(result.xml);
            var component_verify_ticket = req.weixin.ComponentVerifyTicket;

            console.log("@@-------------------component_verify_ticket-------------------@@");
            console.log(component_verify_ticket);
            console.log("@@-------------------component_verify_ticket-------------------@@");

            //缓存中奖规则
            client.set(keyName, component_verify_ticket, function (err, reply) {//中奖规则
                if (err) {
                    console.error("set component_verify_ticket fail" + err);
                    cb.call(this, err);
                    return;
                }
                console.log(" set component_verify_ticket ok ");
                cb.call(this, err, reply);
            });

        });

    });

}

/*!
 * 从微信的提交中提取XML文件
 */
var getMessage = function (stream, callback) {
    load(stream, function (err, buf) {
        if (err) {
            return callback(err);
        }
        var xml = buf.toString('utf-8');
        stream.weixin_xml = xml;
        xml2js.parseString(xml, {trim: true}, callback);
    });
};
var load = function (stream, callback) {
    // support content-type 'text/xml' using 'express-xml-bodyparser', which set raw xml string
    // to 'req.rawBody'(while latest body-parser no longer set req.rawBody), see
    // https://github.com/macedigital/express-xml-bodyparser/blob/master/lib/types/xml.js#L79
    if (stream.rawBody) {
        callback(null, stream.rawBody);
        return;
    }

    var buffers = [];
    stream.on('data', function (trunk) {
        buffers.push(trunk);
    });
    stream.on('end', function () {
        callback(null, Buffer.concat(buffers));
    });
    stream.once('error', callback);
};
/*!
 * 将xml2js解析出来的对象转换成直接可访问的对象
 */
var formatMessage = function (result) {
    var message = {};
    if (typeof result === 'object') {
        for (var key in result) {
            if (!(result[key] instanceof Array) || result[key].length === 0) {
                continue;
            }
            if (result[key].length === 1) {
                var val = result[key][0];
                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];
                result[key].forEach(function (item) {
                    message[key].push(formatMessage(item));
                });
            }
        }
    }
    return message;
};

