/**
 * Created by Trac on 2015/11/9.
 */
import React from "react";
import {Link} from "react-router";
import ImageGallery from "react-image-gallery";


class HomePage extends React.Component {
    componentDidMount() {
        $('#imgSwipeSlide').swipeSlide({
            lazyLoad: true,
            continuousScroll: true,
            speed: 3000,
            transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
            firstCallback: function (i, sum, me) {
                me.find('.dot').children().first().addClass('cur');
            },
            callback: function (i, sum, me) {
                me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
            }
        });
    }

    render() {

        return (
            <div className="fadeInUp animated">
                <div className="imageGalleryContain">

                    <div className="imgSwipeSlide" id="imgSwipeSlide">
                        <ul>
                            <li>
                                <a href="//m.yhd.com/">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                                        data-src="http://d10.yihaodianimg.com/V00/M03/4D/41/CgQDsVQG4d6AISZPAAFa7N3KyPY18100.jpg"
                                        alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href="//www.baidu.com/">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                                        data-src="http://d10.yihaodianimg.com/V00/M04/32/59/CgQDsVQDEtaAVv4BAAEFc6n3fws75000.jpg"
                                        alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href="//m.taobao.com/">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                                        data-src="http://d11.yihaodianimg.com/N05/M04/82/EC/CgQI01QEHoiAFBbgAAC9du5zOPc62900.jpg"
                                        alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href="//www.qq.com/">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                                        data-src="http://d10.yihaodianimg.com/N07/M09/26/8B/CgQI0FQFd8-ACrb7AADBtSan3a084000.jpg"
                                        alt=""/>
                                </a>
                            </li>
                        </ul>
                        <div className="dot">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>


                </div>

                <div className="productMainContainer">

                    <div className="productFloor">

                        <div className="floor-hotItem">

                            <dl className="bigItem">
                                <dt className="title t1">四川特色麻辣</dt>
                                <dd className="txt">醉四川</dd>
                                <dd className="img">
                                    <img src="http://p23.tuan800.net/pic/wireless__66_1446619216994.png" width="108"
                                         alt=""/>
                                </dd>
                            </dl>

                            <dl className="item">
                                <Link to="/ff/o3o/show/payment">
                                    <dt className="title t2">
                                        支付测试
                                    </dt>
                                    <dd className="txt">
                                        香菇油菜麻辣烫香菇
                                    </dd>
                                    <dd className="img">
                                        <img src="http://p23.tuan800.net/pic/wireless_dailyten_189_1447057523478.png"
                                             width="45" alt=""/>
                                    </dd>
                                </Link>
                            </dl>
                            <dl className="item">
                                <Link to="/ff/o3o/show/counter">
                                    <dt className="title t2">
                                        点餐测试页面
                                    </dt>
                                    <dd className="txt">
                                        香菇油菜麻辣烫香菇
                                    </dd>
                                    <dd className="img">
                                        <img src="http://p23.tuan800.net/pic/wireless_dailyten_189_1447057523478.png"
                                             width="45" alt=""/>
                                    </dd>
                                </Link>
                            </dl>
                            <dl className="item">
                                <Link to="/ff/huoguo/stats/">
                                    <dt className="title t2">
                                        醉麻辣戏
                                    </dt>
                                    <dd className="txt">
                                        香菇油菜麻辣烫香菇
                                    </dd>
                                    <dd className="img">
                                        <img src="http://p23.tuan800.net/pic/wireless_dailyten_189_1447057523478.png"
                                             width="45" alt=""/>
                                    </dd>
                                </Link>
                            </dl>
                            <dl className="item">
                                <Link to="/ff/o3o/show/takeOut/">
                                    <dt className="title t2">
                                        商品
                                    </dt>
                                    <dd className="txt">
                                        测试商品跳转
                                    </dd>
                                    <dd className="img">
                                        <img src="http://p23.tuan800.net/pic/wireless_dailyten_189_1447057523478.png"
                                             width="45" alt=""/>
                                    </dd>
                                </Link>
                            </dl>

                        </div>


                        <div className="floor-itemShow">

                            <dl className="item">
                                <dt className="img">
                                    <img src="http://i0.tuanimg.com/ms/zhe800m/dist/img/icon_tit6.jpg" width="52"
                                         height="52"/>
                                </dt>
                                <dd>
                                    <p className="title t6">品牌团</p>

                                    <p className="txt">大品牌,大折扣</p>
                                </dd>
                            </dl>

                            <dl className="item">
                                <dt className="img">
                                    <img src="http://i0.tuanimg.com/ms/zhe800m/dist/img/icon_tit6.jpg" width="52"
                                         height="52"/>
                                </dt>
                                <dd>
                                    <p className="title t6">品牌团</p>

                                    <p className="txt">大品牌,大折扣</p>
                                </dd>
                            </dl>

                            <dl className="item">
                                <dt className="img">
                                    <img src="http://i0.tuanimg.com/ms/zhe800m/dist/img/icon_tit6.jpg" width="52"
                                         height="52"/>
                                </dt>
                                <dd>
                                    <p className="title t6">品牌团</p>

                                    <p className="txt">大品牌,大折扣</p>
                                </dd>
                            </dl>

                            <dl className="item">
                                <dt className="img">
                                    <img src="http://i0.tuanimg.com/ms/zhe800m/dist/img/icon_tit6.jpg" width="52"
                                         height="52"/>
                                </dt>
                                <dd>
                                    <p className="title t6">品牌团</p>

                                    <p className="txt">大品牌,大折扣</p>
                                </dd>
                            </dl>

                        </div>

                    </div>


                </div>

            </div>
        );
    }
}

export default HomePage;