/**
 * Created by Administrator on 2015/5/8.
 */

var appConfig = require('config').get("app.baseInfo");

exports.compare = function (left, operator, right, options) {
    if (arguments.length < 3) {
        throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }
    var operators = {
        '==': function (l, r) {
            return l == r;
        },
        '===': function (l, r) {
            return l === r;
        },
        '!=': function (l, r) {
            return l != r;
        },
        '!==': function (l, r) {
            return l !== r;
        },
        '<': function (l, r) {
            return l < r;
        },
        '>': function (l, r) {
            return l > r;
        },
        '<=': function (l, r) {
            return l <= r;
        },
        '>=': function (l, r) {
            return l >= r;
        },
        'typeof': function (l, r) {
            return typeof l == r;
        }
    };

    if (!operators[operator]) {
        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}

exports.staticUrl = function (url) {//获取静态资源的url 方便扩展

    if ('development' == app.get('env')) {
        var staticPrefixPath = "/" + appConfig.appName + "/" + url; //cdn加速 http://cnd.o3onet.com/sylj
    }

    if ('production' == app.get('env')) {
        var staticPrefixPath = staticPrefixPath = appConfig.cdnDomainUrl + "/" + appConfig.appName + "/" + url;//cdn加速 http://cnd.o3onet.com/sylj
    }

    console.log(staticPrefixPath);

    return staticPrefixPath;
}