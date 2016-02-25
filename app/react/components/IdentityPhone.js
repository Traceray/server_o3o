import React from "react";
import {Link} from "react-router";

import {postMsgCheck,checkRegister} from "../api"

import {checkIsTel} from "../../../utils/util"

import GoBackNavbar from "./navbars/GoBackNavbar";


class IdentityPhone extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var me = this;

        var hasClickable = true;
        //点击发送验证码
        $("#sendIdentityNum").click(function () {
            //TODO::发送信息
            if (!hasClickable) {
                return false;
            }

            var self = $(this);
            self.find("span").text("发送中..");

            var phoneNum = $("#phoneNum").val();

            if (!checkIsTel(phoneNum)) {
                //TODO:错误提示
                alert("请输入正确的电话号码!");
                self.find("span").text("发送验证码");
                return;
            }
            hasClickable = false;

            postMsgCheck({
                phoneNum: phoneNum
            }, function (error, data) {
                if (error) {
                    //TODO::toast一个错误
                    alert(error);
                    self.find("span").text("发送验证码");
                    hasClickable = true;
                } else {
                    let num = 60;

                    var intMinus = setInterval(function () {
                        num = num - 1;
                        var text = "已发送（" + num + "s）";
                        self.find("span").text(text);
                        if (num == 1) {
                            clearInterval(intMinus);
                            self.find("span").text("发送验证码");
                            hasClickable = true;
                        }
                    }, 1000);

                }
            }, function (err) {
                self.find("span").text("发送验证码");
                hasClickable = true;
            });


        });

        //点击提交注册按钮
        $("#register").click(function () {
            var self = $(this);
            debugger;
            var phoneNum = $("#phoneNum").val().trim();
            //me.props.updateUserInfo(phoneNum);
            //alert("c");
            //return;
            var identityCode = $("#identityCode").val().trim();
            checkRegister({
                phoneNum: phoneNum,
                identityCode: identityCode
            }, function (error, data) {
                if (error) {
                    //TODO::toast一个错误
                    alert(error);
                } else {
                    if (data == "ok") {
                        me.props.updateUserInfo(phoneNum);
                    } else {
                        alert("验证码输入错误,请检查!");
                    }
                }
            }, function (err) {

            });

        });

    }

    handlerChoice(event) {
        event.preventDefault();
        this.props.updateAddressInfo({
            tel: this.props.userid,
            name: "邵先生",
            address: "辽宁省沈阳市和平区桂林街1号773室"
        });

        debugger;
        this.props.history.pushState(null, "/ff/o3o/show/checkout");
    }

    render() {

        const {userid,history} = this.props;

        debugger;

        if (!userid) {
            return (
                <div>
                    <GoBackNavbar history={history} title="手机验证"/>
                    <div id="identityPhone" className="container ui-whitespace fadeInUp animated">
                        <div>
                            <div className="phoneInput">
                                <div className="pure-u-1-4">
                                    <span className="tit1">手机号</span>
                                </div>
                                <div className="pure-u-3-4">
                                    <div className="pure-u-3-24">
                                        <label> +86</label>
                                    </div>
                                    <div className="pure-u-21-24">
                                        <input className="weui_input" type="text" placeholder="请输入您的电话号码"
                                               id="phoneNum"></input>
                                    </div>
                                </div>

                            </div>

                            <div className="identityInput">
                                <div className="pure-u-1-4">
                                    <span className="tit1">验证码</span>
                                </div>
                                <div className="pure-u-3-4">
                                    <div className="pure-u-15-24">
                                        <input className="weui_input" type="text" placeholder="请输入5位验证码"
                                               id="identityCode"></input>
                                    </div>
                                    <div className="pure-u-8-24">
                                        <a className="btn1" id="sendIdentityNum"><span className="tit2">发送验证码</span></a>
                                    </div>
                                    <div className="pure-u-1-24">
                                    </div>
                                </div>
                            </div>

                            <div className="other">
                                <div className="notice">
                                    <span className="">为注册过的手机将自动创建为自餐厅账号</span>
                                </div>
                                <div className="pure-u-24-24">
                                    <a className="btn2" id="register"><span className="tit3">验证并登陆</span></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <GoBackNavbar history={history} title="编辑地址"/>
                    <div id="choiceAddress" className="container ui-whitespace fadeInUp animated">
                        <div className="address">
                            <div>
                                <a onClick={this.handlerChoice.bind(this)}>
                                    <div className="main-info">
                                        <div className="baseinfo">
                                            <span className="name">邵先生</span>
                                            <span className="phoneNum">15279282851</span>
                                        </div>
                                        <div className="streetAddress">辽宁省沈阳市和平区桂林街1号773室</div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default  IdentityPhone







