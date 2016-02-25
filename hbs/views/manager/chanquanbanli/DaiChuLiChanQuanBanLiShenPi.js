/**
 * Created by o3oNet on 16-1-18.
 * 待处理产权办理
 */


var EventProxy = require("eventproxy");

//显示主页
exports.home = function (req, res, next) {

    //分别获取数据
    var hbsData = {};

    //res.render("manager/home.hbs", hbsData);//


    setTimeout(function () {
        res.send("待处理产权办理");
    }, 5000);

    //获取待处理贷款审批人员信息
    

}
