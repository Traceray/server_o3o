/**
 * Created by o3oNet on 16-2-26.
 */


var Waterline = require('waterline');

var wechatAccessToken = Waterline.Collection.extend({
    identity: 'wechatAccessToken',
    tableName: "wechat_access_token",
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
        appid: {
            type: 'string',
            required: true
        },
        access_token: {
            type: 'string',
            required: true
        },
        refresh_token: {
            type: 'string',
            required: false
        },
        expiresTime: {//有效期
            type: 'time',
            required: true
        }
    },
    beforeCreate: function (v, cb) {

        return cb();

    }
});

module.exports = wechatAccessToken;