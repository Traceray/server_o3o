/**
 * Created by Trac on 2015/11/9.
 */
import React from "react";

import GoBackNavbar from "../components/navbars/goBackNavbar/GoBackNavbar";

class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <GoBackNavbar history={this.props.history} title="待开发"/>
                <div className={appStyles.container}>
                    待开发。。
                </div>
            </div>
        );
    }
}

export default NoMatch;