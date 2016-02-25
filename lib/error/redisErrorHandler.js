/**
 * Created by o3oNet on 2016-1-18.
 */

'use strict';


module.exports = function (err, errInfo) {
    if (err) {
        console.error(err);
    }
    if (errInfo) {
        console.error("!!!" + errInfo.code + "--" + errInfo.title + "--" + errInfo.info + "!!!");
    }
};
