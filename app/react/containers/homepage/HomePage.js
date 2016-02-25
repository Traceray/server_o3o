/**
 * Created by Trac on 2015/11/9.
 */
import React from "react";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {Link} from "react-router";

import {getGoodsItemsShowData} from "../../reducers"


import RoundHomeNav from "../../components/homeNavs/RoundHomeNav";
import ProductFloor from "../../components/productFloor/ProductFloor";
import SubGoodsItemList from "../../components/subGoodsItemList/SubGoodsItemList"
import ImgSwipeSlide from "../../components/imgSwipeSlide/ImgSwipeSlide"
import RecommendFloor from "../../components/recommendFloor/RecommendFloor"

import config from "../../config"


class HomePage extends React.Component {
    componentDidMount() {

    }

    render() {

        const styles = require("./HomePage.scss");

        //轮播图片

        const imageItems = [
            {
                link: "##",
                imgUrl: "http://cdn.o3onet.com/sylj/images/wenda_banner.png",
                itemId: "1"
            },
            {
                link: "##",
                imgUrl: "http://cdn.o3onet.com/sylj/images/site_banner.png",
                itemId: "2"
            }
        ];

        //圆形平铺导航显示的内容
        const roundCategoryItems = [
            {
                imgSrc: "http://cdn.o3onet.com/sylj/images/xinfang.png",
                title: "买新房",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "1"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/zufang.png",
                title: "找租房",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "2"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/woyaochuzu.png",
                title: "我要出租",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "3"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/woyaomaifang.png",
                title: "我要卖房",
                linkTo: config.prefixUrl + "/zaixianweituo/basic",
                itemId: "4",
            },
            {
                imgSrc: "http://cdn.o3onet.com/sylj/images/woyaodaikuan.png",
                title: "我要贷款",
                linkTo: config.prefixUrl + "/chaxunjindu",
                itemId: "5"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/fangdaijisuanqi.png",
                title: "房贷计算器",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "6"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/chafangjia.png",
                title: "查房价",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "7"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/fangchanzhishi.png",
                title: "房产知识",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "8",
            },
            {
                imgSrc: "http://cdn.o3onet.com/sylj/images/zhuangxiu.png",
                title: "装修",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "9"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/fangchanzixun.png",
                title: "房产咨询",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "10"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/jifenshangcheng.png",
                title: "积分商城",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "11"
            }, {
                imgSrc: "http://cdn.o3onet.com/sylj/images/ziyingshangcheng.png",
                title: "自营商城",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "12",
            }
        ];


        //分类导航显示的内容
        const categoryItems = [
            {
                imgSrc: "http://cdn.o3onet.com/ff/cdwj/img/logo/logo_52x52.png",
                title: "需求委托",
                subTitle: "简单配置",
                linkTo: config.prefixUrl + "/xuqiu",
                itemId: "1"
            }, {
                imgSrc: "http://cdn.o3onet.com/ff/img/556996.png",
                title: "美食外送",
                linkTo: config.prefixUrl + "/xuqiu",
                subTitle: "自营各菜系美食",
                itemId: "2"
            }, {
                imgSrc: "http://cdn.o3onet.com/ff/img/564012.png",
                title: "便当",
                linkTo: config.prefixUrl + "/xuqiu",
                subTitle: "优质，不一样的便当",
                itemId: "3"
            }, {
                imgSrc: "http://cdn.o3onet.com/ff/img/510062.png",
                title: "鲜果购",
                linkTo: config.prefixUrl + "/xuqiu",
                subTitle: "新鲜水果，送到家",
                itemId: "4",
            }
        ];

        //推荐框信息
        const recommendItemData = {
            leftInfo: {
                titleImgSrc: "data:image/png;base64,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",
                title: "",
                subTitle: "清洁 省事 美丽生活",
                detailSrc: "http://cdn.o3onet.com/ff/cdwj/img/xuanchuan/shicaibaozheng.png",
                linkTo: "ff/o3o/show/takeout/"
            },
            rightTopInfo: {
                titleImgSrc: "data:image/png;base64,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",
                title: "",
                subTitle: "新品推荐 新品推荐",
                detailSrc: "http://cdn.o3onet.com/ff/cdwj/img/xuanchuan/xinpin.png",
                linkTo: "ff/o3o/show/takeout/xinpin/1"
            },
            rightBottomInfo: {
                leftInfo: {
                    titleImgSrc: "",
                    title: "荤菜",
                    subTitle: "不可贪吃哟~",
                    detailSrc: "http://cdn.o3onet.com/ff/cdwj/img/xuanchuan/huncai.png",
                    linkTo: "ff/o3o/show/takeout/huncai/1"
                },
                rightInfo: {
                    titleImgSrc: "",
                    title: "素菜",
                    subTitle: "绿色食物 健康生活",
                    detailSrc: "http://cdn.o3onet.com/ff/cdwj/img/xuanchuan/sucai.png",
                    linkTo: "ff/o3o/show/takeout/sucai/1"
                }
            }
        }

        const {goodsItemsShowData} = this.props;


        return (
            <div>
                <div className={styles.container}>

                    <div className={styles.imageContainer}>
                        <div className={styles.seachContainer}>
                            <span className="icon-home-search"></span>
                            <input className="input" disabled="" placeholder="输入小区或商圈名开始找房咯"/>
                        </div>

                        <img src="http://cdn.o3onet.com/sylj/images/home_banner_text.png" width="210px"/>
                    </div>


                    <div className={styles.roundHomeNavContainer}>
                        <RoundHomeNav items={roundCategoryItems}></RoundHomeNav>
                    </div>

                    <div className={styles.imageGalleryContainer}>
                        <ImgSwipeSlide items={imageItems}></ImgSwipeSlide>
                    </div>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        goodsItemsShowData: getGoodsItemsShowData(state)
    }
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps)(HomePage)
