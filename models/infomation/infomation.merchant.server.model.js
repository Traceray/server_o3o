/**
 * Created by o3oNet on 16-2-23.
 */


var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

var infomationMerchantInfo = Waterline.Collection.extend({
    identity: 'infomationMerchantInfo',
    tableName: "infomation_merchant_info",
    connection: ['redis'],
    migrate: 'alter',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        merchantid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        createAdminName: {
            type: 'string',
            required: false
        },
        merchantName: {
            type: 'string',
            required: false
        },
        contactName: {
            type: 'string',
            required: false
        },
        cellPhone: {
            type: 'string',
            required: false
        },
        phone: {
            type: 'string',
            required: false
        },
        groupName: {
            type: 'string',
            required: false
        },
        brand: {
            type: 'string',
            required: false
        },
        address: {
            type: 'string',
            required: false
        },
        qq: {
            type: 'string',
            required: false
        },
        email: {
            type: 'string',
            required: false
        },
        industry: {
            type: 'string',
            required: false
        },
        industryDetail: {
            type: 'string',
            required: false
        },
        notAvailable: {
            type: 'string',
            required: false
        },
        phonenum: {
            type: 'string',
            required: false
        },
        merchantIntro: {
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

module.exports = infomationMerchantInfo;
