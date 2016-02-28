/**
 * Created by o3oNet on 16-2-28.
 */

var apiServerUrl = require("config").get("apiServer");

console.log(apiServerUrl);

exports.promotInfo = apiServerUrl.promotinfo;//活动基本信息

exports.promotionPageInfo = apiServerUrl.promoPagetinfo;//活动页面信息