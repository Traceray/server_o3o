/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";
import {Link} from "react-router";

//TODO::依赖Jquery

class SubProductFloor extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./SubProductFloor.scss");

        return (
            <div className={"pure-u-1-2 "+styles.itemStyle}>

                <Link to={this.props.linkTo}>
                    <div className={"pure-g "+styles.item}>
                        <div className="pure-u-9-24">
                            <div className={styles.imgContainer}>
                                <img src={this.props.imgSrc} width={this.props.width}
                                />
                            </div>
                        </div>

                        <div className="pure-u-15-24">
                            <div className={styles.titleContainer}>
                                <p className={styles.title1}>{this.props.title}</p>

                                <p className={styles.title2}>{this.props.subTitle}</p>
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
    width: "52",
    height: "52",
    title: "",
    subTitle: "",
    imgSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
};


export default SubProductFloor;