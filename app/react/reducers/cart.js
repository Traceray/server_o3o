/**
 * Created by Administrator on 2015/11/24.
 */


import {ADD_TO_CART,REMOVE_FROM_CART} from "../constants/actionsTypes";

const initialState = {
    shopingItemIds: [],
    quantityById: {}
}

function shopingItemIds(state = initialState.shopingItemIds, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.indexOf(action.goodsId) !== -1) {
                return state;
            }
            return [...state, action.goodsId];
        default :
            return state;
    }
}

function quantityById(state = initialState.quantityById, action) {
    const { goodsId } = action;
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                [goodsId]: (state[goodsId] || 0) + 1
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                [goodsId]: (state[goodsId] - 1) < 0 ? 0 : state[goodsId] - 1
            }
        default:
            return state
    }
}


export default function cart(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                shopingItemIds: shopingItemIds(state.shopingItemIds, action),
                quantityById: quantityById(state.quantityById, action)
            }
        case REMOVE_FROM_CART:
            return {
                shopingItemIds: shopingItemIds(state.shopingItemIds, action),
                quantityById: quantityById(state.quantityById, action)
            }
        default:
            return state;
    }
}

export function getTotalNum(state) {
    return getShopingItemIds(state).reduce((total, id) =>
        total + getQuantityByGoodsId(state, id),
        0
    ).toFixed(0)
}

export function getShopingItemIds(state) {
    return state.shopingItemIds
}

export function getQuantityByGoodsId(state, goodsId) {
    return state.quantityById[goodsId] || 0
}



