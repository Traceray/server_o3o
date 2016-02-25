/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";

//TODO::依赖Jquery

import {Link} from "react-router";

import WeUI from 'react-weui';
const {Button} = WeUI;

import config from "../../config";

class OrderByStepsBasicInfo extends React.Component {
    componentDidMount() {

    }

    render() {

        var styles = require("./OrderByStepsBasicInfo.scss");

        return (
            <div className={styles.container}>


                <div className={styles.title}>
                    <span>请选择要委托房源的基本信息</span>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.content}>
                        <div className="pure-u-8-24">
                            <div className={styles.leftTitle}>
                                <span>小区所在城市</span>
                            </div>
                        </div>
                        <div className="pure-u-13-24">
                            <div className={styles.middleTitle}>
                                <span>沈阳</span>
                            </div>
                        </div>
                        <div className="pure-u-3-24">
                            <i className="iconfont icon-right"></i>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className="pure-u-8-24">
                            <div className={styles.leftTitle}>
                                <span>小区名</span>
                            </div>
                        </div>
                        <div className="pure-u-13-24">
                            <div className={styles.middleTitle}>
                                <span>市府社区</span>
                            </div>
                        </div>
                        <div className="pure-u-3-24">
                            <i className="iconfont icon-right"></i>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className="pure-u-8-24">
                            <div className={styles.leftTitle}>
                                <span>楼栋号</span>
                            </div>
                        </div>
                        <div className="pure-u-13-24">
                            <div className={styles.middleTitle}>
                                <span>9栋13楼</span>
                            </div>
                        </div>
                        <div className="pure-u-3-24">
                            <i className="iconfont icon-right"></i>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className="pure-u-8-24">
                            <div className={styles.leftTitle}>
                                <span>单元号</span>
                            </div>
                        </div>
                        <div className="pure-u-13-24">
                            <div className={styles.middleTitle}>
                                <span>6单元</span>
                            </div>
                        </div>
                        <div className="pure-u-3-24">
                            <i className="iconfont icon-right"></i>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className="pure-u-8-24">
                            <div className={styles.leftTitle}>
                                <span>门牌号</span>
                            </div>
                        </div>
                        <div className="pure-u-13-24">
                            <div className={styles.middleTitle}>
                                <span>773室</span>
                            </div>
                        </div>
                        <div className="pure-u-3-24">
                            <i className="iconfont icon-right"></i>
                        </div>
                    </div>

                </div>

                <div className={styles.noticeInfo}>
                    <span>
                        输入正确的房源信息，可能会获得更精准的定价参考信息，以及推荐更合适的经纪人。
                    </span>
                </div>

                <div className={styles.nextStep}>
                    <Link to={config.prefixUrl+"/zaixianweituo/detail"}>
                        <div className={styles.button_sp_area}>
                            <Button type="primary" plain>下一步</Button>
                        </div>
                    </Link>
                </div>

            </div>
        );
    }

}

export default OrderByStepsBasicInfo;

