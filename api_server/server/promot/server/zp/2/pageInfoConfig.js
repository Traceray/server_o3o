/**
 * Created by o3oNet on 16-2-28.
 */


var promotAPIUrl = require("../../../API.js");

var request = require('request');

/**
 *
 * @param data
 * @param callback
 */
exports.initPageInfo = function (data, callback) {


    console.log(data);


    var baseInfo = data.baseInfo;
    var awardInfo = data.awardInfo;

    //TODO::可以在这里覆盖通用配置

    //TODO::式样 主题设置

    var pageInfo = {
        top_1_margin: "",
        top_2_margin: "",
        top_3_margin: "",
        arrow_padding: "",
        backgroundColor: "0c0e0f",
        fontColor: "#e4dd27",
        backgroundStyle: "color",// 默认为img
        pageTheme: "",
        showAwardTheme: "normal",
        zeroAwardTheme: "",//0等奖出奖
        viewTemplUrl: "",
        awardPlace2Level: JSON.stringify(["7", "8", "2", "4", "1,3", "6", "5"]),//初始化配置
        theme: [
            {
                name: "default",
                config: {
                    backgroundColor: "0c0e0f",
                    fontColor: "#e4dd27",
                }
            }
        ]
    };

    request.post(promotAPIUrl.promotionPageInfo, {
        form: {
            promotid: data.promotid,
            baseInfo: JSON.stringify(baseInfo),
            awardInfo: JSON.stringify(awardInfo),
            pageInfo: JSON.stringify(pageInfo),
            notAvailable: 0,
        },
        json: true
    }, function (err, response, body) {
        if (err) return callback(err);
        if (body.code != 0) return callback(body.error.title);
        if (body.code == 0) return callback(null, body);
    });


}