/**
 * add by shaolh
 * 2015/11/28 4:55
 * 写成API的方式便于以后的升级改造，毕竟ajax已不再流行！
 * 也可以为以后去除jquery做准备
 * @type {string}
 */

import {get,post} from "./lib/ajaxRequest";

//发送短信验证码程序
exports.postMsgCheck = function (data, callback, error) {
    post("server/sendMsg/", {
        data: data,
        success: function (data) {
            //可以做数据处理之类的
            if (data.code != -1) {
                callback(data.error.title);
            } else {
                callback(null, data.strInfo);
            }
        },
        error: function (xhr, type) {
            //错误的处理
            //可以通过异步回传到错误收集处
            error(xhr);
        }
    });
}

//验证并注册用户
exports.checkRegister = function (data, callback, error) {
    post("server/registerByPhone/", {
        data: data,
        success: function (data) {
            //可以做数据处理之类的
            if (data.code != -1) {
                callback(data.error.title);
            } else {
                callback(null, data.jsonData);
            }
        },
        error: function (xhr, type) {
            //错误的处理
            //可以通过异步回传到错误收集处
            error(xhr);
        }
    });
}


//提交贷款申请
exports.postLoanApprovalingInfoAPI = function (data, callback, error) {
    post("server/applyLoanApprovaling", {
        data: data,
        success: function (data) {
            //可以做数据处理之类的
            if (data.code != -1) {
                callback(data.error.title);
            } else {
                callback(null, data.strInfo);
            }
        },
        error: function (xhr, type) {
            //错误的处理
            //可以通过异步回传到错误收集处
            error(xhr);
        }
    });
}