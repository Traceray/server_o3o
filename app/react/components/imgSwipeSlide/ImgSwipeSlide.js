/**
 * Created by Tarc on 2015/12/8.
 */

import React ,{Component,PropTypes} from "react";

//TODO::依赖Jquery

var styles = require("./ImgSwipeSlide.scss");

class ImgSwipeSlide extends React.Component {
    componentDidMount() {
        $('#imgSwipeSlide').swipeSlide({
            lazyLoad: true,
            continuousScroll: true,
            speed: 3000,
            transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
            firstCallback: function (i, sum, me) {
                me.find("." + styles.dot).children().first().addClass(styles.cur);
            },
            callback: function (i, sum, me) {
                me.find("." + styles.dot).children().eq(i).addClass(styles.cur).siblings().removeClass(styles.cur);
            }
        });
    }

    render() {

        return (
            <div className={styles.container}>
                <div className={styles.imgSwipeSlide} id="imgSwipeSlide">
                    <ul>
                        {
                            this.props.items.map(item=> {
                                return (
                                    <li key={item.itemId}>
                                        <a href={item.link}>
                                            <img
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                                                data-src={item.imgUrl}
                                                height="120"
                                                alt=""/>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.dot}>
                        {
                            this.props.items.map(item=> {
                                return (
                                    <span key={item.itemId}></span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default ImgSwipeSlide;

//<div className={styles.dot}>
//    {
//        this.props.items.map(item=> {
//            return (
//                <span key={item.itemId}></span>
//            )
//        })
//    }
//</div>