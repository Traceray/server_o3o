/**
 * Created by o3oNet on 2015-03-30.
 */

'use strict';

var databaseConfig = require('../config/databaseConfig.js');//加载配置文件

var redis = require('redis');

if ('production' == app.get('env')) {
    var client = redis.createClient(databaseConfig.redisConfig.port, databaseConfig.redisConfig.host, databaseConfig.redisConfig.options);
    client.auth(databaseConfig.redisConfig.password, function (err, data) {
        if (err) {
            console.error("redis oauth -- " + err);
        } else {
            console.log("redis oauth -- " + data)
        }
    });
}
if ('development' == app.get('env')) {
    var client = redis.createClient(databaseConfig.localRedisConfig.port, databaseConfig.localRedisConfig.host, databaseConfig.localRedisConfig.options);
    client.auth(databaseConfig.localRedisConfig.password, function (err, data) {
        if (err) {
            console.error("redis oauth -- " + err);
        } else {
            console.log("redis oauth -- " + data)
        }
    });
}

client.on('ready', function (res) {
    console.log('redis ready to work');
});

client.on("error", function (err) {
    console.log("redis Error " + err);
});

module.exports = client;
