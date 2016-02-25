/**
 * Created by Tracδo3oNet on 15/7/26.
 */
import {combineReducers} from "redux";
import { routerStateReducer } from 'redux-router';

import {counter} from "./counter";
import {default as goodsInfoLists,getGoodsInfoById,getVisibleGoods,getVisibleGoodsWithCategoryNames} from "./goods";
import {default as cart,getShopingItemIds,getQuantityByGoodsId} from "./cart";
import {default as userinfo} from "./userinfo";
import {default as approvalingData} from "./approvalingData";

import {numberAdd,numberMul} from "../../../utils/numOperationsUtil";//解决浮点数运算bug

export function getTotalPrice(state) {
    return getShopingItemIds(state.cart).reduce((total, id) =>
            numberAdd(total, numberMul(getGoodsInfoById(state.goodsInfoLists, id).price, getQuantityByGoodsId(state.cart, id))),
        0
    ).toFixed(2)
}

export function getGoodsItemsShowData(state) {//获取带购物数量的完整列表,不包含分类信息
    return getVisibleGoods(state.goodsInfoLists).map((item, index) => ({
        ...getGoodsInfoById(state.goodsInfoLists, item.itemId),
        quantity: getQuantityByGoodsId(state.cart, item.itemId),
        itemSumPrice: numberMul(getGoodsInfoById(state.goodsInfoLists, item.itemId).price, getQuantityByGoodsId(state.cart, item.itemId)).toFixed(2)
    }));
}

export function getGoodsItemsShowDataWithCategoryNames(state) {//获取带购物数量的完整可见列表，包含分类信息
    return getVisibleGoodsWithCategoryNames(state.goodsInfoLists).map((item, index)=> ({
        categoryName: item.categoryName,
        categoryId: "category_" + item.categoryId,
        categoryItemData: item.categoryItemData.map((subItem, i) => ({
            ...getGoodsInfoById(state.goodsInfoLists, subItem.itemId),
            quantity: getQuantityByGoodsId(state.cart, subItem.itemId),
            itemSumPrice: numberMul(getGoodsInfoById(state.goodsInfoLists, subItem.itemId).price, getQuantityByGoodsId(state.cart, subItem.itemId)).toFixed(2)
        }))
    }));
}

export function getCartGoodsItemsShowData(state) {//获取购物列表，不带数量为0的
    return getGoodsItemsShowData(state).filter(item=> {
        return item.quantity != 0;
    });
}

export default  combineReducers({
    router: routerStateReducer,
    counter,
    goodsInfoLists,
    cart,
    userinfo,
    approvalingData
});