/**
 * Created by Trac on 2015/11/22.
 */

import { UPDATE_USERINFO ,UPDATE_ADDRESSINFO} from '../constants/actionsTypes'
import React from 'react/addons';
const update = React.addons.update;

const initialState = {
    uuid: "",
    loanApprovals: {},
    userInfo: {}
}

export default function (state = initialState, action) {//main 获取
    switch (action.type) {
        default :
            return state;
    }
}

export function getUserInfo(state) {//获取用户信息
    return state.userInfo || {};
}

export function getUserId(state) {//获取用户id编号
    return state.uuid || "";
}

export function getLoanApprovalingData(state) {
    console.log(state);
    debugger;
    return state.loanApprovals.steps || [];
}

export function getLoanApprovalingNotifyData(state) {
    if (!state.loanApprovals.steps) {
        return [];
    }

    var stepNotifyData = {};

    var data = state.loanApprovals;
    stepNotifyData.title = data.title;
    stepNotifyData.type = data.type;
    stepNotifyData.stepsMsgs = [];

    var totalStepNum = data.totalStepNum;
    var currentStepIndex = data.currentStepIndex;

    data.steps.forEach(function (step, index) {
        var stepMsg = {};
        stepMsg.title = step.title;
        stepMsg.status = step.status;
        stepMsg.date = step.date;
        stepMsg.message = step.info;
        stepMsg.showMsg = step.showMsg;
        stepMsg.linkTo = step.linkTo;
        var stepBox = {};
        stepBox.index = index + 1;
        if (index == 0) {
            stepBox.isFirst = true;
        } else {
            stepBox.isFirst = false;
        }
        if (index + 1 == totalStepNum) {
            stepBox.isLast = true;
        } else {
            stepBox.isLast = false;
        }

        if (index <= currentStepIndex) {
            stepBox.isActive = true;
        } else {
            stepBox.isActive = false;
        }

        if (index + 1 <= currentStepIndex) {
            stepBox.isNextActive = true;
        } else {
            stepBox.isNextActive = false;
        }
        var stepsMsg = {
            stepMsg: stepMsg,
            stepBox: stepBox
        }
        stepNotifyData.stepsMsgs.push(stepsMsg);
    });

    return stepNotifyData.stepsMsgs;

}

