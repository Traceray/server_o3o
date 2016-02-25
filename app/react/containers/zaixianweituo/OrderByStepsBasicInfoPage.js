/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Link} from "react-router";

//TODO::依赖Jquery
import OrderByStepsBasicInfo from "../../components/orderBySteps/OrderByStepsBasicInfo";

var styles = require("./OrderByStepsBasicInfoPage.scss");

class OrderByStepsBasicInfoPage extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <div className={styles.container}>


                <OrderByStepsBasicInfo></OrderByStepsBasicInfo>

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderByStepsBasicInfoPage)

