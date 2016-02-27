/**
 * Created by o3oNet on 16-2-27.
 */

var OAuth = require('wechat-oauth');
var Component = require("wechat-component");

var wxUtil = require("../../../utils/wechat/wxUtil.js");
var wxComponentsUtil = require("../../../../utils/wechat/wxComponentsUtil.js");

var baseInfoConfig = require("config").get("app.baseInfo");
var componentConfig = require("config").get("wechat.componentConfig");

var component_appid = componentConfig.component_appid;//开放平台appid
var component_appsecret = componentConfig.component_appsecret;

var component = new Component(component_appid, component_appsecret, wxComponentsUtil.getComponentVerifyTicket, wxComponentsUtil.getComponentAccessToken, wxComponentsUtil.saveComponentAccessToken);

var websiteUrl = baseInfoConfig.websiteUrl;
var protocol = baseInfoConfig.protocol;


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.group = function (req, res, next) {

}