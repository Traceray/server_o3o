/**
 * Created by Administrator on 2015/11/20.
 */

import React,{Component,PropTypes} from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Link} from "react-router";

import GoBackNavbar from "../../components/navbars/goBackNavbar/GoBackNavbar";
import GoodsInfoListPage from "./GoodsInfoListPage";

import {getCategoryNames,getMinCheckoutMoney} from "../../reducers/goods"
import { getTotalPrice } from '../../reducers'
import {getTotalNum} from "../../reducers/cart"

import {numberSub} from "../../../../utils/numOperationsUtil";

import {Sticky,ScrollSpyNav,Panel} from "trace-amazeui-react";

class TakeOutPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            urls: {
                checkout: "/ff/o3o/show/checkout"
            }
        }
    }

    componentDidMount() {
        debugger;
    }

    handlerCheckout(event) {
        //this.props.history.transitionTo("/ff/huoguo/home/homePage");
        //TODO::向服务器提交订单
        //var state = {
        //    shopingItems: this.state.shopingItems,
        //    sumMoney: this.state.sumMoney,
        //    checkedItemNum: this.state.checkedItemNum
        //}
        //this.props.history.pushState(state, '/ff/o3o/show/checkout')
    }


    render() {
        const styles = require("./TakeOutPage.scss");

        const {totalNum,minCheckoutMoney,totalPrice} = this.props;
        debugger;

        const currentlyItemId = ( this.props.params.isCategory == 1) ? "category_" + this.props.params.productId : "product_" + this.props.params.productId;

        console.log(currentlyItemId);

        let checkoutBoxShowStyle = styles.hide;
        if (totalNum > 0) {
            checkoutBoxShowStyle = styles.show;
        }

        let remainLeftMoney = numberSub(minCheckoutMoney, totalPrice);
        let showCheckoutBtnStyle = styles.show; //是否显示立即下单按钮
        let showCheckoutRemainLeftStyle = styles.hide;//隐藏还剩多少元起送
        if (remainLeftMoney > 0) {
            showCheckoutBtnStyle = styles.hide;
            showCheckoutRemainLeftStyle = styles.show;
        }
        let noticeTitle = "需大约20分钟制作";

        return (
            <div>

                <GoBackNavbar history={this.props.history} title="菜到我家"/>

                <div id="goodsInfoLists" className={appStyles.container}>

                    <div className="productMainContainer">

                        <GoodsInfoListPage currentlyItemId={currentlyItemId}>
                        </GoodsInfoListPage>

                    </div>

                </div>

                {/*TODO:分离出去*/}
                <div className={styles.checkoutBox}>
                    <div className={checkoutBoxShowStyle}>
                        <div className={styles.bottom}>
                            <div className={checkoutBoxShowStyle}>

                                <div className="pure-u-18-24">
                                    <div className={styles.checkoutInfo}>

                                        <div className="pure-u-6-24">
                                            <div className={styles.checkoutIcon}>
                                                <i className={styles.iconNum}><span>{this.props.totalNum}</span></i>
                                                <i className={"iconfont icon-cart "+styles.iconfont}
                                                   id="checkoutIcon"></i>
                                            </div>
                                        </div>

                                        <div className="pure-u-9-24">
                                            <div className={styles.checkoutSumMoney}>
                                               <span className={styles.moneySign}>
                                                 ¥
                                               </span>
                                                <span className={styles.sumMoney}>
                                                    {this.props.totalPrice}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pure-u-9-24 ">
                                            <div className={styles.checkoutNotice}>
                                                <span>{noticeTitle}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="pure-u-6-24">
                                    <div className={styles.checkoutBtn}>
                                        <span className={showCheckoutBtnStyle}
                                              onClick={this.handlerCheckout.bind(this)}>
                                            <Link to={this.state.urls.checkout}>
                                                <span >去结算</span>
                                            </Link>
                                        </span>
                                        <div
                                            className={showCheckoutRemainLeftStyle}>
                                            <label>差¥{remainLeftMoney}起送</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

TakeOutPage.PropTypes = {
    //totalPrice: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    return {
        totalPrice: getTotalPrice(state),
        totalNum: getTotalNum(state.cart),
        minCheckoutMoney: getMinCheckoutMoney(state.goodsInfoLists)
    }
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps)(TakeOutPage)


