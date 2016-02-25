/**
 * Created by Administrator on 2015/11/15.
 */
import React,{Component,PropTypes} from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";

import GoodsItem from "../../components/goodsItem/GoodsItem";
import {cartActions} from "../../actions"
import {getGoodsItemsShowData,getGoodsItemsShowDataWithCategoryNames} from "../../reducers"

import {Sticky,ScrollSpyNav,Panel} from "trace-amazeui-react";
import {getCategoryNames} from "../../reducers/goods";

import SmoothScrollMixin from "trace-amazeui-react/lib/mixins/SmoothScrollMixin"
import domUtils from "trace-amazeui-react/lib/utils/domUtils"

class GoodsItemListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null
        }
    }

    componentDidMount() {
        //TODO::点击之后再从服务端加载
        var targetNode = document.getElementById(this.props.currentlyItemId + "");
        setTimeout(function () {
            SmoothScrollMixin.smoothScroll(window, {
                position: domUtils.offset(targetNode).top - 50,
                speed: 1200
            });
        }, 300);

    }

    componentWillUnmount() {

    }


    render() {

        const styles = require("./GoodsInfoListPage.scss");

        const {incrementQuantity,decrementQuantity} = this.props.cartActions;

        if (this.state.loading) {
            return <label>加载中...</label>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        } else {
            return (
                <div>

                    <div className={styles.scrollspyNavContanier}>
                        <Sticky>
                            <ScrollSpyNav offsetTop={50}>
                                <div className="scrollspy-nav-contanier">
                                    {/* <a className="mui-scroll-spy-btn"></a>*/}
                                    <nav className="scrollspy-nav" data-am-scrollspy-nav="{offsetTop: 45}"
                                         data-am-sticky>
                                        <ul>
                                            {
                                                this.props.goodsItemsShowDataWithCategoryNames.map((itemData, index) => {
                                                    return (
                                                        <li key={itemData.categoryId}>
                                                            <a href={"#"+itemData.categoryId}>{itemData.categoryName}</a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </ScrollSpyNav>
                        </Sticky>
                    </div>

                    <div className={styles.goodsItemsShow}>
                        {
                            this.props.goodsItemsShowDataWithCategoryNames.map((itemData, index) => {
                                return (
                                    <Panel id={""+itemData.categoryId} key={itemData.panelId}>
                                        <div className={styles.goodsItemContainer}>
                                            <div className={styles.categoryNameContainer}>
                                                <div className={styles.categoryName}>
                                                    <span>{itemData.categoryName}</span>
                                                </div>
                                            </div>
                                            {
                                                itemData.categoryItemData.map((itemData, index) => {
                                                    return (
                                                        <GoodsItem
                                                            key={itemData.itemId}
                                                            itemId={itemData.itemId}
                                                            itemName={itemData.name}
                                                            price={itemData.price}
                                                            imgUrl={itemData.imgUrl}
                                                            quantity={itemData.quantity}
                                                            incrementQuantityHandler={incrementQuantity}
                                                            decrementQuantityHandler={decrementQuantity}
                                                            handlerPlusAnimation={this.handlerPlusAnimation}
                                                        />
                                                    );
                                                })
                                            }
                                        </div>
                                    </Panel>
                                )
                            })
                        }
                    </div>

                    <div className={styles.bottomBlank}>
                        &nbsp;
                    </div>

                </div>
            )
        }


    }
}


GoodsItemListPage.PropTypes = {
    //counter: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    debugger;
    debugger;
    return {
        goodsItemsShowData: getGoodsItemsShowData(state),
        goodsCategoryNames: getCategoryNames(state.goodsInfoLists),
        goodsItemsShowDataWithCategoryNames: getGoodsItemsShowDataWithCategoryNames(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cartActions: bindActionCreators(cartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsItemListPage)

