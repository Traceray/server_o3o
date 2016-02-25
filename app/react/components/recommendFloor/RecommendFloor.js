/**
 * Created by Administrator on 2015/12/15.
 */
import React ,{Component,PropTypes} from "react";
import {Link} from "react-router";

//TODO::依赖Jquery

class RecommendFloor extends React.Component {
    render() {
        const styles = require("./RecommendFloor.scss");

        const {items} = this.props;

        return (
            <div className={styles.container}>
                <div className="pure-u-9-24">
                    <Link to={items.leftInfo.linkTo}>
                        <div className={styles.lfetMainContanier}>
                            <div className={styles.title}>
                                <img
                                    src={items.leftInfo.titleImgSrc}/>
                            </div>
                            <div className={styles.subTitle}>
                                <span>{items.leftInfo.subTitle}</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <img src={items.leftInfo.detailSrc}
                                     height="75" width="120"/>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="pure-u-15-24">
                    <div className={styles.rightMainContanier}>
                        <div className={styles.topContanier}>
                            <div className="pure-u-13-24">
                                <Link to={items.rightTopInfo.linkTo}>
                                    <div className={styles.title}>
                                        <img width="75" height="18"
                                             src={items.rightTopInfo.titleImgSrc}/>
                                    </div>
                                    <div className={styles.subTitle}>
                                        <span>{items.rightTopInfo.subTitle}</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="pure-u-11-24">
                                <div className={styles.imgContainer}>
                                    <img
                                        src={items.rightTopInfo.detailSrc}
                                        height="48"/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomContanier}>
                            <div className="pure-u-12-24">
                                <div className={styles.lfetContanier}>
                                    <Link to={items.rightBottomInfo.leftInfo.linkTo}>
                                        <div className={styles.title}>
                                                <span>
                                                    {items.rightBottomInfo.leftInfo.title}
                                                </span>
                                        </div>
                                        <div className={styles.subTitle}>
                                            {items.rightBottomInfo.leftInfo.subTitle}
                                        </div>
                                        <div className={styles.imgContainer}>
                                            <img
                                                src={items.rightBottomInfo.leftInfo.detailSrc}
                                                height="40"/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="pure-u-12-24">
                                <div className={styles.rightContanier}>
                                    <Link to={items.rightBottomInfo.rightInfo.linkTo}>
                                        <div className={styles.title}>
                                                <span>
                                                  {items.rightBottomInfo.rightInfo.title}
                                                </span>
                                        </div>
                                        <div className={styles.subTitle}>
                                            {items.rightBottomInfo.rightInfo.subTitle}
                                        </div>
                                        <div className={styles.imgContainer}>
                                            <img
                                                src={items.rightBottomInfo.rightInfo.detailSrc}
                                                height="40"/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecommendFloor;