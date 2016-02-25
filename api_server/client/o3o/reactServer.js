/**
 * Created by Administrator on 2015/11/19.
 */

/**
 * 添加React组件支持
 */

var EventProxy = require("eventproxy");

var reactServer = require("../../../app/react/server");

var func = require("../../func");

exports.oauth = function (req, res, next) {

    var ep = new EventProxy();

    ep.fail(function (err) {
        console.error(" @@@-- 获取页面信息时失败 --@@@ ");
        console.error(err);
        res.send(" @@@-- 获取页面信息时失败 --@@@ " + err.toString());
    });

    ep.all("getSingleUserApprovalingData", function (a, b) {

        const initialState = {
            counter: {
                counter: 123
            },
            goodsInfoLists: {
                goodsName: "o3oRest",
                updateTime: "",
                sortName: "",
                filterName: "",
                minCheckoutMoney: 50,
                goodsItems: [
                    {
                        categoryName: "绞车系列",
                        categoryId: "jiaoche",
                        categoryItemData: [
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20153289351.jpg",
                                name: "JTP型矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 1,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242615217.jpg",
                                name: "JTK型矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 2,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2015327153658.jpg",
                                name: "JT型矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 3,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20124279651.jpg",
                                name: "JTB防爆矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 4,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012426153032.jpg",
                                name: "2JTP型矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 5,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242615362.jpg",
                                name: "JD型矿用调度绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 6,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242784319.jpg",
                                name: "2DPJ系列耙矿绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 7,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242793026.jpg",
                                name: "JD系列防爆矿用调度绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 8,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20124279651.jpg",
                                name: "JTB防爆矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 9,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20124279651.jpg",
                                name: "JTB防爆矿用提升绞车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 10,
                                visible: true
                            }
                        ]
                    },
                    {
                        categoryName: "风机系列",
                        categoryId: "fengji",
                        categoryItemData: [
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201493124014.jpg",
                                name: "新一代DK系列矿用节能风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 11,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20149313648.jpg",
                                name: "FBCZ（FYCZ）系列煤矿地面用防爆(非防爆)抽出式轴流通风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 12,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201493125019.jpg",
                                name: "FBCDZ（FYCDZ）系列矿用防爆(非防爆)抽出式对旋轴流通风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 13,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012426164421.jpg",
                                name: "K40.K45系列矿用节能抽出式轴流通风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 14,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20149416815.jpg",
                                name: "YBT、JBT(YT)系列隔爆(非隔爆)压入式轴流局部通风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 15,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201493133620.jpg",
                                name: "FKZ（K40、K45）系列矿井轴流式风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 16,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201493151815.jpg",
                                name: "FBD（FYD）系列矿用隔爆(非隔爆)压入式对旋轴流局部通风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 17,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20149315736.jpg",
                                name: "KCS系列矿用湿式除尘风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 18,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20149416815.jpg",
                                name: "YBT、JBT(YT)系列隔爆(非隔爆)压入式轴流局部通风机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 19,
                                visible: true
                            }
                        ]
                    },
                    {
                        categoryName: "其他",
                        categoryId: "qita",
                        categoryItemData: [
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012426151532.jpg",
                                name: "KFU系列翻斗式矿车（矿用翻斗式矿车）",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 20,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012426154542.jpg",
                                name: "立式粉碎机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 21,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012427101940.jpg",
                                name: "PC型锤式破碎机",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 22,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012427124750.jpg",
                                name: "材料车",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 23,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242783945.jpg",
                                name: "各类车下角",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 24,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/20124712853.jpg",
                                name: "风筒布",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 25,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242783537.jpg",
                                name: "矿车对轮",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 26,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201592413403.jpg",
                                name: "矿车碰头",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 27,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242710223.jpg",
                                name: "矿用托滚（地轮）及立轮",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 28,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/201242710178.jpg",
                                name: "三环链、矿车插销",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 29,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2015327161529.jpg",
                                name: "天轮",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 30,
                                visible: true
                            },
                            {
                                imgUrl: "http://cdn.o3onet.com/smksjx/images/2012427104156.jpg",
                                name: "洗瓶刷",
                                description: "",
                                detailDescription: "",
                                price: 29,
                                prePrice: 35,
                                itemId: 31,
                                visible: true
                            }
                        ]
                    }
                ]
            }
        }

        initialState.approvalingData = a;

        //userInfo.wechatInfo = a;
        reactServer.reactServer(req, res, initialState);

    });

    var uuid = req.session.uuid;

    console.log("reactServer uuid -- " + uuid);

    if (uuid) {
        func.getSingleUserApprovalingData(
            {
                uuid: uuid
            }, function (err, jsonObj) {
                if (err) ep.emit("error", err);
                if (err) return;
                ep.emit("getSingleUserApprovalingData", jsonObj);
            }
        );
    } else {
        ep.emit("getSingleUserApprovalingData", {
            uuid: "",
            loanApprovals: {},
            userInfo: {}
        });
    }


}



