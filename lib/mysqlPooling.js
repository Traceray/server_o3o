/**
 * Created by o3oNet on 2015-03-30.
 */

'use strict';

var config = require('config');
var mysqlConfig = config.get('database.mysqlConfig');

var mysql = require('mysql');

/**
 * information 数据库连接池
 */
var infoDbConfig = mysqlConfig.infoDataBase;
var mysqlInfoPool = mysql.createPool({
    connectionLimit: infoDbConfig.connectionLimit,
    host: infoDbConfig.host,
    user: infoDbConfig.user,
    password: infoDbConfig.password,
    database: infoDbConfig.database,
    port: infoDbConfig.port
});


mysqlInfoPool.on('connection', function (connection) {//The pool will emit a connection event when a new connection is made within the pool.
    console.log("mysqlInfoPool connection");//获取新的链接，从连接池中取连接
});

mysqlInfoPool.on('enqueue', function () {//The pool will emit an enqueue event when a callback has been queued to wait for an available connection.
    console.log('mysqlInfoPool Waiting for available connection slot');//排队等待
});

exports.mysqlInfoPool = mysqlInfoPool;

/**
 *  promotions 数据库连接池
 */
var promotConfig = mysqlConfig.promotDataBase;
var mysqlPromotPool = mysql.createPool({
    connectionLimit: promotConfig.connectionLimit,
    host: promotConfig.host,
    user: promotConfig.user,
    password: promotConfig.password,
    database: promotConfig.database,
    port: promotConfig.port
});

mysqlPromotPool.on('connection', function (connection) {//The pool will emit a connection event when a new connection is made within the pool.
    console.log("mysqlPromotPool connection");//获取新的链接，从连接池中取连接
});

mysqlPromotPool.on('enqueue', function () {//The pool will emit an enqueue event when a callback has been queued to wait for an available connection.
    console.log('mysqlPromotPool Waiting for available connection slot');//排队等待
});

exports.mysqlPromotPool = mysqlPromotPool;


/**
 *  sylj数据库连接池
 */
var syljConfig = mysqlConfig.syljDataBase;
var mysqlSyljPool = mysql.createPool({
    connectionLimit: syljConfig.connectionLimit,
    host: syljConfig.host,
    user: syljConfig.user,
    password: syljConfig.password,
    database: syljConfig.database,
    port: syljConfig.port
});

mysqlSyljPool.on('connection', function (connection) {//The pool will emit a connection event when a new connection is made within the pool.
    console.log("mysqlPromotPool connection");//获取新的链接，从连接池中取连接
});

mysqlSyljPool.on('enqueue', function () {//The pool will emit an enqueue event when a callback has been queued to wait for an available connection.
    console.log('mysqlPromotPool Waiting for available connection slot');//排队等待
});

exports.mysqlSyljPool = mysqlSyljPool;


