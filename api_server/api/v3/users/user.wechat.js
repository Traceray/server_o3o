/**
 * Created by o3oNet on 16-2-22.
 */

/**
 * 微信公众平台-用户  （第三方授权 - 直接授权）
 */


/**
 * 获取单个用户的微信信息  - uuid
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfoByUuid = function (data, callback) {

    app.models.userwechatinfo.find({
        uuid: data.uuid
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}

/**
 * 获取单个用户的微信信息 --openid
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfoByOpenid = function (data, callback) {

    app.models.userwechatinfo.find({
        appid: data.appid,
        openid: data.openid
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}

/**
 * 获取单个用户的微信信息 --nickname
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfoByNickname = function (data, callback) {

    app.models.userwechatinfo.find({
        appid: data.appid,
        nickname: data.nickname
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}


/**
 * 获取单个用户的微信信息 --unionid
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserWeChatInfoByUnionid = function (data, callback) {

    app.models.userwechatinfo.find({
        unionid: data.unionid,
        componentid: data.componentid
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}


/**
 * 添加单个用户的微信信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.postSingleUserWeChatInfo = function (data, callback) {//通过该方法注册获得的uuid,需在这里生成uuid


    app.models.userwechatinfo.create(data, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });


}


/**
 * 更新单个用户的微信状态信息
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserWeChatInfo = function (data, callback) {//重新换绑微信号的时候使用

    var page = 1;
    var limit = 10;
    app.models.userwechatinfo.find({
        uuid: data.uuid
    }).paginate({
        page: page,
        limit: limit
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

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








