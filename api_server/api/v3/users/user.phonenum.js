/**
 * Created by o3oNet on 16-2-22.
 */
/**
 * Created by o3oNet on 16-2-22.
 */

/**
 * 通过手机注册的-用户  验证手机号码
 */


/**
 * 获取单个用户的手机信息  - uuid
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserPhoneNumInfoByUuid = function (data, callback) {

    app.models.userwechatinfo.find({
        uuid: data.uuid
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}

/**
 * 获取单个用户的手机信息  - phonenum
 * @param req
 * @param res
 * @param next
 */
exports.getSingleUserPhoneNumInfoByPhonenum = function (data, callback) {

    app.models.userwechatinfo.find({
        uuid: data.uuid
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}


/**
 * 添加单个用户的手机信息到数据库中
 * @param req
 * @param res
 * @param next
 */
exports.postSingleUserPhoneNumInfo = function (data, callback) {//通过该方法注册获得的uuid,需在这里生成uuid


    app.models.userwechatinfo.create(data, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });


}


/**
 * 更新单个用户的手机状态信息
 * @param req
 * @param res
 * @param next
 */
exports.putSingleUserWeChatInfo = function (data, callback) {//重新换绑手机号的时候使用

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
 * 删除单个用户的手机信息
 * @param req
 * @param res
 * @param next
 */
exports.deleteSingleUserWeChatInfo = function (data, callback) {

}

/**
 *更新单个用户的手机信息
 * @param req
 * @param res
 * @param next
 */
exports.patchSingleUserWeChatInfo = function (data, callback) {//必须有uuid

}








