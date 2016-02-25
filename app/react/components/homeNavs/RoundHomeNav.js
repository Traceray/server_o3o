/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";

import SubRoundHomeNav  from "./SubRoundHomeNav";

//TODO::依赖Jquery

class RoundHomeNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = require("./RoundHomeNav.scss");

        return (

            <div className={styles.container}>
                <div className="pure-g">
                    {
                        this.props.items.map((item => {
                            return (
                                <SubRoundHomeNav
                                    key={item.itemId}
                                    title={item.title}
                                    imgSrc={item.imgSrc}
                                    linkTo={item.linkTo}
                                    width={item.width}
                                    height={item.height}
                                />
                            );
                        }))
                    }
                </div>
            </div>

        );
    }

}

RoundHomeNav.propTypes = {
    items: PropTypes.array
};

RoundHomeNav.defaultProps = {
    items: []
};


export default RoundHomeNav;