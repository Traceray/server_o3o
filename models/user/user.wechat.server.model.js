/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var userWechatInfo = Waterline.Collection.extend({
    identity: 'userWechatInfo',
    tableName: "user_wechat_info",
    connection: ['promot-mysql'],
    migrate: 'alter',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        userid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        uuid: {
            type: 'uuid',
        },
        openid: {
            type: 'string',
            required: true
        },
        unionid: {
            type: 'string',
            required: false
        },
        appid: {
            type: 'string',
            required: true
        },
        componentid: {
            type: 'string',
            required: false
        },
        subscribe: {
            type: 'string',
            required: false
        },
        nickname: {
            type: 'string',
            required: false
        },
        sex: {
            type: 'string',
            required: false
        },
        city: {
            type: 'string',
            required: false
        },
        province: {
            type: 'string',
            required: false
        },
        country: {
            type: 'string',
            required: false
        },
        language: {
            type: 'string',
            required: false
        },
        headimgurl: {
            type: 'url',
            required: false
        },
        subscribe_time: {
            type: 'string',
            required: false
        },
        remark: {
            type: 'string',
            required: false
        },
        groupid: {
            type: 'string',
            required: false
        },
    },
    beforeCreate: function (v, cb) {

        console.log('bb -- ' + v.uuid)

        if (!v.uuid) {
            v.uuid = NODE_UUID.v1();
        }

        return cb();
        //encrypt(values.password, function (err, password) {
        //    if (err) return cb(err);
        //
        //    values.password = password;
        //    cb();
        //});
        //
        //return cb();
    },
    print: function (v) {
        console.log('\tOpenid:', v.openid, 'create at:', v.uuid);
    }
});

module.exports = userWechatInfo;
