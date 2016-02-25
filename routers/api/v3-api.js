/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var v3_API = require('../../api_server/api/v3/controllers');


/**
 * 用户信息
 */
router.get("/users/wechat/:userid", v3_API.users.getSingleUserWeChatInfo);
router.post("/users/wechat", v3_API.users.postSingleUserWeChatInfo);//通过微信新增用户到数据库中,返回uuid
//router.put("/users/wechat/:userid", v1_API.users.putSingleUserWeChatInfo);//更新某个用户的微信信息状态
//router.patch("/users/wechat/:userid", v1_API.users.patchSingleUserWeChatInfo);//更新某个用户的部分微信信息
//router.delete("/users/wechat/:userid", v1_API.users.deleteSingleUserWeChatInfo);


module.exports = router;