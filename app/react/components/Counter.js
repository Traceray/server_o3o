/**
 * Created by Administrator on 2015/11/20.
 */
import React ,{Component,PropTypes} from "react"
import {Link} from "react-router"
import {getGoodsInfoById} from "../reducers/goods";

let countApp = 0;
class Counter extends Component {
    render() {
        debugger;
        const {increment,decrement,counter,addToChart,clickHandler,cart,totalNum,totalPrice} = this.props;
        countApp += 1;
        return (
            <div>
                <Link to='/ff/o3o/show/lux'>
                    自餐厅-火锅
                </Link>
                Clicked:{counter.counter} times
                {''}
                <button onClick={increment}>+</button>
                {''}
                <button onClick={decrement}>+</button>
                {''}
                <button onClick={() => {addToChart(countApp)}}>+
                </button>
                <button onClick={this.handler.bind(this)}>+
                </button>
                totalNumbers:{totalNum},,,,
                totalPrice:{totalPrice},,,,
                {
                    this.props.categoryNames.map((itemData, index) => {
                        return (
                            <label>{itemData}--</label>
                        )
                    })
                }
            </div>
        );
    }

    handler() {
        debugger;
        var goodsInfo = getGoodsInfoById(this.props.goodsInfoLists, 3);
    }

}

Counter.propTypes = {
    //increment: PropTypes.func.isRequired,
    //decrement: PropTypes.func.isRequired,
    //counter: PropTypes.number.isRequired
}

export default Counter;