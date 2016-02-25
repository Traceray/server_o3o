/**
 * Created by o3oNet on 2015-03-30.
 */

'use strict';

/**
 * 本地测试环境
 */

//redis
exports.localRedisConfig = {
    host: '123.57.62.119',
    password: 'o3oNet',
    options: {detect_buffers: true},//设置项
    port: 6379
}

/**
 * 服务器端真实环境配置
 */

exports.redisConfig = {
    host: '95f5c24e0cd348a9.m.cnbja.kvstore.aliyuncs.com',
    password: '95f5c24e0cd348a9:shaoS924744',
    options: {detect_buffers: true},//设置项
    port: 6379
}
