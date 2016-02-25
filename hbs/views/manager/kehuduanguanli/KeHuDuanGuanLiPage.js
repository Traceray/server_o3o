/**
 * Created by o3oNet on 16-1-18.
 * 客户端管理
 */


var EventProxy = require("eventproxy");

//显示主页
exports.home = function (req, res, next) {

    //分别获取数据
    var hbsData = {};

    //res.render("manager/home.hbs", hbsData);//

    res.send("客户端管理")
}
