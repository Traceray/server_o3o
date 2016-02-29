/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var userPhoneNumInfo = Waterline.Collection.extend({
    identity: 'userPhoneNumInfo',
    tableName: "userPhoneNumInfo",
    connection: ['ztg-mysql'],
    migrate: 'safe',
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
        phonenum: {
            type: 'string',
            required: true
        }
    },
    beforeCreate: function (v, cb) {

        if (!v.uuid) {
            v.uuid = NODE_UUID.v1();
        }

        return cb();

    }
});

module.exports = userPhoneNumInfo;
