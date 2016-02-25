/**
 * Created by Administrator on 2015/11/20.
 */

import React,{Component,PropTypes} from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import Counter from "../components/Counter";
import * as counterActions from "../actions/counter"
import * as cartActions from "../actions/cart"
import { getTotalPrice } from '../reducers'
import {getCategoryNames} from "../reducers/goods"
import {getTotalNum} from "../reducers/cart"

class CounterPage extends Component {
    render() {
        debugger;
        console.log("CounterPage Render");


        const {increment,decrement} = this.props.counterActions;
        const {addToChart} = this.props.cartActions;
        const {counter,cart,goodsInfoLists,totalPrice,totalNum,categoryNames} = this.props;
        debugger;
        const props = {
            counter,
            increment,
            decrement,
            addToChart,
            cart,
            goodsInfoLists,
            totalPrice,
            totalNum,
            categoryNames
        };
        debugger;
        return (
            <Counter {...props}></Counter>
        );
    }
}

CounterPage.PropTypes = {
    counter: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    debugger;
    return {
        counter: state.counter,
        cart: state.cart,
        goodsInfoLists: state.goodsInfoLists,
        totalPrice: getTotalPrice(state),
        totalNum: getTotalNum(state.cart),
        categoryNames: getCategoryNames(state.goodsInfoLists)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        counterActions: bindActionCreators(counterActions, dispatch),
        cartActions: bindActionCreators(cartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage)
