/**
 * Created by o3oNet on 16-2-22.
 */

/**
 * 微信公众平台-用户  （第三方授权 - 直接授权）
 */


/**
 * 获取单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfo = function (data, callback) {

}

/**
 * 添加单个用户的微信信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.postSingleUserWeChatInfo = function (data, callback) {//通过该方法注册获得的uuid,需在这里生成uuid

    var uuid = data.uuid;
    var openid = data.openid;
    var username = data.username;
    var phonenum = data.phonenum;

    var nickname = data.nickname;
    var sex = data.sex;
    var province = data.province;
    var city = data.city;
    var country = data.country;
    var headimgurl = data.headimgurl;

    var appid = wechatConfig.appid;

}


/**
 * 更新单个用户的微信状态信息
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserWeChatInfo = function (data, callback) {//重新换绑微信号的时候使用


}

/**
 * 删除单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.deleteSingleUserWeChatInfo = function (data, callback) {

}

/**
 *更新单个用户的微信信息
 * @param req
 * @param res
 * @param next
 */
exports.patchSingleUserWeChatInfo = function (data, callback) {//必须有uuid

}








