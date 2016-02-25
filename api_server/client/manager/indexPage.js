/**
 * Created by o3oNet on 16-1-18.
 */


var EventProxy = require("eventproxy");

//显示主页
exports.index = function (req, res, next) {

    //分别获取数据
    var hbsData = {};

    res.render("manager/index.hbs", hbsData);

}
