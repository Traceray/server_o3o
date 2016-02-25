/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";


import StepMessageBox from "./StepMessageBox"
import MessageBox from "./MessageBox"


//TODO::示例DEMO

class StepNotifyMessageLineBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./StepNotifyMessageLineBox.scss");

        //var stepNotifyData = {
        //    title: "",
        //    stepsMsgs: [
        //        {
        //            stepMsg: {
        //                title: "测试1",
        //                status: "",//wait,sthWrong,scuess,err,ing
        //                date: "",
        //                showMsg: "在页面上提示的书籍和",
        //                message: "",
        //                linkTo: "##",
        //                date: "1月16日 15：39"
        //
        //            },
        //            stepBox: {
        //                index: 1,
        //                isFirst: true,
        //                isLast: false,
        //                isActive: true,
        //                isNextActive: true
        //            }
        //        },
        //        {
        //            stepMsg: {
        //                title: "测试2",
        //                status: "",
        //                date: "",
        //                showMsg: "在页面上显示的数据",
        //                message: "",
        //                linkTo: "##",
        //                date: "1月16日 15：23"
        //            },
        //            stepBox: {
        //                index: 2,
        //                isFirst: false,
        //                isLast: false,
        //                isActive: true,
        //                isNextActive: false
        //            }
        //        },
        //        {
        //            stepMsg: {
        //                title: "测试3",
        //                status: "",
        //                date: "",
        //                showMsg: "在页面上显示的数据333在页面上显示的数据333",
        //                message: "",
        //                linkTo: "##",
        //                date: "1月16日 15：39"
        //            },
        //            stepBox: {
        //                index: 3,
        //                isFirst: false,
        //                isLast: true,
        //                isActive: false,
        //                isNextActive: false
        //            }
        //        },
        //        {
        //            stepMsg: {
        //                title: "测试4",
        //                status: "",
        //                date: "",
        //                showMsg: "在页面上显示的数据333在页面上显示的数据333",
        //                message: "",
        //                linkTo: "##",
        //                date: "1月16日 15：39"
        //            },
        //            stepBox: {
        //                index: 4,
        //                isFirst: false,
        //                isLast: true,
        //                isActive: false,
        //                isNextActive: false
        //            }
        //        },
        //        {
        //            stepMsg: {
        //                title: "测试4",
        //                status: "",
        //                date: "",
        //                showMsg: "在页面上显示的数据333在页面上显示的数据333",
        //                message: "",
        //                linkTo: "##",
        //                date: "1月16日 15：39"
        //            },
        //            stepBox: {
        //                index: 4,
        //                currentStep: 1,
        //                isFirst: false,
        //                isLast: true,
        //                isActive: false,
        //                isNextActive: false
        //            }
        //        },
        //        {
        //            stepMsg: {
        //                title: "测试4",
        //                status: "",
        //                date: "",
        //                showMsg: "在页面上显示的数据333在页面上显示的数据333",
        //                message: "",
        //                linkTo: "##",
        //                date: "1月16日 15：39"
        //            },
        //            stepBox: {
        //                index: 4,
        //                isFirst: false,
        //                isLast: true,
        //                isActive: false,
        //                isNextActive: false
        //            }
        //        }
        //    ],
        //    currentStep: 1,
        //    notifyMsg: "注意消息"
        //};

        const {stepNotifyData} = this.props;


        return (
            <div className={styles.container}>
                {
                    stepNotifyData.map((itemData, index)=> {
                        return (
                            <StepMessageBox key={index} stepBox={itemData.stepBox}>
                                <MessageBox stepMsg={itemData.stepMsg}/>
                            </StepMessageBox>
                        )

                    })
                }


            </div>

        );
    }

}

export default StepNotifyMessageLineBox;