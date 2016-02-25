import React from "react";
import {Link,History} from "react-router";

class GoBackNavbar extends React.Component {

    componentDidMount(props) {

    }


    render() {

        debugger;

        return (
            <div>

                <div className="ff-navbar navbarContain">

                    <div className="pure-g">
                        <div className="pure-u-4-24 navbar-back " onClick={() => this.props.history.goBack()}>
                            <i className="iconfont icon-chevronleft"></i>
                        </div>
                        <div className="pure-u-14-24 ">
                            <i>
                                <Link to='/ff/o3o/show/home/homePage'>
                                    {this.props.title}
                                </Link>
                            </i>
                        </div>
                        <div className="pure-u-6-24">

                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

export default GoBackNavbar;

/**
 * TODO:;将悬浮固定顶层导航栏组成React 组件
 * TODO::将点击显示导航栏组成React组件
 */