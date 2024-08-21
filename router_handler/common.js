const db = require("../db");
const getCode = () => {
    const code = Math.floor(Math.random() * 1000000);
    return code;
}
const insertCode = (mobilePhone,res) => {
    const sql = "insert into ev_code set ?";
    const code = getCode();
    db.query(sql, {
        mobilePhone,
        code
    }, (err, result) => {
        if (err) {
            return res.send({
                respCode: '888888',
                respMsg: err.message
            });
        }
        // 判断影响行为是否为1
        if (result.affectedRows !== 1) {
            return res.send({
                respCode: '888888',
                respMsg: "获取验证码失败，请稍后再试！",
            });
        }
        // 注册用户成功
        res.send({
            respCode: '000000',
            respMsg: '获取验证码成功',
            code: code
        });
    });
}
exports.getSmsCode = (req, res) => {
    const mobilePhone = req.body.mobilePhone;
    const sqlStr = "SELECT * FROM ev_code WHERE mobilePhone = ?";
    const sqlDel = "DELETE FROM ev_code WHERE mobilePhone = ?";
    db.query(sqlStr, mobilePhone, (err, result) => {
        if (err) {
            return res.send({
                respCode: '888888',
                respMsg: err.message
            });
        }
        if (result.length > 0) {
            db.query(sqlDel, mobilePhone, (err, result) => {
                if (err) {
                    return res.send({
                        respCode: '888888',
                        respMsg: err.message
                    });
                }
            }); //删除
        }
        insertCode(mobilePhone,res);
    })
};