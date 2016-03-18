/**
 * Created by o3oNet on 16-2-23.
 */

var Waterline = require('waterline');
var orm = new Waterline();

// models
var userWechatInfo = require('../models/user/user.wechat.server.model.js');
orm.loadCollection(userWechatInfo);

/**
 * 微信开放平台
 */
var wechatComponentVerifyTicket = require("../models/wechat/wechat.component.verify_ticket.model.js");
orm.loadCollection(wechatComponentVerifyTicket);

var wechatComponentAccessToken = require("../models/wechat/wechat.component.access_token.model.js");
orm.loadCollection(wechatComponentAccessToken);

var wechatComponentAuthorizer = require("../models/wechat/wechat.component.authorizer.model.js");
orm.loadCollection(wechatComponentAuthorizer);

var wechatComponentAuthorizerAccessToken = require("../models/wechat/wechat.component.authorizer_access_token.model.js");
orm.loadCollection(wechatComponentAuthorizerAccessToken);

var wechatAccessToken = require("../models/wechat/wechat.access_token.model.js");
orm.loadCollection(wechatAccessToken);

/**
 * 活动信息
 */
var promotInfo = require("../models/promot/promot.info.server.model.js");
orm.loadCollection(promotInfo);

var promotPageInfo = require("../models/promot/promot.page.server.model.js");
orm.loadCollection(promotPageInfo);

var qiandaoInfo = require("../models/qiandao/qiandao.info.server.model");
orm.loadCollection(qiandaoInfo);

var hongbaoInfo = require("../models/qiandao/hongbao.info.server.model");
orm.loadCollection(hongbaoInfo);

var wechatComponentOpenidAccessToken = require("../models/wechat/wechat.component.openid_access_token.model");
orm.loadCollection(wechatComponentOpenidAccessToken);



module.exports = orm;




