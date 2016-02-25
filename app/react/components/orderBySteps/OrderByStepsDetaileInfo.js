/**
 * Created by Tarc on 2015/12/8.
 */

/**
 * 在线委托
 * 详细信息
 */

import React ,{Component,PropTypes} from "react";
import {Link} from "react-router";

import IdentityPhoneNumber from "../identityPhone/IdentityPhoneNumber";

import config from "../../config"

//TODO::依赖Jquery

import WeUI from 'react-weui';

const {Button} = WeUI;

var styles = require("./OrderByStepsDetaileInfo.scss");

class OrderByStepsDetaileInfo extends React.Component {

    componentDidMount() {

    }

    render() {

        const {addressInfo,history} = this.props;

        let showEditAddressInfoStyle1 = (addressInfo.name != "") ? styles.invisible : "pure-u-18-24 " + styles.mainInfo;
        let showEditAddressInfoStyle2 = (addressInfo.name != "") ? "pure-u-18-24 " + styles.mainInfo : styles.invisible;

        return (
            <div className={styles.container}>

                <div className={styles.shoujiaContent}>
                    <div className={styles.title}>
                        <span>请填写您的期望售价</span>
                    </div>

                    <div className={styles.content}>

                        <div className="pure-u-16-24">
                            <div className={styles.leftTitle}>
                                <span>
                                    售价
                                </span>
                            </div>
                        </div>
                        <div className="pure-u-6-24">
                            <div className={styles.middleTitle}>
                                <span>
                                   369
                                </span>
                            </div>
                        </div>
                        <div className="pure-u-2-24">
                            <div className={styles.rightTitle}>
                                <span>万</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={styles.contactContent}>
                    <div className={styles.title}>
                        <span>请填写您的联系信息</span>
                    </div>

                    <div className={styles.address}>
                        <div className="pure-u-3-24">
                            <div className={styles.location}>
                                <i className="iconfont icon-locationfill"></i>
                            </div>
                        </div>

                        <div className={showEditAddressInfoStyle1}>
                            <Link to={config.prefixUrl+"/choiceAddress"}>
                                <div className={styles.editinfo}>

                                    <span>请点击编辑联系方式</span>

                                </div>
                            </Link>

                        </div>

                        <div className={showEditAddressInfoStyle2}>
                            <div className={styles.baseinfo}>
                                <span className={styles.name}>邵先生</span>
                                <span className={styles.phoneNum}>15279282851</span>
                            </div>
                            <div className={styles.streetAddress}>辽宁省沈阳市和平区桂林街1号773室</div>
                        </div>


                        <div className="pure-u-3-24">
                            <div className={styles.right}>
                                <i className="iconfont icon-right"></i>
                            </div>
                        </div>
                    </div>

                </div>


                <div className={styles.expectContent}>
                    <div className={styles.title}>
                        <span>请填写您的预期信息</span>
                    </div>

                    <div className={styles.content}>
                        <div className="pure-u-16-24">
                            <div className={styles.leftTitle}>
                                <span>
                                    期望出售时间
                                </span>
                            </div>
                        </div>
                        <div className="pure-u-6-24">
                            <div className={styles.middleTitle}>
                                <span>

                                </span>
                            </div>
                        </div>
                        <div className="pure-u-2-24">
                            <div className={styles.rightTitle}>
                                <i className="iconfont icon-right"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.nextStep}>
                    <div className={styles.button_sp_area}>
                        <Button type="primary" plain>提交</Button>
                    </div>
                </div>

            </div>
        );
    }

}

export default OrderByStepsDetaileInfo;

