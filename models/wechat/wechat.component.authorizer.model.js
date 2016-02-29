/**
 * Created by o3oNet on 16-2-23.
 */

var Waterline = require('waterline');
var NODE_UUID = require('node-uuid');

/**
 * 微信开放平台授权表
 */
var wechatComponentAuthorizer = Waterline.Collection.extend({
    identity: 'wechatComponentAuthorizer',
    tableName: "wechat_component_authorizer",
    connection: ['ztg-mysql'],
    migrate: 'safe',
    autoPK: true,
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        authorizerid: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        authorizer_appid: {//授权方appid（也就是公众平台的appid，例如嘟噜玛丽）
            type: 'string',
            required: true
        },
        component_appid: {//开发平台组件的appid（自餐厅）
            type: 'string',
            required: true
        },
        authorizer_refresh_token: {//主要保存的就是这个,刷新令牌（在授权的公众号具备API权限时，才有此返回值），刷新令牌主要用于公众号第三方平台获取和刷新已授权用户的access_token，只会在授权时刻提供，请妥善保存。 一旦丢失，只能让用户重新授权，才能再次拿到新的刷新令牌
            type: 'string',
            required: true
        },
        nick_name: {//授权方昵称
            type: 'string',
            required: false
        },
        head_img: {//授权方头像
            type: 'url',
            required: false
        },
        service_type_info: {//授权方公众号类型，0代表订阅号，1代表由历史老帐号升级后的订阅号，2代表服务号
            type: 'string',
            required: false
        },
        verify_type_info: {//授权方认证类型，-1代表未认证，0代表微信认证，1代表新浪微博认证，2代表腾讯微博认证，3代表已资质认证通过但还未通过名称认证，4代表已资质认证通过、还未通过名称认证，但通过了新浪微博认证，5代表已资质认证通过、还未通过名称认证，但通过了腾讯微博认证
            type: 'string',
            required: false
        },
        user_name: {//授权方公众号的原始ID
            type: 'string',
            required: false
        },
        alias: {//授权方公众号所设置的微信号，可能为空
            type: 'string',
            required: false
        },
        business_info: {//用以了解以下功能的开通状况（0代表未开通，1代表已开通）：\n open_store:是否开通微信门店功能\n open_scan:是否开通微信扫商品功能\n open_pay:是否开通微信支付功能\n open_card:是否开通微信卡券功能\n open_shake:是否开通微信摇一摇功能
            type: 'string',
            required: false
        },
        qrcode_url: {//二维码图片的URL，开发者最好自行也进行保存
            type: 'string',
            required: false
        },
        func_info: {//公众号授权给开发者的权限集列表（请注意，当出现用户已经将消息与菜单权限集授权给了某个第三方，再授权给另一个第三方时，由于该权限集是互斥的，后一个第三方的授权将去除此权限集，开发者可以在返回的func_info信息中验证这一点，避免信息遗漏），1到13分别代表：\n消息与菜单权限集\n用户管理权限集\n帐号管理权限集\n网页授权权限集\n微信小店权限集\n多客服权限集\n业务通知权限集\n微信卡券权限集\n微信扫一扫权限集\n微信连WIFI权限集\n素材管理权限集\n摇一摇周边权限集\n微信门店权限集\n\n请注意：\n1）该字段的返回不会考虑公众号是否具备该权限集的权限（因为可能部分具备），请根据公众号的帐号类型和认证情况，来判断公众号的接口权限。'
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


module.exports = wechatComponentAuthorizer;
