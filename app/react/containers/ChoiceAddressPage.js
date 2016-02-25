/**
 * Created by Trac on 2015/11/28.
 */


/**
 * Created by Administrator on 2015/11/20.
 */
import React,{Component,PropTypes} from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";

import { getUserId } from '../reducers/userinfo'
import {userinfoActions} from "../actions"


import IdentityPhone from "../components/identityPhone/IdentityPhone";

class ChoiceAddressPage extends Component {
    render() {
        debugger;

        const {updateUserInfo,updateAddressInfo} = this.props.userinfoActions;
        const {userid,history} = this.props;
        debugger;
        const props = {
            userid,
            updateUserInfo,
            updateAddressInfo,
            history
        };
        return (
            <div className={appStyles.container}>
                <IdentityPhone {...props}></IdentityPhone>
            </div>
        );
    }
}

ChoiceAddressPage.PropTypes = {
    //counter: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    debugger;
    return {
        userid: getUserId(state.userinfo)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceAddressPage)
