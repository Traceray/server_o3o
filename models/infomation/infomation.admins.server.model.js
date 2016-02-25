/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var infomationAdminsInfo = Waterline.Collection.extend({
    identity: 'infomationAdminsInfo',
    tableName: "infomation_admins_info",
    connection: ['redis'],
    migrate: 'alter',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        adminid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: false
        },
        nickname: {
            type: 'string',
            required: false
        },
        pwd: {
            type: 'string',
            required: false
        },
        prevPwd: {
            type: 'string',
            required: false
        },
        notAvailable: {
            type: 'string',
            required: false
        },
        note: {
            type: 'string',
            required: false
        },

    },
    beforeCreate: function (v, cb) {

        return cb();

    }
});

module.exports = infomationAdminsInfo;
