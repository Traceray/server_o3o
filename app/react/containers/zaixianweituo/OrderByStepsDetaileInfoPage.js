/**
 * Created by Tarc on 2015/12/8.
 */

/**
 * 在线委托
 * 详细信息
 */

import React ,{Component,PropTypes} from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Link} from "react-router";

import {getAddressInfo} from "../../reducers/userinfo"

import OrderByStepsDetaileInfo from "../../components/orderBySteps/OrderByStepsDetaileInfo";

var styles = require("./OrderByStepsDetaileInfoPage.scss");

class OrderByStepsDetaileInfoPage extends React.Component {
    componentDidMount() {

    }

    render() {

        const {addressInfo} = this.props;

        const props = {
            addressInfo
        };

        return (
            <div className={styles.container}>

                <OrderByStepsDetaileInfo {...props}></OrderByStepsDetaileInfo>

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        addressInfo: getAddressInfo(state.userinfo)
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderByStepsDetaileInfoPage)

