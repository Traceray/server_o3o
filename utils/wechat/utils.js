/**
 * Created by o3oNet on 16-2-26.
 */


/*!
 * 从微信的提交中提取XML文件
 */
exports.getMessage = function (stream, callback) {
    load(stream, function (err, buf) {
        if (err) {
            return callback(err);
        }
        var xml = buf.toString('utf-8');
        stream.weixin_xml = xml;
        xml2js.parseString(xml, {trim: true}, callback);
    });
};

/**
 * 加载数据
 * @param stream
 * @param callback
 */
exports.load = function (stream, callback) {
    // support content-type 'text/xml' using 'express-xml-bodyparser', which set raw xml string
    // to 'req.rawBody'(while latest body-parser no longer set req.rawBody), see
    // https://github.com/macedigital/express-xml-bodyparser/blob/master/lib/types/xml.js#L79
    if (stream.rawBody) {
        callback(null, stream.rawBody);
        return;
    }

    var buffers = [];
    stream.on('data', function (trunk) {
        buffers.push(trunk);
    });
    stream.on('end', function () {
        callback(null, Buffer.concat(buffers));
    });
    stream.once('error', callback);
};

/*!
 * 将xml2js解析出来的对象转换成直接可访问的对象
 */
exports.formatMessage = function (result) {
    var message = {};
    if (typeof result === 'object') {
        for (var key in result) {
            if (!(result[key] instanceof Array) || result[key].length === 0) {
                continue;
            }
            if (result[key].length === 1) {
                var val = result[key][0];
                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];
                result[key].forEach(function (item) {
                    message[key].push(formatMessage(item));
                });
            }
        }
    }
    return message;
};