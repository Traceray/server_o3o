/**
 * Created by Trac on 2015/11/22.
 */

import { UPDATE_USERINFO ,UPDATE_ADDRESSINFO} from '../constants/actionsTypes'
import React from 'react/addons';
const update = React.addons.update;

const initialState = {
    userid: "",
    phoneNumber: "",
    nickName: "",
    addressInfo: {
        tel: "",
        name: "",
        address: ""
    }
}

export default function (state = initialState, action) {//main 获取
    switch (action.type) {
        case UPDATE_USERINFO :
            debugger;
            return update(state, {
                userid: {
                    $set: action.userid,
                }
            })
        case UPDATE_ADDRESSINFO :
            return update(state, {
                addressInfo: {
                    $set: action.addressInfo,
                }
            })
        default :
            return state;
    }
}

export function getUserId(state) {//获取用户id编号
    return state.userid || "";
}

export function getAddressInfo(state) {
    return state.addressInfo || {};
}

