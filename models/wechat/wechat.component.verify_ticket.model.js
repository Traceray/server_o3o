/**
 * Created by o3oNet on 16-2-26.
 */

var Waterline = require('waterline');

var wechatComponentVerifyTicket = Waterline.Collection.extend({
    identity: 'wechatComponentVerifyTicket',
    tableName: "wechat_component_verify_ticket",
    connection: ['ztg-mysql'],
    migrate: 'alter',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        ticketid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        component_appid: {
            type: 'string',
            required: true
        },
        component_verify_ticket: {
            type: 'string',
            required: true
        }
    },
    beforeCreate: function (v, cb) {

        return cb();

    }
});

module.exports = wechatComponentVerifyTicket;