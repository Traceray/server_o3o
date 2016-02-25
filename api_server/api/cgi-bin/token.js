/**
 * Created by Administrator on 2015/11/16.
 */

var jwt = require('jsonwebtoken');


exports.getAccessToken = function (req, res, next) {//获取tocken

    var grant_type = req.params.grant_type;
    var appid = req.params.appid;
    var secret = req.params.secret;

    if (grant_type == "client_credential") {

    }


    //1.根据appid和userid检验密码是否正确
    //2.根据appid获取存在服务器的sercet密码
    //2.jwt签名access_token
    //3.缓存access_tocken

    var sercet = "";
    // sign asynchronously
    jwt.sign({userid: 'bar'}, sercet, {algorithm: 'RS256'}, function (token) {
        console.log(token);
    });

}



