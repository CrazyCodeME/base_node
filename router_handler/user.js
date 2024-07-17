const db = require('../db/index');
// 导入密码加密工具
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const conf = require("../config");

exports.register = (req,res)=>{
    const userInfo = req.body;
    const sqlStr = "SELECT * FROM ev_users WHERE username = ?";
    db.query(sqlStr,userInfo.username,(err,result)=>{
        if(err){
            return res.send({
                respCode:'888888',
                respMsg:err.message
            });
        }
        if(result.length>0){
            return res.send({
                respCode:'888888',
                respMsg:'该用户名已存在'
            });
        }
        // 用户名可用
      // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
      userInfo.password = bcrypt.hashSync(userInfo.password, 10);
      // 定义插入用户的sql语句
      const sql = "insert into ev_users set ?";
      db.query(
        sql,
        { username: userInfo.username, password: userInfo.password },
        (err, results) => {
          // 判断sql语句是否执行成功
          if (err) return res.send({ respCode: '888888', respMsg: err.message });
          // 判断影响行为是否为1
          if (results.affectedRows !== 1) {
            return res.send({
                respCode: '888888',
                respMsg: "注册用户失败，请稍后再试！",
            });
          }
          // 注册用户成功
          res.send({
            respCode:'000000',
            respMsg:'register OK'
          });
        }
      );
    })
};
exports.login = (req,res)=>{
  const userInfo = req.body;
  const sqlStr = "SELECT * FROM ev_users WHERE username = ?";
  db.query(sqlStr,userInfo.username,(err,result)=>{
    if(err){
      return res.send({
        respCode:'888888',
        respMsg:err.message
      });
    }
    if(result.length===0){
      return res.send({
        respCode:'888888',
        respMsg:'用户名不存在'
      });
    }
    const comparePassword = bcrypt.compareSync(userInfo.password,result[0].password);
    if(!comparePassword){
      return res.send({
        respCode:'888888',
        respMsg:'登录失败，密码错误'
      });
    }
    const user = {...result[0],password:''};
    const tokenStr = JWT.sign(user,conf.jwtSecretKey,{expiresIn:conf.expiresIn});
    res.send({
      respCode:'000000',
      respMsg:'登录成功',
      token:tokenStr,
      userInfo:user,
    })
  });
}