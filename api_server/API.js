/**
 * Created by o3oNet on 16-1-25.
 */

var appConfig = require("config").get("app");

var CLIENT_API = {};

var syljApiPrefixUrl = "http://" + appConfig.baseInfo.websiteUrl + "/" + appConfig.baseInfo.appName;

CLIENT_API.getSingleUserWeChatInfoAPI = syljApiPrefixUrl + "/v1/users/wechat";

CLIENT_API.getSingleUserBaseInfoAPI = syljApiPrefixUrl + "/v1/users/base_info";

CLIENT_API.SingleUserBaseInfoAPI = syljApiPrefixUrl + "/v1/users/base_info";


CLIENT_API.getUsersLoanApprovalingListAPI = syljApiPrefixUrl + "/v1/loanApprovals/ing/data_list";

CLIENT_API.getSingleUserApprovalingDataAPI = syljApiPrefixUrl + "/v1/loanApprovals/ing";


module.exports = CLIENT_API;