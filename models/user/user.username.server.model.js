/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var userUserNameInfo = Waterline.Collection.extend({
    identity: 'userUserNameInfo',
    tableName: "userUserNameInfo",
    connection: ['ztg-mysql'],
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
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: false
        },
        screenname: {
            type: 'string',
            required: false
        },
        faceimageurl: {
            type: 'url',
            required: false
        }
    },
    beforeCreate: function (v, cb) {

        if (!v.uuid) {
            v.uuid = NODE_UUID.v1();
        }

        return cb();

    }
});

module.exports = userUserNameInfo;
