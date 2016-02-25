/**
 * Created by Trac on 2015/11/9.
 */
import React from "react";
import {Link} from "react-router";
import SubGoodsItem from "../subGoodsItemList/SubGoodsItem";

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
            <div>
                <div className="">
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


                            <div className="floor-itemShow">

                                <dl className="item">
                                    <dt className="img">
                                        <img src="http://cdn.o3onet.com/ff/img/510062.png" width="52"
                                             height="52"/>
                                    </dt>
                                    <dd>
                                        <p className="title t6">鲜果购</p>

                                        <p className="txt">新鲜水果，送到家</p>
                                    </dd>
                                </dl>

                                <dl className="item">
                                    <dt className="img">
                                        <img src="http://cdn.o3onet.com/ff/img/556996.png" width="52"
                                             height="52"/>
                                    </dt>
                                    <dd>
                                        <p className="title t6">美食外送</p>

                                        <p className="txt">自营各菜系美食</p>
                                    </dd>
                                </dl>

                                <dl className="item">
                                    <dt className="img">
                                        <img src="http://cdn.o3onet.com/ff/img/564012.png" width="52"
                                             height="52"/>
                                    </dt>
                                    <dd>
                                        <p className="title t6">便当</p>

                                        <p className="txt">优质，不一样的便当</p>
                                    </dd>
                                </dl>

                                <dl className="item">
                                    <dt className="img">
                                        <img src="http://cdn.o3onet.com/ff/img/1171558.png" width="52"
                                             height="52"/>
                                    </dt>
                                    <dd>
                                        <p className="title t6">品牌美食</p>

                                        <p className="txt">大品牌,大折扣</p>
                                    </dd>
                                </dl>

                            </div>

                        </div>


                    </div>

                    <div>
                        <SubGoodsItem items={}/>
                    </div>

                </div>


            </div>
        );
    }
}

export default HomePage;