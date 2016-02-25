/**
 * Created by shaolh on 2015/11/28.
 */

//生成验证码
exports.generateMsgIdentityCode = function (phoneNum, number, callback) {

    var identityCode = new Date().getTime().toString().substr(-Math.abs(parseInt(number)));
    var key = "identityNum" + ":" + phoneNum;
    app.redisClient.set(key, identityCode, function (err, reply) {//save
        if (err) {
            console.error("___@___ %s ___@___", "缓存identityNum到redis失败 redisKey=" + key);
            console.error(err.stack);
            callback("save identityNum to redis fail");
            return;
        }

        console.log("___&___ %s ___&___", "set identityNum ok");

        app.redisClient.expire(key, 60 * 30, function (err, reply) {
            if (err) {
                console.error("___@___ %s ___@___", "redis设置identityNum过期时间失败 redisKey=" + key);
                console.error(err.stack);
                callback("expire redis identityNum fail");
                return;

            }

            if (reply != 1) {
                console.error("___&___ %s ___&___", "set identityNum expire failed ");
                callback(null, identityCode);
            } else {
                console.log("___&___ %s ___&___", "set identityNum expire scuess ");
                callback(null, identityCode);
            }

        });
    });

}