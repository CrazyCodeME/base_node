const express = require('express');
const expressJoi = require('@escook/express-joi');
const {reg_code_schema} = require('../schema/user');
const router = express.Router();
const commonHandler = require('../router_handler/common');
router.post('/getSmsCode.do', expressJoi(reg_code_schema), commonHandler.getSmsCode);
module.exports = router;