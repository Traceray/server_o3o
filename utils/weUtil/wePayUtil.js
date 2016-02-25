/**
 * Created by o3oNet on 2015-03-22.
 */

var crypto = require('crypto');

var fs = require('fs');
var xml2js = require('xml2js');
var https = require('https');
var url_mod = require('url');

var raw = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort();
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

/**
 * 生成签名
 * 需传入
 * paykey --商户支付密钥
 * @param ret
 * @param url
 * @returns {*}
 */
var wePayUtil = {
    createNonceStr: function () {
        return Math.random().toString(36).substr(2, 15);
    },
    createTimestamp: function () {
        return parseInt(new Date().getTime() / 1000) + '';
    },
    createDatetime: function () {
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        return new Date().Format("yyyyMMdd");
    },
    createSign: function (ret, paykey) {
        var str = raw(ret);
        var stringSignTemp = str + "&key=" + paykey;
        console.log("stringSignTemp+++++++++++++++"+stringSignTemp);
       // var temp=new GB2312UTF8();
       // var utf8SttringSignTemp =temp.Gb2312ToUtf8(stringSignTemp);
       // console.log("utf8SttringSignTemp+++++++++++++++"+utf8SttringSignTemp);
        var utf8SttringSignTemp = unescape(encodeURIComponent(stringSignTemp));
        console.log("utf8SttringSignTemp+++++++++++++++"+utf8SttringSignTemp);
        var sign = crypto.createHash('md5').update(utf8SttringSignTemp).digest("hex").toUpperCase();
        console.log("------------------"+sign);
        return sign;
    },
    createJSApiSign: function (ret) {
        var str = raw(ret);
        var sign = crypto.createHash('sha1').update(str).digest("hex");
        return sign;
    },
    postHttpsRequest:function(url, data, callback){
        var parsed_url = url_mod.parse(url);
        var options = {
            hostname:parsed_url.host,
            port: 443,
            path: parsed_url.path,
            method: 'POST',
            key: fs.readFileSync('/usr/local/fixtures/keys/apiclient_key.pem'),
            cert: fs.readFileSync('/usr/local/fixtures/keys/apiclient_cert.pem'),
            agent: false
        };

        var req = https.request(options, function(res) {
            var content = '';
            res.on('data', function(chunk) {
                content += chunk;
            });
            res.on('end', function(){
                callback(null, content);
            });
        });
        req.on('error', function(e) {
            callback(e);
        });
        var builder = new xml2js.Builder();
        var xml = builder.buildObject({xml:data});
        req.write(xml);
        req.end();
    },
    buildXml:function(obj){
        var builder = new xml2js.Builder();
        var xml = builder.buildObject({xml:obj});
        return xml;
    },
    validate:function (xml, callback) {
        var self = this;
        xml2js.parseString(xml, {
            trim: true,
            explicitArray: false
        }, function (err, json) {
            var error = null,
                data;
            if (err) {
                error = new Error();
                err.name = "XMLParseError";
                return callback(err, xml);
            }

            data = json ? json.xml : {};

            //if (data.return_code == RETURN_CODES.FAIL) {
            //    error = new Error(data.return_msg);
            //    error.name = "ProtocolError";
            //} else if (data.result_code == RETURN_CODES.FAIL) {
            //    error = new Error(data.err_code);
            //    error.name = "BusinessError";
            //} else if (self.appId !== data.appid) {
            //    error = new Error();
            //    error.name = "InvalidAppId";
            //} else if (self.mchId !== data.mch_id) {
            //    error = new Error();
            //    error.name = "InvalidMchId";
            //} else if (self.subMchId && self.subMchId !== data.sub_mch_id) {
            //    error = new Error();
            //    error.name = "InvalidSubMchId";
            //} else if (self._getSign(data) !== data.sign) {
            //    error = new Error();
            //    error.name = "InvalidSignature";
            //}

            callback(error, data);
        });
    }
}


function GB2312UTF8(){
    this.Dig2Dec=function(s){
        var retV = 0;
        if(s.length == 4){
            for(var i = 0; i < 4; i ++){
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return retV;
        }
        return -1;
    }
    this.Hex2Utf8=function(s){
        var retS = "";
        var tempS = "";
        var ss = "";
        if(s.length == 16){
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" +  s.substring(4, 10);
            tempS += "10" + s.substring(10,16);
            var sss = "0123456789ABCDEF";
            for(var i = 0; i < 3; i ++){
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i)+1)*8);
                retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
                retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
            }
            return retS;
        }
        return "";
    }
    this.Dec2Dig=function(n1){
        var s = "";
        var n2 = 0;
        for(var i = 0; i < 4; i++){
            n2 = Math.pow(2,3 - i);
            if(n1 >= n2){
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';
        }
        return s;
    }

    this.Str2Hex=function(s){
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for(var i = 0; i < s.length; i ++){
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += this.Dec2Dig(eval(n));
        }
        return digS;
    }
    this.Gb2312ToUtf8=function(s1){
        var s = escape(s1);
        var sa = s.split("%");
        var retV ="";
        if(sa[0] != ""){
            retV = sa[0];
        }
        for(var i = 1; i < sa.length; i ++){
            if(sa[i].substring(0,1) == "u"){
                retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));
                if(sa[i].length){
                    retV += sa[i].substring(5);
                }
            }
            else{
                retV += unescape("%" + sa[i]);
                if(sa[i].length){
                    retV += sa[i].substring(5);
                }
            }
        }
        return retV;
    }
    this.Utf8ToGb2312=function(str1){
        var substr = "";
        var a = "";
        var b = "";
        var c = "";
        var i = -1;
        i = str1.indexOf("%");
        if(i==-1){
            return str1;
        }
        while(i!= -1){
            if(i<3){
                substr = substr + str1.substr(0,i-1);
                str1 = str1.substr(i+1,str1.length-i);
                a = str1.substr(0,2);
                str1 = str1.substr(2,str1.length - 2);
                if(parseInt("0x" + a) & 0x80 == 0){
                    substr = substr + String.fromCharCode(parseInt("0x" + a));
                }
                else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
                    b = str1.substr(1,2);
                    str1 = str1.substr(3,str1.length - 3);
                    var widechar = (parseInt("0x" + a) & 0x1F) << 6;
                    widechar = widechar | (parseInt("0x" + b) & 0x3F);
                    substr = substr + String.fromCharCode(widechar);
                }
                else{
                    b = str1.substr(1,2);
                    str1 = str1.substr(3,str1.length - 3);
                    c = str1.substr(1,2);
                    str1 = str1.substr(3,str1.length - 3);
                    var widechar = (parseInt("0x" + a) & 0x0F) << 12;
                    widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
                    widechar = widechar | (parseInt("0x" + c) & 0x3F);
                    substr = substr + String.fromCharCode(widechar);
                }
            }
            else {
                substr = substr + str1.substring(0,i);
                str1= str1.substring(i);
            }
            i = str1.indexOf("%");
        }

        return substr+str1;
    }
}

module.exports = wePayUtil;



