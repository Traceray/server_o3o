/**
 * Created by Administrator on 2015/12/1.
 */

import React from "react";
import {Link} from "react-router";

class SubGoodsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const styles = require("./SubGoodsItem.scss");

        return (
            <div className="pure-u-1-2">
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <Link to={"/ff/o3o/show/takeout/"+this.props.itemId+"/0"}>
                            <img src={this.props.imgUrl} height="180"/></Link>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.title1}>
                            <span>{this.props.itemName}</span>
                        </div>
                        <div className={styles.title2}><span>¥{this.props.price}</span></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default  SubGoodsItem;