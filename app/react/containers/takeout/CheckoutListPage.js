/**
 * Created by Trac on 2015/11/9.
 */
import React from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Link} from "react-router";

import GoBackNavbar from "../../components/navbars/goBackNavbar/GoBackNavbar";

import {getCartGoodsItemsShowData} from "../../reducers";
import {getAddressInfo} from "../../reducers/userinfo"
import { getTotalPrice } from '../../reducers'
import {getTotalNum} from "../../reducers/cart"


//TDOO::::这里应该摆脱微信的束缚

class CheckoutListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //choiceAddress
    }

    handlerCheckOut(event) {
        const {totalNum,addressInfo} = this.props;
        if (addressInfo.name == "") {
            alert("收货地址不能为空!");
            return;
        }
        if (totalNum <= 0) {
            alert("还没有选购物品呢!");
            return;
        }
        this.props.history.pushState(null, "/ff/o3o/show/payment");
    }


    render() {

        const styles = require("./CheckoutListPage.scss");

        const {cartGoodsItemsShowData,totalNum,totalPrice,addressInfo} = this.props;
        let showNoCheckoutStyle = (totalNum > 0) ? styles.invisible : styles.visible;
        let showCartStyle = (totalNum > 0) ? styles.visible : styles.invisible;

        let showEditAddressInfoStyle1 = (addressInfo.name != "") ? styles.invisible : "pure-u-18-24 " + styles.mainInfo;
        let showEditAddressInfoStyle2 = (addressInfo.name != "") ? "pure-u-18-24 " + styles.mainInfo : styles.invisible;
        console.log(showEditAddressInfoStyle1);
        console.log(showEditAddressInfoStyle2);


        let noticeTitle = "已经优惠3元";

        return (
            <div>
                <GoBackNavbar history={this.props.history} title="确认订单"/>

                <div className={appStyles.container}>

                    <div className={styles.container}>

                        <div id="checkoutList" className={styles.checkoutMainContainer}>

                            <div className={styles.address}>
                                <div className="pure-u-3-24">
                                    <div className={styles.location}>
                                        <i className="iconfont icon-locationfill"></i>
                                    </div>
                                </div>

                                <div className={showEditAddressInfoStyle1}>
                                    <Link to="/ff/o3o/show/choiceAddress">
                                        <div className={styles.editinfo}>

                                            请点击编辑地址

                                        </div>
                                    </Link>

                                </div>

                                <div className={showEditAddressInfoStyle2}>
                                    <div className={styles.baseinfo}>
                                        <span className={styles.name}>邵先生</span>
                                        <span className={styles.phoneNum}>15279282851</span>
                                    </div>
                                    <div className={styles.streetAddress}>辽宁省沈阳市和平区桂林街1号773室</div>
                                </div>


                                <div className="pure-u-3-24">
                                    <div className={styles.right}>
                                        <i className="iconfont icon-right"></i>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.paymentMode}>
                                <div className={styles.online}>
                                    <div className="pure-u-21-24">
                                        <span>在线支付</span>
                                    </div>
                                    <div className="pure-u-3-24">
                                        <i className="iconfont icon-roundcheck"></i>
                                    </div>
                                </div>
                                <div className={styles.cash}>
                                    <div className="pure-u-21-24">
                                        <span>货到付款</span>
                                    </div>
                                    <div className="pure-u-3-24">
                                        <i className="iconfont icon-roundcheck active"></i>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.couponSelect}>
                                <div className={styles.coupon}>
                                    <div className="pure-u-21-24">
                                        <span>红包</span>
                                    </div>
                                    <div className="pure-u-3-24 ">
                                        <div className={styles.rightIcon}>
                                            <label className="minus">-5</label>
                                            <i className="iconfont icon-right"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.member}>
                                    <div className="pure-u-21-24">
                                        <span>会员优惠</span>
                                    </div>
                                    <div className="pure-u-3-24">
                                        <div className={styles.rightIcon}>
                                            <label className="minus">-5</label>
                                            <i className="iconfont icon-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className={styles.cartList}>
                                <div className={styles.empty +" "+showNoCheckoutStyle}>
                                    购物车空空如也，请去选购再来。
                                </div>

                                <div className={styles.cartListContainer +" "+showCartStyle}>
                                    <ul>
                                        {
                                            cartGoodsItemsShowData.map((item, index)=> {
                                                return (
                                                    <li key={item.id}>
                                                        <div className="pure-u-5-24">
                                                            <img src={item.imgUrl} width="20" height="20"/>
                                                        </div>
                                                        <div className="pure-u-10-24">
                                                            <div className={styles.name}>
                                                                <span>{item.name}</span>
                                                            </div>
                                                        </div>
                                                        <div className="pure-u-4-24">
                                                            <div className={styles.quantity}>
                                                                <span>× {item.quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div className="pure-u-5-24">
                                                            <div className={styles.price}>
                                                                <span> ¥ {item.itemSumPrice}</span>
                                                            </div>
                                                        </div>

                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>

                            <div className={styles.bottomBlank}>
                                &nbsp;
                            </div>

                        </div>


                        <div className={styles.checkoutToPayBox}>

                            <div className={styles.bottom}>
                                <div className="pure-u-18-24">
                                    <div className={styles.checkoutInfo}>

                                        <div className="pure-u-2-24">
                                            <div className={styles.checkoutIcon}>

                                            </div>
                                        </div>

                                        <div className="pure-u-10-24">
                                            <div className={styles.checkoutSumMoney}>
                                                <span className={styles.moneySign}>
                                                 ¥
                                               </span>
                                                <span className={styles.sumMoney}>
                                                    {totalPrice}
                                                </span>
                                            </div>
                                        </div>


                                        <div className="pure-u-12-24">
                                            <div className={styles.checkoutNotice}>
                                                <span>{noticeTitle}</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="pure-u-6-24">
                                    <div className={styles.checkoutBtn}>
                                        <span >
                                            <a onClick={this.handlerCheckOut.bind(this)}>
                                                去结账
                                            </a>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger;
    return {
        cartGoodsItemsShowData: getCartGoodsItemsShowData(state),
        totalPrice: getTotalPrice(state),
        totalNum: getTotalNum(state.cart),
        addressInfo: getAddressInfo(state.userinfo)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //cartActions: bindActionCreators(cartActions, dispatch)
    }
}

export default connect(mapStateToProps)(CheckoutListPage)

//<div className="address">
//    <div className="pure-u-3-24 location">
//    <i className="iconfont icon-locationfill"></i>
//    </div>
//    <div className="pure-u-18-24 main-info">
//    <div className="baseinfo">
//    <span className="name">邵先生</span>
//    <span className="phoneNum">15279282851</span>
//    </div>
//    <div className="streetAddress">辽宁省沈阳市和平区桂林街1号773室</div>
//    </div>
//    <div className="pure-u-3-24 right">
//    <i className="iconfont icon-right"></i>
//    </div>
//    </div>
