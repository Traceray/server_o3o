/**
 * Created by Administrator on 2015/12/15.
 */

$(function () {

    var url = window.location.href.split('#')[0];
    $.ajax({
        type: "post",
        url: "/ff/wechat/oauthJSApi/",
        async: true,//同步
        data: {
            url: url
        },
        success: function (dataObj) {
            wx.config({
                debug: false,
                appId: dataObj.jsonData.appId,
                timestamp: dataObj.jsonData.timestamp,
                nonceStr: dataObj.jsonData.nonceStr,
                signature: dataObj.jsonData.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
        }, error: function (err) {

        }
    });

    wx.ready(function () {
        // 在这里调用 API
        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
            title: '菜到我家',
            desc: '[菜到我家] 半成品净菜配送,免洗、免切、5分钟上桌',
            link: "http://www.o3onet.com/ff/server/wechat/oauth/o3o",
            imgUrl: "http://cdn.o3onet.com/ff/cdwj/img/logo/getheadimg.png",
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });


    });

});