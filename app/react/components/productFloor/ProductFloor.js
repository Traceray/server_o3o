/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";

import SubProductFloor  from "./SubProductFloor";

//TODO::依赖Jquery

class ProductFloor extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./ProductFloor.scss");

        return (

            <div className={styles.container}>
                {
                    this.props.items.map((item => {
                        return (
                            <SubProductFloor
                                key={item.itemId}
                                title={item.title}
                                subTitle={item.subTitle}
                                imgSrc={item.imgSrc}
                                linkTo={item.linkTo}
                                width={item.width}
                                height={item.height}
                            />
                        );
                    }))
                }
            </div>

        );
    }

}

ProductFloor.propTypes = {
    items: PropTypes.array
};

ProductFloor.defaultProps = {
    items: []
};


export default ProductFloor;