/**
 * Created by Trac on 2015/11/22.
 */

import { UPDATE_GOODSINFO } from '../constants/actionsTypes'

const initialState = {
    goodsName: "o3oCan",
    updateTime: "",
    sortName: "",
    filterName: "",
    goodsItems: []
}

export default function (state = initialState, action) {//main 获取
    switch (action.type) {
        case UPDATE_GOODSINFO :
            return action.goodsInfo;
        default :
            return state;
    }
}

export function getVisibleGoods(state) {
    let visibleGoods = [];
    state.goodsItems.map(function (item, index) {
        item.categoryItemData.map(function (subItem, i) {
            if (subItem.visible) {
                visibleGoods.push(subItem);
            }
        });
    });
    return visibleGoods;
}

export function getVisibleGoodsWithCategoryNames(state) {
    let visibleGoodssWithCategoryNames = [];

    state.goodsItems.map(function (item, index) {
        let categoryData = {
            categoryName: item.categoryName,
            categoryId: item.categoryId,
            categoryItemData: []
        };
        item.categoryItemData.map(function (subItem, i) {
            if (subItem.visible) {
                categoryData.categoryItemData.push(subItem);
            }
        });
        visibleGoodssWithCategoryNames.push(categoryData);
    });
    return visibleGoodssWithCategoryNames;
}

export function getCategoryNames(state) {//获取各种商品类别名
    console.log(state);
    let categoryNames = [];
    state.goodsItems.map(function (item, index) {
        categoryNames.push(item.categoryName);
    });
    return categoryNames;
}

export function getMinCheckoutMoney(state) {//获取最低配送钱数
    return state.minCheckoutMoney || 0;
}


export function getGoodsInfoById(state, goodsId) {//根据id获取商品信息
    let goodsItemInfo = {};

    //TODO:;修改这里，（影响性能 done）,试试看兼容性

    loop1:for (var item in  state.goodsItems) {
        for (var subItem in  state.goodsItems[item].categoryItemData) {
            if (state.goodsItems[item].categoryItemData[subItem].itemId == goodsId) {
                goodsItemInfo = state.goodsItems[item].categoryItemData[subItem];
                break loop1;
            }
        }
    }

    return goodsItemInfo;

}
