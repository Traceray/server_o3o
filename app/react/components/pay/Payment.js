import React from "react";
import {Link} from "react-router";

import GoBackNavbar from "./../navbars/GoBackNavbar";

let payargs = {};
class Payment extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        $.ajax({
            type: "post",
            url: "/ff/wechat/pay/getWCPayParams/",
            async: true,//同步
            data: {
                foo: "bar"
            },
            success: function (dataObj) {
                payargs.timestamp = dataObj.timeStamp;
                payargs.nonceStr = dataObj.nonceStr;
                payargs.package = dataObj.package;
                payargs.signType = dataObj.signType;
                payargs.paySign = dataObj.paySign;
            }, error: function (err) {
                alert(JSON.stringify(err));
                alert("获取参数错误");
            }
        });


    }

    handlerPay(event) {
        event.preventDefault();

        console.log(payargs);

        wx.chooseWXPay({
            timestamp: payargs.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: payargs.nonceStr, // 支付签名随机串，不长于 32 位
            package: payargs.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: payargs.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: payargs.paySign, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                //支付成功
                alert(res.err_msg);
                alert("支付成功");
            },
            cancel: function (res) {
                alert("取消");
            },
            fail: function (res) {
                alert(res.err_msg);
            }
        });

    }

    render() {


        return (
            <div>
                <GoBackNavbar history={this.props.history} title="自餐厅-点餐111"/>

                <div className="container">

                    <div className="payNumDiv"><span>支付金额0.01元(测试)</span></div>

                    <div className="payDiv">
                        <a onClick={this.handlerPay.bind(this)} className="weui_btn weui_btn_primary pay">微信支付</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment;