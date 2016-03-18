import React from "react";
import {Link} from "react-router";

import {postMsgCheck,checkRegister} from "../../api"

import {checkIsTel} from "../../../../utils/util"

import GoBackNavbar from "../navbars/goBackNavbar/GoBackNavbar";


class IdentityPhoneNumber extends React.Component {

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

    render() {

        const styles = require("./IdentityPhoneNumber.scss");

        return (
            <div>

                <div id="identityPhone" className={styles.container}>
                    <div className={styles.phoneInput}>
                        <div className="pure-u-1-4">
                            <span className={styles.tit1}>手机号</span>
                        </div>
                        <div className="pure-u-3-4">
                            <div className="pure-u-3-24">
                                <label> +86</label>
                            </div>
                            <div className="pure-u-21-24">
                                <input className={styles.weui_input} type="text" placeholder="请输入您的电话号码"
                                       id="phoneNum"></input>
                            </div>
                        </div>

                    </div>

                    <div className={styles.identityInput}>
                        <div className="pure-u-1-4">
                            <span className={styles.tit1}>验证码</span>
                        </div>
                        <div className="pure-u-3-4">
                            <div className="pure-u-15-24">
                                <input className={styles.weui_input} type="text" placeholder="请输入5位验证码"
                                       id="identityCode"></input>
                            </div>
                            <div className="pure-u-8-24">
                                <a className={styles.btn1} id="sendIdentityNum"><span
                                    className={styles.tit2}>发送验证码</span></a>
                            </div>
                            <div className="pure-u-1-24">
                            </div>
                        </div>
                    </div>

                    <div className={styles.submit}>
                        <div className={styles.notice}>
                            <span className="">未注册过的手机将自动创建为链家账号</span>
                        </div>
                        <div className="pure-u-24-24">
                            <a className={styles.btn2} id="register"><span className={styles.tit3}>验证并登陆</span></a>
                        </div>
                    </div>

                </div>
            </div>
        );

    }
}

export default  IdentityPhoneNumber







