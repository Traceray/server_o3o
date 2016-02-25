/**
 * Created by o3oNet on 16-2-23.
 */


/**
 * 加载适配器
 * @type {exports|module.exports}
 */
var diskAdapter = require('sails-disk');
var mongoAdapter = require('sails-mongo');
var mysqlAdapter = require('sails-mysql');
var redisAdapter = require('sails-redis');

/**
 * 加载数据库配置文件
 * @type {Config|*|exports|module.exports}
 */
var config = require('config');
//mysql;
var mysqlConfig = config.get('database.mysqlConfig');
var infoDbConfig = mysqlConfig.infoDataBase;//基本信息数据库
var promotConfig = mysqlConfig.promotDataBase;//promotions 数据库连接池
//mongodb
var mongoDBConfig = require("config").get("database.mongoDB");
//redis
var redisConfig = config.get('database.redisConfig');


// Build A Config Object
var wlconfig = {

    // Setup Adapters
    // Creates named adapters that have been required
    adapters: {
        'default': redisAdapter,
        disk: diskAdapter,
        mysql: mysqlAdapter,
        mongo: mongoAdapter,
        redis: redisAdapter
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {

        myLocalDisk: {
            adapter: 'disk'
        },

        "ztg-mysql": {
            adapter: 'mysql',
            pool: true,
            waitForConnections: true,

            connectionLimit: infoDbConfig.connectionLimit,
            host: infoDbConfig.host,
            user: infoDbConfig.user,
            password: infoDbConfig.password,
            database: infoDbConfig.database,
            port: infoDbConfig.port,

            // Optional
            charset: 'utf8',
            collation: 'utf8_swedish_ci'
        },

        "infomation-mysql": {
            adapter: 'mysql',
            pool: true,
            waitForConnections: true,

            connectionLimit: infoDbConfig.connectionLimit,
            host: infoDbConfig.host,
            user: infoDbConfig.user,
            password: infoDbConfig.password,
            database: infoDbConfig.database,
            port: infoDbConfig.port,

            // Optional
            charset: 'utf8',
            collation: 'utf8_swedish_ci'
        },

        "promot-mysql": {
            adapter: 'mysql',
            pool: true,
            waitForConnections: true,

            connectionLimit: promotConfig.connectionLimit,
            host: promotConfig.host,
            user: promotConfig.user,
            password: promotConfig.password,
            database: promotConfig.database,
            port: promotConfig.port,

            // Optional
            charset: 'utf8',
            collation: 'utf8_swedish_ci'
        },

        "mongo": {
            adapter: 'mongo',
            host: mongoDBConfig.host, // defaults to `localhost` if omitted
            port: mongoDBConfig.port, // defaults to 27017 if omitted
            user: mongoDBConfig.user, // or omit if not relevant
            password: mongoDBConfig.password, // or omit if not relevant
            database: mongoDBConfig.database // or omit if not relevant
        },

        "redis": {
            adapter: 'redis',
            port: redisConfig.port,
            host: redisConfig.host,
            password: redisConfig.password,
            database: null,
            options: {
                // low-level configuration
                // (redis driver options)
                parser: 'hiredis',
                return_buffers: false,
                detect_buffers: false,
                socket_nodelay: true,
                no_ready_check: false,
                enable_offline_queue: true
            }
        }
    },

    defaults: {
        migrate: 'alter'
    }

};

module.exports = wlconfig;



