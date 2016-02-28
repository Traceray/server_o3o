/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var promotInfo = Waterline.Collection.extend({
    identity: 'promotInfo',
    tableName: "promot_info",
    connection: ['ztg-mysql'],
    migrate: 'alter',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        promotid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        componentid: {
            type: 'string',
            required: false
        },
        appid: {
            type: 'string',
            required: false
        },
        secret: {
            type: 'string',
            required: false
        },
        authorizeType: {//微信介入平台方式  "wechat_component"  "wechat_urlbind"  "website"
            type: 'string',
            required: true
        },
        name: {
            type: 'string',
            required: false
        },
        templName: {
            type: 'string',
            required: true
        },
        templType: {
            type: 'string',
            required: true
        },
        merchantid: {
            type: 'json',
            required: false
        },
        status: {
            type: 'string',
            required: false
        },
        createAdminName: {
            type: 'string',
            required: false
        },
        startTime: {
            type: 'date',
            required: false
        },
        endTime: {
            type: 'date',
            required: false
        },
        mainUrl: {
            type: 'url',
            required: false
        },
        withoutLoginUrl: {
            type: 'url',
            required: false
        },
        md5Key: {
            type: 'string',
            required: false
        },
        base64: {
            type: 'string',
            required: false
        },
        useWeChat0auth: {
            type: 'string',
            required: false
        },
        notAvailable: {
            type: 'string',
            required: false
        }
    },
    beforeCreate: function (v, cb) {

        return cb();

    }
});

module.exports = promotInfo;
