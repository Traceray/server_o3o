import React from "react";
import {Link} from "react-router";

import GoBackNavbar from "../navbars/goBackNavbar/GoBackNavbar";

import config from "../../config";

import IdentityPhoneNumber from "./IdentityPhoneNumber"

class IdentityPhone extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handlerChoice(event) {
        event.preventDefault();
        this.props.updateAddressInfo({
            tel: this.props.userid,
            name: "邵先生",
            address: "辽宁省沈阳市和平区桂林街1号773室"
        });

        this.props.history.pushState(null, config.prefixUrl + "/zaixianweituo/detail");
    }

    render() {

        const styles = require("./IdentityPhone.scss");
        const {userid,updateUserInfo,history} = this.props;


        const props = {
            userid,
            updateUserInfo
        }

        debugger;

        if (!userid) {
            return (
                <div>
                    <GoBackNavbar history={history} title="手机验证"/>

                    <IdentityPhoneNumber {...props}></IdentityPhoneNumber>

                </div>
            );
        } else {
            return (
                <div>
                    <GoBackNavbar history={history} title="编辑联系方式"/>

                    <div className={appStyles.container}>
                        <div id="choiceAddress" className={styles.container}>
                            <div className={styles.address}>
                                <div>
                                    <a onClick={this.handlerChoice.bind(this)}>
                                        <div className={styles.mainInfo}>
                                            <div className={styles.baseinfo}>
                                                <span className={styles.name}>邵先生</span>
                                                <span className={styles.phoneNum}>15279282851</span>
                                            </div>
                                            <div className={styles.streetAddress}>辽宁省沈阳市和平区桂林街1号773室</div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default  IdentityPhone







