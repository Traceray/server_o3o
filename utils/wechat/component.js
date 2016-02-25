/**
 * Created by o3oNet on 2015-04-01.
 */
'use strict';

var httpHelper = require("../lib/httpHelper.js");
var util = require("./utils.js");
var pGV = require('../global/promotGlobalVariable.js');
var client = require('../lib/connRedis.js');
var wxJsAPI = require("./wxJsAPI.js");
var wxComponentsUtil = require('./wxComponentsUtil.bak.js');


/**
 * 微信静默授权 仅获取openid    --微信第三方平台
 * @param code
 * @param promotid
 * @param callback
 */
exports.componentOauth = function (code, promotid, callback) {


    var appid = pGV.wxAppConfig.appid;
    var component_appid = pGV.wxComponentConfig.component_appid;

    client.hgetall('promotConfig:promotid:' + promotid, function (err, reply) {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        if (reply.appid) {
            appid = reply.appid;
        }


        console.log("  @@---------------  pre get componentOauth getComponentAccessToken  ----------------------------@@  ");
        console.log(" @@@--component_appid component_appid:" + component_appid + " --@@@");
        wxComponentsUtil.getComponentAccessToken(pGV.wxComponentConfig.component_appid, function (err, COMPONENT_ACCESS_TOKEN) {
            if (err) {
                console.error("  @@---------------  get componentOauth getComponentAccessToken  failed ----------------------------@@  ");
                console.error(err);
                callback(err);
                return;
            }

            var url = "https://api.weixin.qq.com/sns/oauth2/component/access_token?appid=" + appid + "&code=" + code + "&grant_type=authorization_code&component_appid=" + component_appid + "&component_access_token=" + COMPONENT_ACCESS_TOKEN + "";

            console.log("  @@---------------  get componentOauth getComponentAccessToken scuessed ----------------------------@@  ");
            console.log(" @@@-- url:" + url + " --@@@");
            console.log(" @@-------------- pre get access_token&openid from weixin  -------------@@");


            httpHelper.get(url, 30000, function (err, data) {
                if (err) {
                    console.log(" @@-------------- get access_token&openid data failed  -------------@@");
                    console.error(err);
                    callback(err);
                    return;
                }

                //var jsonObj = eval('(' + data + ')');
                var jsonObj = util.tryParseJson("" + data);

                console.log("  @@---------------  get access_token&openid data  scuess ----------------------------@@  ");
                console.log(" !!!------ data -------!!! ");
                console.log(data);
                console.log(" !!!------ jsonObj -------!!! ");
                console.log(jsonObj);


                if (!jsonObj) {
                    console.error("  @@---------------  parse access_token&openid data failed ----------------------------@@  ");
                    callback("  @@---------------  parse access_token&openid  data failed ----------------------------@@  ");
                    return;
                }

                var access_token = jsonObj.access_token;
                var openid = jsonObj.openid;//用户唯一标识

                console.log("  @@---------------  parse access_token&openid data scuessed ----------------------------@@  ");
                console.log(" @@@-- openid:" + openid + " --@@@ ");
                console.log(" !!!------ data -------!!! ");
                console.log(data);

                //返回openid
                callback(null, jsonObj);

            }, 'UTF-8');
        });


    });


}

/**
 * 微信授权 获取用户基本信息   --微信第三方平台
 * @param code
 * @param promotid
 * @param callback
 */
exports.componentOauth2 = function (code, promotid, callback) {

    var appid = pGV.wxAppConfig.appid;
    var component_appid = pGV.wxComponentConfig.component_appid;

    client.hgetall('promotConfig:promotid:' + promotid, function (err, reply) {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        if (reply.appid) {
            appid = reply.appid;
        }


        console.log("  @@---------------  pre get componentOauth2 getComponentAccessToken  ----------------------------@@  ");
        console.log(" @@@--component_appid component_appid:" + component_appid + " --@@@");
        wxComponentsUtil.getComponentAccessToken(pGV.wxComponentConfig.component_appid, function (err, COMPONENT_ACCESS_TOKEN) {
            if (err) {
                console.error("  @@---------------  get componentOauth2 getComponentAccessToken  failed ----------------------------@@  ");
                console.error(err);
                callback(err);
                return;
            }

            var url = "https://api.weixin.qq.com/sns/oauth2/component/access_token?appid=" + appid + "&code=" + code + "&grant_type=authorization_code&component_appid=" + component_appid + "&component_access_token=" + COMPONENT_ACCESS_TOKEN + "";

            console.log("  @@---------------  get componentOauth2 getComponentAccessToken scuessed ----------------------------@@  ");
            console.log(" @@@-- url:" + url + " --@@@");
            console.log(" @@-------------- pre get access_token from weixin  -------------@@");

            httpHelper.get(url, 30000, function (err, data) {
                if (err) {
                    console.log(" @@-------------- get access_token data failed  -------------@@");
                    console.error(err);
                    callback(err);
                    return;
                }

                //var jsonObj = eval('(' + data + ')');

                var jsonObj = util.tryParseJson("" + data);

                console.log("  @@---------------  get access_token&openid data  scuess ----------------------------@@  ");
                console.log(" !!!------ data -------!!! ");
                console.log(data);
                console.log(" !!!------ jsonObj -------!!! ");
                console.log(jsonObj);

                if (!jsonObj) {
                    console.error("  @@---------------  parse access_token&openid data failed ----------------------------@@  ");
                    callback("  @@---------------  parse access_token&openid  data failed ----------------------------@@  ");
                    return;
                }

                var access_token = jsonObj.access_token;
                var openid = jsonObj.openid;//用户唯一标识

                console.log("  @@---------------  parse access_token&openid data scuessed ----------------------------@@  ");
                console.log(" @@@-- openid:" + openid + " --@@@ ");
                console.log(" !!!------ data -------!!! ");
                console.log(data);

                var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN";
                console.log(" @@@-- url:" + url + " --@@@");
                console.log("  @@---------------  pre get user-info  ----------------------------@@  ");

                httpHelper.get(url, 30000, function (err, data) {
                    if (err) {
                        console.error("  @@---------------  get user-info  failed ----------------------------@@  ");
                        console.error(err);
                        callback(err);
                        return;
                    }

                    console.log("  @@---------------  get userinfo data scuessed ----------------------------@@  ");
                    console.log(" @@@-- openid:" + openid + " --@@@ ");
                    console.log(" !!!------ data -------!!! ");
                    console.log(data);
                    //TODO::将这些数据存储在项目数据库中，便于统计
                    callback(null, data);//调用各自的回调函数处理信息
                }, 'UTF-8');
            }, 'UTF-8');
        });


    });


}
