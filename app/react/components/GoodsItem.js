/**
 * Created by Administrator on 2015/11/15.
 */
import React from "react";

class GoodsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        //$("img.lazy").lazyload({
        //    threshold: 500
        //});

        const {incrementQuantityHandler,imgUrl,itemId} = this.props;

    }

    componentWillUnmount() {

    }

    handlerPlusClick(event) {
        event.preventDefault();

        const {incrementQuantityHandler,itemId,imgUrl} = this.props;

        incrementQuantityHandler(itemId);

        //添加到购物车动画
        var offset = $("#checkoutIcon").offset();
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        const startLeft = event.clientX - 30;
        const startTop = event.clientY - 60;
        const endLeft = offset.left - scrollLeft;
        const endTop = offset.top - scrollTop;

        //this.props.handlerPlusAnimation(imgUrl, startLeft, startTop, endLeft, endTop);

    }

    handlerMinusClick(event) {
        event.preventDefault();
        this.props.decrementQuantityHandler(this.props.itemId);
    }


    render() {
        const {imgUrl,itemName,itemId,quantity,price} = this.props;
        let showNumMinusStyle = "hide";
        (quantity >= 1) ? ( showNumMinusStyle = "show") : (showNumMinusStyle = "hide")

        return (
            <div className="productContainer" id="product">

                <div className="imgContainer">
                    <img className="lazy" src={imgUrl}/>
                </div>
                <div className="contentContainer">
                    <div className="pure-u-12-24 productIntroduce">
                        <div className="goodsName">
                                        <span>
                                            {itemName}-2-{itemId}--{quantity}
                                        </span>
                        </div>
                        <div className="price">
                                        <span className="meoneySign">
                                             ¥
                                        </span>
                                        <span className="moneyNum">
                                            {price}
                                        </span>
                        </div>
                    </div>
                    <div className="pure-u-2-24">

                    </div>
                    <div className="pure-u-10-24 quantity">
                        <a className="plusButton" onClick={this.handlerPlusClick.bind(this)}
                        ><span>+</span></a>
                        <p className="sum2">
                            <span className={"sum " + showNumMinusStyle}>
                                {quantity}
                            </span>
                        </p>
                        <a onTouchStart={this.handlerMinusClick.bind(this)}
                           className={"minusButton "+showNumMinusStyle}>－</a>
                    </div>
                </div>

            </div>
        )
            ;
    }
}

GoodsItem.propTypes = {
    itemName: React.PropTypes.string,
    price: React.PropTypes.number,
    incrementQuantityHandler: React.PropTypes.func.isRequired,
    decrementQuantityHandler: React.PropTypes.func.isRequired
};

GoodsItem.defaultProps = {
    itemName: "自餐厅",
    price: 0
};

export default  GoodsItem;