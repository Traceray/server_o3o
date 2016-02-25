/**
 * Created by o3oNet on 16-1-7.
 */

import React,{Component,PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import IdentityPhoneNumber from "../../components/identityPhone/IdentityPhoneNumber"

import {Dialog, Button,Toast} from 'react-weui';
const {Alert, Confirm} = Dialog;

import {postMsgCheck,checkRegister,postLoanApprovalingInfoAPI} from "../../api"


import GoBackNavbar from "../../components/navbars/goBackNavbar/GoBackNavbar";
import StepNotifyMessageLineBox from "../../components/stepBoxNotify/StepNotifyMessageLineBox"

import {getLoanApprovalingNotifyData} from "../../reducers/approvalingData.js"

import {checkIsTel} from "../../../../utils/util"

class ChaXunDaiKuanJinDu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            showToast: false,
            showConfirm: false,
            showLoading: false,
            alert: {
                title: '标题标题',
                buttons: [
                    {
                        label: '好的',
                        onClick: this.hideAlert.bind(this)
                    }
                ]
            }
        }

    }

    showAlert() {
        this.setState({showAlert: true});
    }

    hideAlert() {
        this.setState({showAlert: false});
    }

    componentDidMount() {


        var me = this;

        /**
         * 短信验证部分--发送验证码
         * @type {boolean}
         */
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
                showAlertInfo(me, "请输入正确的电话号码!");
                self.find("span").text("发送验证码");
                return;
            }
            hasClickable = false;

            postMsgCheck({
                phoneNum: phoneNum
            }, function (error, data) {
                if (error) {
                    //TODO::toast一个错误
                    showAlertInfo(me, error);
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


        $("#postOrder").click(function () {

            var self = $(this);

            var realName = $("#realName").val().trim();
            if (!realName) {
                showAlertInfo(me, "请输入您的真实姓名!");
                return;
            }

            var identifyNum = $("#identifyNum").val().trim();
            if (isNaN(identifyNum)) {
                identifyNum = "";
            }

            var typeName = $("#typeName").val();

            var price = $("#price").text().trim();

            var note = $("#note").val().trim();


            var phoneNum = $("#phoneNum").val().trim();

            var identityCode = $("#identityCode").val().trim();

            me.setState({showLoading: true});

            checkRegister({
                phoneNum: phoneNum,
                identityCode: identityCode,
                realName: realName,
                identifyNum: identifyNum
            }, function (error, data) {
                if (error) {
                    //TODO::toast一个错误
                    me.setState({showLoading: false});
                    showAlertInfo(me, error);
                } else {

                    postLoanApprovalingInfoAPI(
                        {
                            uuid: data.uuid,
                            type: typeName,
                            note: note

                        }, function (error, data) {
                            if (error) {
                                //TODO::toast一个错误
                                me.setState({showLoading: false});
                                showAlertInfo(me, error);
                            } else {
                                me.setState({showLoading: false});

                                setTimeout(()=> {
                                    me.setState({showToast: true});
                                }, 300);

                                setTimeout(()=> {
                                    me.setState({showToast: false});
                                }, 2000);
                            }

                        }, function (err) {

                        });


                }
            }, function (err) {
                me.setState({showLoading: false});
            });

            //校验其他信息

        });


        function showAlertInfo(me, title) {
            me.setState({
                alert: {
                    title: title,
                    buttons: [
                        {
                            label: '好的',
                            onClick: me.hideAlert.bind(me)
                        }
                    ]
                }
            });
            me.setState({showAlert: true});
        }

    }

    render() {
        const styles = require("./ChaXunDaiKuanJinDu.scss");

        //校验是否有用户信息 没有则显示校验

        const {stepNotifyData} =this.props;

        console.log(stepNotifyData);

        if (stepNotifyData.length == 0) {


            return (
                <div>
                    <GoBackNavbar history={this.props.history} title="贷款进度查询申请"/>

                    <div className={appStyles.container}>

                        <div className={styles.container}>

                            <Alert
                                show={this.state.showAlert}
                                title={this.state.alert.title}
                                buttons={this.state.alert.buttons}>
                            </Alert>

                            <Toast icon="loading" show={this.state.showLoading}>提交申请中...</Toast>
                            <Toast show={this.state.showToast}>完成</Toast>

                            <div className={styles.imageGalleryContainer}>
                                当前没有正在进行中的贷款审批信息，请先填写申请信息
                            </div>


                            <div className={styles.formContainer}>
                                <ul>
                                    <li className={styles.roomInfo}>
                                        <div className={styles.title}>
                                            <span className={styles.chineseTitle}>
                                                申请信息
                                            </span>
                                        </div>
                                    </li>
                                    <li className={styles.typeShow}>
                                        <div className={styles.infoShow}>
                                            <div className="pure-g">
                                                <div className="pure-u-6-24">
                                                    <div className={styles.infoTitle}>
                                                        <div className={styles.chineseTitle}>
                                                            <span >
                                                                申请类别
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pure-u-12-24">
                                                    <div className={styles.infoContent}>
                                                    <span >
                                                        <select id="typeName">
                                                            <option value="sd">
                                                                商业贷款
                                                            </option>
                                                            <option value="gjj">
                                                                公积金贷款
                                                            </option>
                                                            <option value="hhd">
                                                                混合贷款
                                                            </option>
                                                        </select>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="pure-u-6-24">
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={styles.baseInfo}>
                                        <div className={styles.infoShow}>
                                            <div className="pure-g">
                                                <div className="pure-u-6-24">
                                                    <div className={styles.infoTitle}>
                                                        <div className={styles.chineseTitle}>
                                                            <span >
                                                                楼盘信息
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pure-u-12-24">
                                                    <div className={styles.infoContent}>
                                                    <span>
                                                         沈阳全部
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="pure-u-6-24">
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className={styles.userInfo}>

                                        <div className={styles.title}>
                                            <span className={styles.chineseTitle}>
                                                个人信息
                                            </span>
                                        </div>

                                    </li>

                                    <li className={styles.realName}>
                                        <div className={styles.infoInput}>
                                            <div className="pure-g">
                                                <div className="pure-u-6-24">
                                                    <div className={styles.infoTitle}>
                                                        <div className={styles.chineseTitle}>
                                                            <span >
                                                                真实姓名
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pure-u-12-24">
                                                    <div className={styles.inputInfo}>
                                                    <span>
                                                        <input className={styles.weui_input} type="text"
                                                               placeholder="输入您的真实姓名"
                                                               id="realName"/>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="pure-u-6-24">
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                    <li className={styles.identifyNum}>
                                        <div className={styles.infoInput}>
                                            <div className="pure-g">
                                                <div className="pure-u-6-24">
                                                    <div className={styles.infoTitle}>
                                                        <div className={styles.chineseTitle}>
                                                            <span >
                                                                身份证号码
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pure-u-16-24">
                                                    <div className={styles.inputInfo}>
                                                    <span>
                                                        <input className={styles.weui_input} type="number"
                                                               placeholder="输入您的身份证号码"
                                                               id="identifyNum"/>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="pure-u-2-24">
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                    <li className={styles.phoneNum}>
                                        <div className={styles.infoInput}>
                                            <div className={styles.phoneInput}>
                                                <div className="pure-g">
                                                    <div className="pure-u-6-24">
                                                        <div className={styles.infoTitle}>
                                                            <div className={styles.chineseTitle}>
                                                            <span >
                                                                电话号码
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pure-u-18-24">
                                                        <div className="pure-u-4-24">
                                                            <label> +86</label>
                                                        </div>
                                                        <div className="pure-u-20-24">
                                                            <input className={styles.weui_input} type="text"
                                                                   placeholder="请输入您的电话号码"
                                                                   id="phoneNum"/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={styles.identityInput}>
                                                <div className="pure-g">
                                                    <div className="pure-u-6-24">
                                                        <div className={styles.infoTitle}>
                                                            <div className={styles.chineseTitle}>
                                                            <span >
                                                                验证码
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pure-u-3-4">
                                                        <div className="pure-u-15-24">
                                                            <input className={styles.weui_input} type="text"
                                                                   placeholder="请输入5位验证码"
                                                                   id="identityCode"></input>
                                                        </div>
                                                        <div className="pure-u-8-24">
                                                            <a className={styles.btn1}
                                                               id="sendIdentityNum"><span
                                                                className={styles.tit2}>发送验证码</span></a>
                                                        </div>
                                                        <div className="pure-u-1-24">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </li>

                                    <li className={styles.orderInfo}>

                                        <div className={styles.title}>
                                            <span className={styles.chineseTitle}>
                                                其他信息
                                            </span>
                                        </div>

                                    </li>

                                    <li className="noteInfo">
                                        <div className={styles.infoInput}>
                                            <div className="pure-g">
                                                <div className="pure-u-6-24">
                                                    <div className={styles.infoTitle}>
                                                        <div className={styles.chineseTitle}>
                                                            <span >
                                                                备注信息
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pure-u-12-24">
                                                    <div className={styles.inputInfo}>
                                                    <span>
                                                        <input className={styles.weui_input} type="text"
                                                               placeholder="如有其它要求请在此填写(选填)"
                                                               id="note"/>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="pure-u-6-24">
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>


                                <div className={styles.orderContainer}>
                                    <div className={styles.button_sp_area}>
                                        <Button type="primary" plain id="postOrder">
                                            <div className={styles.iconStyle}>
                                                <i className="iconfont icon-order"></i>
                                                <span>
                                                    提交申请
                                                </span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>


                </div>
            );
        } else {

            return (
                <div>
                    <GoBackNavbar history={this.props.history} title="贷款进度详情"/>

                    <div className={appStyles.container}>

                        <div className={styles.container}>

                            贷款进度/贷款详情

                            <div className={styles.mainContainer}>

                                <StepNotifyMessageLineBox stepNotifyData={stepNotifyData}>
                                </StepNotifyMessageLineBox>

                            </div>


                        </div>

                    </div>
                </div>

            );
        }


    }
}


function mapStateToProps(state) {
    debugger;
    return {
        stepNotifyData: getLoanApprovalingNotifyData(state.approvalingData)
    }
}

function mapDispatchToProps(dispatch) {
}

export default connect(mapStateToProps)(ChaXunDaiKuanJinDu)