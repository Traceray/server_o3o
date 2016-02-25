/**
 * Created by o3oNet on 2015-03-30.
 */

'use strict';

var config = require('config');
var redisConfig = config.get('database.redisConfig');

var redis = require('redis');

var client = redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options);

client.auth(redisConfig.password, function (err, data) {
    if (err) {
        console.error(" --- redis oauth error --- " + err);
    } else {
        console.log(" --- redis oauth  success --- " + data)
    }
});

client.on('ready', function (res) {
    console.log(' ---  redis ready to work --- ');
});

client.on("error", function (err) {
    console.log(" ---  redis Error --- " + err);
});

module.exports = client;
