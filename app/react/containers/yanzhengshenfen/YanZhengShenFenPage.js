/**
 * Created by o3oNet on 16-1-7.
 */

import React,{Component,PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import GoBackNavbar from "../../components/navbars/goBackNavbar/GoBackNavbar";

class YanZhengShenFenPage extends React.Component {
    componentDidMount() {

    }

    render() {
        const styles = require("./YanZhengShenFenPage.scss");

        return (
            <div>
                <GoBackNavbar history={this.props.history} title="关于我们"/>
                <div className={appStyles.container}>

                    <div className={styles.container}>


                        

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

export default connect(mapStateToProps)(YanZhengShenFenPage)