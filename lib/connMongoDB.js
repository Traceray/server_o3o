/**
 * Created by o3oNet on 2016-1-18.
 */

'use strict';

var mongoose = require('mongoose');

var mongoDBConfig = require("config").get("database.mongoDB")

mongoose.connect(mongoDBConfig.db, {});

var db = mongoose.connection;

db.on('error', function (error) {
    console.error(" --- mongoose error --- " + error);
});
db.once('open', function (callback) {
    console.log(' ---  mongoose ready to work --- ' + "get open");
});

module.exports = mongoose;
