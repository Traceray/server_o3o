/**
 * Created by o3oNet on 16-1-7.
 */

import React,{Component,PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import GoBackNavbar from "../../components/navbars/goBackNavbar/GoBackNavbar";

class ChaXunDaiKuanJinDu extends React.Component {
    componentDidMount() {

    }

    render() {
        const styles = require("./ChaXunDaiKuanJinDu.scss");

        //校验是否有用户信息 没有则显示校验

        return (
            <div>
                <GoBackNavbar history={this.props.history} title="查询贷款进度"/>
                <div className={appStyles.container}>

                    <div className={styles.container}>

                        贷款进度/贷款详情

                        <div className={styles.mainContainer}>

                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer}>
                                    <div className={styles.row0}>
                                    </div>
                                    <div className={styles.row2}>
                                        <div className={styles.num}>
                                            <span>
                                                1
                                            </span>
                                            <i></i>
                                        </div>
                                    </div>
                                    <div className={styles.row3}>
                                    </div>
                                </div>
                                <div className="pure-u-21-24">
                                    <div className={styles.contentContanier}>
                                        <div className={styles.arrow_box}>
                                            <div className={styles.content}>
                                                您的查询需求已经提交<br/>
                                                等待系统确认您的信息<br/>
                                                ceshi<br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer1}>
                                    <div className={styles.row1}>

                                    </div>
                                </div>
                                <div className="pure-u-21-24">

                                </div>
                            </div>
                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer}>
                                    <div className={styles.row1}>
                                    </div>
                                    <div className={styles.row2}>
                                        <div className={styles.num}>
                                            <span>
                                                2
                                            </span>
                                            <i></i>
                                        </div>
                                    </div>
                                    <div className={styles.row3}>
                                    </div>
                                </div>
                                <div className="pure-u-21-24">
                                    <div className={styles.contentContanier}>
                                        <div className={styles.arrow_box}>
                                            <div className={styles.content}>
                                                您的查询需求已经提交<br/>
                                                等待系统确认您的信息<br/>
                                                您的查询需求已经提交<br/>
                                                等待系统确认您的信息<br/>
                                                您的查询需求已经提交<br/>
                                                等待系统确认您的信息<br/>
                                                ceshi<br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer1}>
                                    <div className={styles.row1}>

                                    </div>
                                </div>
                                <div className="pure-u-21-24">

                                </div>
                            </div>
                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer}>
                                    <div className={styles.row1}>
                                    </div>
                                    <div className={styles.row2}>
                                        <div className={styles.num}>
                                            <span>
                                              3
                                            </span>
                                            <i></i>
                                        </div>
                                    </div>
                                    <div className={styles.row3}>
                                    </div>
                                </div>
                                <div className="pure-u-21-24">
                                    <div className={styles.contentContanier}>
                                        <div className={styles.arrow_box}>
                                            <div className={styles.content}>
                                                您的查询需求已经提交<br/>
                                                等待系统确认您的信息<br/>
                                                ceshi<br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer1}>
                                    <div className={styles.row1}>

                                    </div>
                                </div>
                                <div className="pure-u-21-24">

                                </div>
                            </div>
                            <div className="pure-g">
                                <div className={"pure-u-3-24 "+styles.iconContainer1}>
                                    <div className={styles.row1}>

                                    </div>
                                </div>
                                <div className="pure-u-21-24">

                                </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>

        );


    }
}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
}

export default connect(mapStateToProps)(ChaXunDaiKuanJinDu)