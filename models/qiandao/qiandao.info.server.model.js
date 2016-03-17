/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var qiandaoInfo = Waterline.Collection.extend({
    identity: 'qiandaoInfo',
    tableName: "qiandao_info",
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
            required: false
        },
        username: {
            type: 'string',
            required: false
        },
        phoneNum: {
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

module.exports = qiandaoInfo;
