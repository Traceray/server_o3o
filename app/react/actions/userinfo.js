/**
 * Created by Administrator on 2015/11/20.
 */
import {UPDATE_USERINFO,UPDATE_ADDRESSINFO} from '../constants/actionsTypes.js';

export function updateUserInfo(userid) {
    debugger;
    return {
        type: UPDATE_USERINFO,
        userid
    }
}

export function updateAddressInfo(addressInfo) {
    return {
        type: UPDATE_ADDRESSINFO,
        addressInfo
    }
}


