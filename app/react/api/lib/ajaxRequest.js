/**
 * Created by Administrator on 2015/11/28.
 */
/**
 * Created by Administrator on 2015/11/27.
 */
import {apiBaseUrl} from "../../config.js";

exports.get = function (url, opt) {
    _ajax('get', url, opt);
}

exports.post = function (url, opt) {
    _ajax('post', url, opt);
}

exports.request = function (url, opt) {
    _ajax(url, opt);
}

var _ajax = function (type, url, opt) {
    var url = apiBaseUrl + "/" + url;
    var options = {
        url: url,
        type: type || opt.type || 'get',
        data: opt.data || {},
        async: opt.async || true,
        timeout: opt.timeout || 120000,//超时时间默认2分钟
        success: function (data) {
            opt.success(data);
        },
        cache: opt.cache || false,
        error: function (xhr, type) {
            _parseError(xhr, type, url);
            opt.error(xhr, type);
        },
        dataType: 'json'
    }
    $.ajax(options);
}

var _parseError = function (xhr, type, url) {
    if (type == 'timeout') {
        alert('连接服务器超时,请检查网络是否畅通！', 'error');
    } else if (type == 'parsererror') {
        alert('解析返回结果失败！', 'error');
    } else if (type == 'error') {
        var data;
        try {
            data = JSON.parse(xhr.responseText);
            if (data.code && data.message) {
                alert(data.message, 'error');
            } else {
                alert('连接服务器失败！', 'error');
            }
        } catch (e) {
            alert('连接服务器失败！', 'error');
        }
    } else {
        alert('未知异常', 'error');
    }

}

