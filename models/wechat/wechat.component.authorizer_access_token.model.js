/**
 * Created by o3oNet on 16-2-23.
 */

var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

/**
 * 微信开放平台授权表
 */
var wechatComponentAuthorizerAccessToken = Waterline.Collection.extend({
    identity: 'wechatComponentAuthorizerAccessToken',
    tableName: "wechat_component_authorizer_access_token",
    connection: ['ztg-mysql'],
    migrate: 'alter',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        authorizeraccesstokenid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        authorizer_appid: {//授权方appid（也就是公众平台的appid，例如嘟噜玛丽）
            type: 'string',
            required: true
        },
        component_appid: {//开发平台组件的appid（自餐厅）
            type: 'string',
            required: true
        },
        authorizer_access_token: {
            type: 'string',
            required: true
        },
        authorizer_refresh_token: {
            type: 'string',
            required: true
        },
        expires_in: {
            type: 'integer',
            required: true
        }

    },
    beforeCreate: function (v, cb) {
        return cb();
    }
});


module.exports = wechatComponentAuthorizerAccessToken;
