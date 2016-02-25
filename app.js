/**
 * Created by Trac on 2015/11/1.
 * 入口文件
 */
'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);//将session存入redis中
var bodyParser = require('body-parser');

var http = require('http');
var https = require('https');

global.app = express();//全局
app.enable('trust proxy');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));


/**
 * oauth2验证服务器
 */
var oauthserver = require('oauth2-server');
var models = require('./models');
app.oauth = oauthserver({
    model: models.oauth,
    grants: ['authorization_code', 'refresh_token', 'password', 'client_credentials'],
    debug: true,
    accessTokenLifetime: 3600,
    refreshTokenLifetime: 1209600,
    authCodeLifetime: 30
});


/**
 * 保存全局配置文件
 */


/**
 * 全局保存Reids链接
 */
app.redisClient = require('./lib/connRedis1.js');


/**
 * 全局缓存Mysql 链接池
 */
app.mysqlPooling = require('./lib/mysqlPooling.js');


/**
 * 全局MongoDB
 */
app.mongoose = require('./lib/connMongoDB.js');//全局只有一个连接


/***
 * 全局错误处理函数
 */
app.redisError = require('./lib/error/redisErrorHandler.js');


/***
 * 全局使用的API(调用其他的API)
 */
app.clientAPI = require("./api_server/API.js");


/**
 * 启动waterline
 */
// Start Waterline passing adapters in
var orm = require("./waterline/orm.js");
var wlconfig = require("./waterline/wlconfig.js");

orm.initialize(wlconfig, function (err, models) {
    console.error(err);
    if (err) throw err;

    app.models = models.collections;
    app.connections = models.connections;

});


/**
 * 模板引擎配置
 * @type {Instance|exports|module.exports}
 */

//swig engine
var swig = require('swig');
//hbs engine
var hbs = require('hbs');
app.set('views', path.join(__dirname, './hbs/views'));
app.set('view engine', 'hbs');
hbs.registerHelper('compare', require('./hbs/helpers/helpers.js').compare);//hbsHelper
hbs.registerHelper('staticUrl', require('./hbs/helpers/helpers.js').staticUrl);//hbsHelper  TODO:使用cdn的情况
hbs.registerPartials(path.join(__dirname, './hbs/partials'));


/**
 * 静态文件配置
 * @type {exports|module.exports}
 */

var prefixAppPath = "/" + require("config").get("app.baseInfo.appName");

if ('production' == app.get('env')) {
    console.log("now env is production");
    var expireTime = 1000 * 60 * 60 * 24 * 30;//30day
    app.use(prefixAppPath, express.static(path.join(__dirname, 'public'), {maxAge: expireTime}));
}

if ('development' == app.get('env')) {
    console.log("now env is development");
    var expireTime = 1000 * 600 * 6;//60s
    app.use(prefixAppPath, express.static(path.join(__dirname, 'public'), {maxAge: expireTime}));
}

/**
 * 保存session在redis中
 * @type {exports|module.exports}
 */
var redisConfig = require("config").get("database.redisConfig");
var secretName = require("config").get("app.baseInfo.websiteUrl");
var nameStr = require("config").get("app.baseInfo.name");

if ('production' == app.get('env')) {
    app.use(session({
        secret: secretName,
        name: nameStr,   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 10},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        store: new RedisStore({
            host: redisConfig.host,
            port: redisConfig.port,
            pass: redisConfig.password
        }),
        resave: true,//默认为false,无论值是否改变都重新写入
        saveUninitialized: true
    }));
}

if ('development' == app.get('env')) {
    app.use(session({
        secret: secretName,
        name: nameStr,   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 1000 * 60 * 1},  //设置maxAge是10min，即80s后session和相应的cookie失效过期
        store: new RedisStore({
            host: redisConfig.host,
            port: redisConfig.port,
            pass: redisConfig.password
        }),
        resave: true,//默认为false,无论值是否改变都重新写入
        saveUninitialized: true
    }));
}

app.use(function (req, res, next) {//保持session
    req.session.lastAccess = new Date().getTime();//改变session,更新maxAge
    next();
});


/**
 * 加载路由文件
 */
app.use(prefixAppPath, require("./routers"));//加载路由文件


/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    console.log("+++++++++++++++++++==");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * error信息抓取
 */
var errorHandler = require('errorhandler');

if ('production' == app.get('env')) {//
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.error(err.stack);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

if ('development' == app.get('env')) {//
    //app.use(errorHandler());
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.error(err);
        console.error(err.stack);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.set('port', process.env.PORT || 9100);

process.on('uncaughtException', function (err) {
    console.error(err);
    //打印出错误的调用栈方便调试
    console.error(err.stack);
    //TODO::
});

//var server = app.listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + server.address().port);
//});

//加载socket.io服务
//全局缓存socketio
var httpServer = http.createServer(app);
app.socketio = require("socket.io")(httpServer);
app.socketio.on('connection', function () {
    console.log("connection");
});


httpServer.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + httpServer.address().port);
});


