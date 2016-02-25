import React from "react";
import {Link,History} from "react-router";

const styles = require("./GoBackNavbar.scss");

import config from "../../../config";

class GoBackNavbar extends React.Component {

    componentDidMount(props) {
        /**
         * 实现悬浮导航 往上滑固定
         */
        //var a = $(document).scrollTop();
        //var b = $('.' + styles.ffNavbar).outerHeight();
        //$(window).scroll(function () {
        //    var c = $(document).scrollTop();
        //    if (c > b) {
        //        $('.' + styles.ffNavbar).addClass(styles.gizle);
        //    }
        //    else {
        //        $('.' + styles.ffNavbar).removeClass(styles.gizle);
        //    }
        //    if (c > a) {
        //        $('.' + styles.ffNavbar).removeClass(styles.sabit);
        //    }
        //    else {
        //        $('.' + styles.ffNavbar).addClass(styles.sabit);
        //    }
        //    a = $(document).scrollTop();
        //});

    }


    render() {

        return (
            <div>

                <div className={styles.ffNavbar}>

                    <div className="pure-g">
                        <div className="pure-u-6-24" onClick={() => this.props.history.goBack()}>
                            <div className={styles.navbarBack}>
                                <i className="iconfont icon-chevronleft"></i>
                            </div>
                        </div>
                        <div className="pure-u-12-24">
                            <div className={styles.navbarTitleBack}>
                                <Link to={config.prefixUrl + '/home/homePage'}>
                                    {this.props.title}
                                </Link>
                            </div>
                        </div>
                        <div className="pure-u-6-24">
                            <Link to={config.prefixUrl + '/home/homePage'}>
                                <div className={styles.navbaHomeBack}>
                                    <i className="iconfont icon-home"></i>
                                </div>
                            </Link>
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

export default GoBackNavbar;

/**
 * TODO:;将悬浮固定顶层导航栏组成React 组件
 * TODO::将点击显示导航栏组成React组件
 */