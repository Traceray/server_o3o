/**
 * Created by Trac on 2015/12/8.
 */
import React ,{Component,PropTypes} from "react";

import SubGoodsItem from "./SubGoodsItem";

class SubGoodsItemList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./SubGoodsItemList.scss");

        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <span>菜到我家精选菜品</span>
                </div>
                {
                    this.props.goodsItemsShowData.map((itemData, index) => {
                        return (
                            <SubGoodsItem
                                key={itemData.itemId}
                                itemId={itemData.itemId}
                                itemName={itemData.name}
                                price={itemData.price}
                                imgUrl={itemData.imgUrl}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

SubGoodsItemList.propTypes = {
    goodsItemsShowData: PropTypes.array
};

SubGoodsItemList.defaultProps = {
    goodsItemsShowData: []
};

export default SubGoodsItemList;

