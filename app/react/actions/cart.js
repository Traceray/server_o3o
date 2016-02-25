/**
 * Created by Administrator on 2015/11/20.
 */
import {ADD_TO_CART, REMOVE_FROM_CART} from '../constants/actionsTypes.js';

export function incrementQuantity(goodsId) {
    debugger;
    return {
        type: ADD_TO_CART,
        goodsId
    }
}

export function decrementQuantity(goodsId) {
    return {
        type: REMOVE_FROM_CART,
        goodsId
    }
}

