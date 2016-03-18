/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var hongbaoInfo = Waterline.Collection.extend({
    identity: 'hongbaoInfo',
    tableName: "hongbao_info",
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
        num: {
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

module.exports = hongbaoInfo;
