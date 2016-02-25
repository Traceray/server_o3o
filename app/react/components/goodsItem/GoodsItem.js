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
        const styles = require("./GoodsItem.scss");

        const {imgUrl,itemName,itemId,quantity,price} = this.props;
        let showNumMinusStyle = styles.hide;
        (quantity >= 1) ? ( showNumMinusStyle = styles.show) : (showNumMinusStyle = styles.hide)

        return (
            <div className={styles.productContainer} id={"product_"+itemId}>

                <div className={styles.imgContainer}>
                    <img className="lazy" src={imgUrl} height="250"/>
                </div>
                <div className={styles.contentContainer}>
                    <div className="pure-u-12-24">
                        <div className={styles.productIntroduce}>
                            <div className={styles.goodsName}>
                                        <span>
                                            {itemName}
                                        </span>
                            </div>
                            <div className={styles.price}>
                                        <span className={styles.meoneySign}>
                                             ¥
                                        </span>
                                        <span className={styles.moneyNum}>
                                            {price}
                                        </span>
                            </div>
                        </div>
                    </div>
                    <div className="pure-u-2-24">

                    </div>
                    <div className="pure-u-10-24">
                        <div className={styles.quantity}>
                            <a className={styles.plusButton} onClick={this.handlerPlusClick.bind(this)}
                            ><span>+</span></a>
                            <p className={styles.sum2}>
                            <span className={styles.sum+" " + showNumMinusStyle}>
                                {quantity}
                            </span>
                            </p>
                            <a onTouchStart={this.handlerMinusClick.bind(this)}
                               className={styles.minusButton+" "+showNumMinusStyle}>－</a>
                        </div>
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