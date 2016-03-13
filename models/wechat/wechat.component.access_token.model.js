/**
 * Created by o3oNet on 16-2-26.
 */


var Waterline = require('waterline');

var wechatComponentAccessToken = Waterline.Collection.extend({
    identity: 'wechatComponentAccessToken',
    tableName: "wechat_component_access_token",
    connection: ['ztg-mysql'],
    migrate: 'safe',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        tokenid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        component_appid: {
            type: 'string',
            required: true
        },
        component_access_token: {
            type: 'string',
            required: true
        },
        expireTime: {//有效期
            type: 'datetime',
            required: true
        }
    },
    beforeCreate: function (v, cb) {

        return cb();

    }
});

module.exports = wechatComponentAccessToken;