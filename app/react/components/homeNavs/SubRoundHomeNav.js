/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";
import {Link} from "react-router";

//TODO::依赖Jquery

var styles = require("./SubRoundHomeNav.scss");

class SubProductFloor extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={"pure-u-1-4 "+styles.itemStyle}>

                <Link to={this.props.linkTo}>
                    <div className={styles.item}>
                        <div className={styles.imgContainer}>
                            <img src={this.props.imgSrc} width={this.props.width}
                            />
                        </div>

                        <div className={styles.titleContainer}>
                            <div className={styles.title}>
                                <span>{this.props.title}</span>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        )
    }

}

SubProductFloor.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string
};

SubProductFloor.defaultProps = {
    width: "56",
    height: "56",
    title: "",
    subTitle: "",
    imgSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
};


export default SubProductFloor;