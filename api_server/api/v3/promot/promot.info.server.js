/**
 * Created by o3oNet on 16-2-27.
 */


/**
 * @param data
 * @param callback
 */
exports.getPromotionInfo = function (data, callback) {

    app.models.promotinfo.findOne({
        uuid: data.uuid
    }).exec(function (err, doc) {
        if (err) return callback(err);
        callback(null, doc)
    });

}


/**
 * @param data
 * @param callback
 */
exports.getPromotionsInfoList = function (data, callback) {

    app.models.promotinfo.find({
        notAvailable: {
            "!": 0
        }
    }).exec(function (err, docs) {
        if (err) return callback(err);
        callback(null, docs)
    });

}


/**
 *
 * @param data
 * @param callback
 */
exports.postPromotionInfo = function (data, callback) {

    app.models.promotinfo.create(data, function (err, model) {
        if (err) return callback(err);
        callback(null, model)
    });

}

/**
 *
 * @param data
 * @param callback
 */
exports.putPromotionInfo = function (data, callback) {

}

/**
 *
 * @param data
 * @param callback
 */
exports.deletePromotionInfo = function (data, callback) {

}

/**
 *
 * @param data
 * @param callback
 */
exports.patchPromotionInfo = function (data, callback) {

}