/**
 * Created by o3oNet on 2015-03-29.
 * 核心引擎路由
 */
'use strict';

var express = require('express');
var router = express.Router();

var v1_API = require('../../api_server/api/v1');


/**
 * 用户信息
 */
router.get("/users/wechat/:userid", v1_API.users.getSingleUserWeChatInfo);
router.post("/users/wechat", v1_API.users.postSingleUserWeChatInfo);//通过微信新增用户到数据库中,返回uuid
router.put("/users/wechat/:userid", v1_API.users.putSingleUserWeChatInfo);//更新某个用户的微信信息状态
router.patch("/users/wechat/:userid", v1_API.users.patchSingleUserWeChatInfo);//更新某个用户的部分微信信息
router.delete("/users/wechat/:userid", v1_API.users.deleteSingleUserWeChatInfo);

/**
 * 用户基本信息
 */
router.get("/users/base_info/:userid", v1_API.users.getSingleUserBaseInfo);
router.post("/users/base_info", v1_API.users.postSingleUserBaseInfo);//通过手机号码验证新增用户到数据库中,返回uuid
router.patch("/users/base_info/:userid", v1_API.users.patchSingleUserBaseInfo);//更新某个用户的部分微信信息


/**
 *贷款审批
 */
router.get("/loanApprovals", v1_API.loanApprovals.getAllData);
router.get("/loanApprovals/ing/user_list", v1_API.loanApprovals.getUserList);//获取正在进行中的贷款审批用户列表
router.get("/loanApprovals/ing/data_list", v1_API.loanApprovals.getUsersLoanApprovalingList);//获取正在进行中的贷款审批用户列表
router.get("/loanApprovals/user_list/ids", v1_API.loanApprovals.getUserListIds);//获取贷款审批的用户IDS
router.get("/loanApprovals/:userid", v1_API.loanApprovals.getSingleUserAllData);//获取当前用户所有的审批数据


router.get("/loanApprovals/ing/:userid", v1_API.loanApprovals.getSingleUserApprovalingData);//获取当前用户正在内存中审核的数据
router.post("/loanApprovals/ing/:userid", v1_API.loanApprovals.postSingleUserNewLoanApprovals);//新增一个当前用户贷款审批数据到内存中
router.put("/loanApprovals/ing/:userid", v1_API.loanApprovals.putSingleUserApprovalingData);//更新当前用户的贷款整体审批流程的状态
router.patch("/loanApprovals/ing/:userid", v1_API.loanApprovals.patchSingleUserApprovalingData);//更新当前用户正在内存中审批流程中某步的数据
router.delete("/loanApprovals/ing/:userid", v1_API.loanApprovals.deleteSingleUserApprovalingData);//删除当前用户正在内存中审批流程中某步的数据

module.exports = router;