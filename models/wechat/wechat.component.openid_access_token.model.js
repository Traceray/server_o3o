/**
 * Created by o3oNet on 16-2-23.
 */

var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

/**
 * 微信开放平台授权表
 */
var wechatComponentOpenidAccessToken = Waterline.Collection.extend({
    identity: 'wechatComponentOpenidAccessToken',
    tableName: "wechat_component_openid_access_token",
    connection: ['ztg-mysql'],
    migrate: 'safe',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        openid: {
            type: 'string',
            required: true
        },
        access_token: {
            type: 'string',
            required: true
        },
        refresh_token: {
            type: 'string',
            required: true
        },
        expires_in: {//有效期
            type: 'string',
            required: true
        },
        create_at: {//开发平台组件的appid（自餐厅）
            type: 'string',
            required: true
        }
    },
    beforeCreate: function (v, cb) {
        return cb();
    }
});


module.exports = wechatComponentOpenidAccessToken;
