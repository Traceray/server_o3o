/**
 * Created by o3oNet on 16-2-28.
 */



var sendJsonObj = function (code, errorTitle, errorDetail, jsonObj, jsonStr) {
    this.sendJsonObj = {
        code: code || -1,
        error: {
            title: errorTitle || "",
            detail: errorDetail || {}
        },
        jsonObj: jsonObj || {},
        jsonStr: jsonStr || ""
    };
}


sendJsonObj.prototype.send = function (needSendMsg, dirName, level, type) { //"serverPage"

    console.log("  @@@ -- sendJsonObj -- @@@");

    console.log(this.sendJsonObj);

    if (this.getCode() != 0) console.error(this.sendJsonObj);//TODO::统一错误处理

    if (needSendMsg) console.error("严重错误");

    return this.sendJsonObj || {code: -1, error: {title: "", detail: {}}, jsonObj: {}, jsonStr: ""};
}

sendJsonObj.prototype.getJsonStr = function () {
    return this.sendJsonObj.jsonObj || "";
}

sendJsonObj.prototype.getJsonObj = function () {
    return this.sendJsonObj.jsonStr || {};
}

sendJsonObj.prototype.getErrorDetail = function () {
    return this.sendJsonObj.error.detail || {};
}

sendJsonObj.prototype.getErrorTitle = function () {
    return this.sendJsonObj.error.title || "";
}

sendJsonObj.prototype.getError = function () {
    return this.sendJsonObj.error || {};
};

sendJsonObj.prototype.getCode = function () {
    return this.sendJsonObj.code || -1;
}

module.exports = sendJsonObj;