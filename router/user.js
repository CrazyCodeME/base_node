const express = require('express');
const expressJoi = require('@escook/express-joi');
const {reg_login_schema} = require('../schema/user');
const router = express.Router();
const userHandler = require('../router_handler/user');
router.post('/login.do', expressJoi(reg_login_schema), userHandler.login);
router.post('/register.do', expressJoi(reg_login_schema), userHandler.register);
module.exports = router;