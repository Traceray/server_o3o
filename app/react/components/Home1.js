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
                    <div className="fadeInUp animated">

                        <div className="insideNavbar">
                            <ul id="homeInsideNavbar">
                                <li>
                                    <Link to='/ff/o3o/show/home/homePage' activeClassName="active">
                                        首页
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/ff/o3o/show/home/homePage2' activeClassName="active">
                                        优惠信息
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/ff/o3o/show/home/homePage4' activeClassName="active">
                                        会员
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/ff/o3o/show/home/homePage5' activeClassName="active">
                                        订单
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="homeContainer">
                            {this.props.children || <HomePage />}
                        </div>
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







