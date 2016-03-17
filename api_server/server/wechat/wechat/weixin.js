/**
 * Created by Administrator on 2016/3/17 0017.
 */
/**
 * Created by chent696 on 2015/2/7.
 /common/weixin.js
 */
/*
 拼接微信红包xml串
 */
/*
 serverConfig.json 文件内容
 "clientIp":"222.73.202.251",
 "showName":"i8小时",
 " luckyMoneyWishing":"恭喜发财",
 "mch_id":"", //
 "wxkey":"",  //
 "wxappid":"" //
 */

var xmlreader = require('xmlreader');  //需要安装 xmlreader包
var fs = require('fs');
var https = require('https');
var crypto = require('crypto');

var fnCreateXml = function (json) {

    var _xml = '';
    for (var key in json) {
        _xml += '<' + key + '>' + json[key] + '</' + key + '>';
    }
    return _xml;
}

/*
 生成url串用于微信md5校验
 */
var fnCreateUrlParam = function (json) {

    var _str = '';
    var _arr = []
    for (var key in json) {
        _arr.push(key + '=' + json[key]);
    }
    return _arr.join('&');
}


/*
 生成微信红包数据
 */
var fnGetWeixinBonus = function (option) {

    var _option = option || {};
    var _min_value = _option.min_value || 100, //红包最小金额
        _max_value = _option.max_value || 100, //红包最大金额
        _total_amount = _option.total_amount || 100, //红包总金额
        _re_openid = _option.re_openid || 'omNdNuCzOuYOm5aBr1-B5hhUS1JI', //红包发送的目标用户
        _total_num = _option.total_num || 1; //红包个数

    var _now = new Date();
    var _showName = _option.showName;
    var _clientIp = _option.clientIp;
    var _wishing = _option.luckyMoneyWishing;
    var _mch_id = _option.mch_id;
    var _wxappid = _option.wxappid,
        _wxkey = _option.wxkey;

    var _date_time = _now.getFullYear() + '' + (_now.getMonth() + 1) + '' + _now.getDate();
    var _date_no = (_now.getTime() + '').substr(-8); //生成8为日期数据，精确到毫秒
    var _random_no = Math.floor(Math.random() * 99);
    if (_random_no < 10) { //生成位数为2的随机码
        _random_no = '0' + _random_no;
    }
    var _muc_id = _mch_id;//'1230184802';
    var _xmlTemplate = '<xml>{content}</xml>';
    var _contentJson = {};
    _contentJson.act_name = _showName;// '新年红包';
    _contentJson.client_ip = _clientIp;

    _contentJson.max_value = _max_value;//'100';
    _contentJson.mch_billno = _muc_id + _date_time + _date_no + _random_no; //订单号为 mch_id + yyyymmdd+10位一天内不能重复的数字; //+201502041234567893';
    _contentJson.mch_id = _muc_id;
    //_contentJson.logo_imgurl = '';
    _contentJson.min_value = _min_value;// '100';
    _contentJson.nick_name = _showName;
    _contentJson.nonce_str = '50780e0cca98c8c8e814883e5caa672e';
    _contentJson.re_openid = _re_openid;// 'omNdNuCzOuYOm5aBr1-B5hhUS1JI'; //涛子的openid // 'onqOjjmM1tad-3ROpncN-yUfa6uI';
    _contentJson.remark = _wishing;
    _contentJson.send_name = _option.send_name;//
    //_contentJson.share_content = '';
    //_contentJson.share_share_url = '';
    //_contentJson.share_share_imageurl = '';
    _contentJson.total_amount = _total_amount;// '100';
    _contentJson.total_num = _total_num;//1;
    _contentJson.wishing = _wishing;//'恭喜发财';
    _contentJson.wxappid = _wxappid;// 'wxbfca079a0b9058d3';

    _contentJson.key = _wxkey;
    var _contentStr = fnCreateUrlParam(_contentJson);
    console.log('content=' + _contentStr);

    _contentJson.sign = crypto.createHash('md5').update(_contentStr).digest("hex").toUpperCase();

    //删除 key (key不参与签名)
    delete _contentJson.key;
    var _xmlData = fnCreateXml(_contentJson);

    var _sendData = '<xml>' + _xmlData + '</xml>'; //_xmlTemplate.replace(/{content}/)

    return _sendData;
    console.log('xml=' + _sendData);
}

var fnSendMoney = function (req, res, data, callback) {

    var _host = 'api.mch.weixin.qq.com';
    var _path = '/mmpaymkttransfers/sendredpack';

    var opt = {
        host: _host,
        port: '443',
        method: 'POST',
        path: _path,
        key: fs.readFileSync('./cert/apiclient_key.pem'), //将微信生成的证书放入 cert目录下
        cert: fs.readFileSync('./cert/apiclient_cert.pem')
    }

    var body = '';
    opt.agent = new https.Agent(opt);
    var req = https.request(opt, function (res) {
        console.log("Got response: " + res.statusCode);
        res.on('data', function (d) {
            body += d;
        }).on('end', function () {
            //console.log(res.headers);
            console.log('微信返回消息');
            console.log(body);
            var ret = fnParseReceivedXML(body);
            //如果回调存在就执行回调函数
            if (typeof callback == 'function') {
                callback(null, ret);
            }
        });
    }).on('error', function (e) {
        callback(e)
        console.log("Got error: " + e.message);
    });


    var _sendData = fnGetWeixinBonus(data);
    req.write(_sendData);
    req.end();
}

/*
 解析微信传回来得消息
 */
var fnParseReceivedXML = function (xmlData) {

    try {
        xmlreader.read(xmlData, function (errors, response) {
            if (null !== errors) {
                console.log(errors);
                return;
            }
            // console.log( response.xml );
            if (response && response.xml && response.xml.return_code) {
                if ((response.xml.return_code.text() || '').toLowerCase() == 'sucess') {
                    return true;
                }
                return false;
            }
            return false;
        });
    } catch (e) {
        console.log('weixin sendmoney error+ e.message');
    }
}

exports.sendLuckyMoney = fnSendMoney;