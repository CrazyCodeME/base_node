const Joi = require('joi');

const userSchema = {
    body:{
        username: Joi.string().alphanum().min(3).max(12).required().messages({
            'string.alphanum':'用户名只能包含字母和数字',
            'string.min':'用户名不能少于3个字符',
            'string.max':'用户名不能超过12个字符',
            'string.empty':'用户名不能为空',
        }),
        password: Joi.string().pattern(/^[\S]{6,16}$/).required().messages({
            'string.empty':'密码不能为空',
        }),
    },
};
const codeSchema = {
    body:{
        mobilePhone: Joi.string().min(11).max(11).regex(/^1[3-9]\d{9}$/).message('请输入有效的手机号码'),
    },
};

exports.reg_login_schema = userSchema;
exports.reg_code_schema = codeSchema;