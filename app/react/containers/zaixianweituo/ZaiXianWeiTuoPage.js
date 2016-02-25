/**
 * Created by Trac on 2015/11/9.
 */

/**
 *  在线委托页面
 */

import React from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Link} from "react-router";

import GoBackNavbar from "../../components/navbars/goBackNavbar/GoBackNavbar";

import config from "../../config";

import OrderByStepsBasicInfo from "../../components/orderBySteps/OrderByStepsBasicInfo";


class ZaiXianWeiTuoPage extends React.Component {
    componentDidMount() {

    }

    render() {

        const styles = require("./ZaiXianWeiTuoPage.scss");
        debugger;
        const {children,history} = this.props;

        return (
            <div >

                <GoBackNavbar history={history} title="在线委托"/>

                <div className={appStyles.container}>

                    <div className={styles.container}>

                        <div className={styles.processBar}>
                            进度条
                        </div>

                        <div className={styles.stepsContainer}>
                            {this.props.children}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        //goodsItemsShowData: getGoodsItemsShowData(state)
    }
}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps)(ZaiXianWeiTuoPage)
