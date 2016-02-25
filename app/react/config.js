//require('babel/polyfill');
var config = require("../../config/default.json");
var appConfig = config.app;

var prefixPath = "/" + appConfig.baseInfo.appName + "/" + appConfig.baseInfo.prefixPath;

const environment = {
    development: {
        isProduction: false,
        staticPrefixPath: prefixPath,// /sylj/o3o
    },
    production: {
        isProduction: true,
        staticPrefixPath: appConfig.baseInfo.cdnDomainUrl + prefixPath,//cdn加速 http://cnd.o3onet.com/sylj/o3o
    }
}[process.env.NODE_ENV || 'development'];


module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    app: {
        title: 'React Redux Example',
        description: 'All the modern best practices in one example.',
        metadata: {}
    },
    prefixUrl: prefixPath + "/show",//react很有用
    apiBaseUrl: appConfig.baseInfo.apiBaseUrl, //APIyong
    prefixPath: appConfig.baseInfo.prefixPath//o3o webpackprod生成
}, environment);

