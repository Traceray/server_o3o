/**
 * Created by o3oNet on 2015-03-24.
 */

'use strict';

var util = {
    fRandomBy: function (under, over) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * under + 1);
            case 2:
                return parseInt(Math.random() * (over - under + 1) + under);
            default:
                return 0;
        }
    },
    getTime: function () {
        var ts = arguments[0] || 0;
        var t, y, m, d, h, i, s;
        t = ts ? new Date(ts * 1000) : new Date();
        y = t.getFullYear();
        m = t.getMonth() + 1;
        d = t.getDate();
        h = t.getHours();
        i = t.getMinutes();
        s = t.getSeconds();
        // 可根据需要在这里定义时间格式
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
    },
    getUrlFromReq: function (req) {
        return req.protocol + "://" + req.hostname + req.originalUrl;//获取当前完整url
    },
    tryParseJson: function (str) {
        try {
            return JSON.parse(str);
        } catch (ex) {
            return null;
        }
    },
    getUserRealIp: function (request) {
        var ip = request.get("X-Real-IP");
        if (ip == null || ip.length == 0 || "unknown" == ip.toLowerCase()) {
            ip = request.get("X-Forwarded-For");
        }
        if (ip == null || ip.length == 0 || "unknown" == ip.toLowerCase()) {
            ip = request.get("Proxy-Client-IP");
        }
        if (ip == null || ip.length == 0 || "unknown" == ip.toLowerCase()) {
            ip = request.get("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length == 0 || "unknown" == ip.toLowerCase()) {
            var ips = request.ips;
            ip = ips[0];
        }
        if (ip == null || ip.length == 0 || "unknown" == ip.toLowerCase()) {
            ip = request.ip;
        }
        return ip;
    },
    getClientIp: function (req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    },
    /**********验证电话号码的有效性***********/
    checkIsTel: function (strTel) {
        var pattern = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
        if (pattern.test(strTel) && strTel != "") {
            //  document.getElementById('doing').style.visibility='hidden';
            return true;
        }
        else return false;
    },
    dateAdd: function (date, strInterval, Number) {  //参数分别为日期对象，增加的类型，增加的数量
        var dtTmp = date;
        switch (strInterval) {
            case 'second':
            case 's' :
                return new Date(Date.parse(dtTmp) + (1000 * Number));
            case 'minute':
            case 'n' :
                return new Date(Date.parse(dtTmp) + (60000 * Number));
            case 'hour':
            case 'h' :
                return new Date(Date.parse(dtTmp) + (3600000 * Number));
            case 'day':
            case 'd' :
                return new Date(Date.parse(dtTmp) + (86400000 * Number));
            case 'week':
            case 'w' :
                return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            case 'month':
            case 'm' :
                return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'year':
            case 'y' :
                return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        }
    }
}

module.exports = util;
