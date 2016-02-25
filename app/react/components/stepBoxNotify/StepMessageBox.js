/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";

//TODO::依赖Jquery

class StepMessageBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./StepMessageBox.scss");

        //const {index,isFirst,isLast,isActive} = this.props;

        //wait,sthWrong,scuess,err,ing

        //const index = 1;
        //const isFirst = true;
        //const isLast = false;
        //const isActive = false;
        //const isNextActive = false;
        const {stepBox} = this.props;

        const topRowStyle = stepBox.isFirst ? styles.topRow_First : ( stepBox.isActive ? styles.topRow_Active : styles.topRow_Default);

        const indexNumStyle = stepBox.isActive ? styles.num_Active : styles.num_Default;

        const arrowBoxStyle = stepBox.isActive ? styles.arrow_box_Active : styles.arrow_box_Default;

        const bottomRow = stepBox.isNextActive ? styles.bottomRow_Active : styles.bottomRow_Default;

        const index = stepBox.index;

        return (
            <div className={styles.container}>

                <div className="pure-g">
                    <div className={"pure-u-3-24 "+styles.iconContainer}>
                        <div className={topRowStyle}>
                        </div>
                        <div className={styles.centerRow}>
                            <div className={styles.num +" "+indexNumStyle}>
                                <span>{index}</span><i></i>
                            </div>
                        </div>
                        <div className={bottomRow}>
                        </div>
                    </div>
                    <div className={"pure-u-21-24 "+styles.contentContanier}>
                        <div className={arrowBoxStyle}>
                            <div className={styles.content}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pure-g">
                    <div className={"pure-u-3-24 "+styles.iconContainer}>
                        <div className={bottomRow}>
                            <div className={styles.blankRow}>
                            </div>
                        </div>
                    </div>
                    <div className="pure-u-21-24">
                    </div>
                </div>
            </div>

        );
    }

}

export default StepMessageBox;