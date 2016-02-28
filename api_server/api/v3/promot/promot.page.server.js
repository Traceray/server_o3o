/**
 * Created by o3oNet on 16-2-27.
 */


/**
 * @param data
 * @param callback
 */
exports.getPromotionPageInfo = function (data, callback) {

    app.models.promotpageinfo.findOne({
        promotid: data.promotid
    }).exec(function (err, doc) {
        if (err) return callback(err);
        callback(null, doc)
    });

}


/**
 * @param data
 * @param callback
 */
exports.getPromotionsPageInfoList = function (data, callback) {

    app.models.promotpageinfo.find({
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
exports.postPromotionPageInfo = function (data, callback) {

    app.models.promotpageinfo.create(data, function (err, model) {
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