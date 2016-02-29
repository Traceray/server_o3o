/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var promotPageInfo = Waterline.Collection.extend({
    identity: 'promotPageInfo',
    tableName: "promot_page_info",
    connection: ['ztg-mysql'],
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        promotid: {
            type: 'integer',
            required: true
        },
        baseInfo: {
            type: 'json',
            required: true
        },
        pageInfo: {
            type: 'json',
            required: true
        },
        awardInfo: {
            type: "json",
            required: true
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

module.exports = promotPageInfo;
