import React from "react";
import {Link} from "react-router";

import Navbar from "./navbars/Navbar";

class Home extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>

                <div className="container">

                    <div className="homeContainer">
                        {this.props.children}
                    </div>

                </div>
            </div>
        );
    }
}

export default  Home

/**
 * TODO::jquery.fly.min.InsideNavbar React 组件
 */







