/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";
import {Link} from "react-router";

//TODO::依赖Jquery

class MessageBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./MessageBox.scss");

        const {stepMsg} = this.props;

        return (
            <div className={styles.container}>


                <div className={styles.mainContainer}>

                    <div className={styles.titleContainer}>
                        <label className={styles.title}>
                            {stepMsg.title}
                        </label>
                        <label className={styles.date}>
                            {stepMsg.date}
                        </label>
                    </div>
                    <div className={styles.contentContainer}>
                        <Link to={stepMsg.linkTo}>
                            <div className={styles.content}>
                                <div className={styles.message}>
                                    <label>
                                        信息:{stepMsg.message}
                                    </label>
                                </div>
                                <div className={styles.message}>
                                    <label>
                                        {stepMsg.showMsg}
                                    </label>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

        );
    }

}

export default MessageBox;