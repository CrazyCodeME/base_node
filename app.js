const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const userRouter = require("./router/user");
const commonRouter = require("./router/common");
const config = require("./config");
const expressJwt = require("express-jwt");
const app = express();
app.use(expressJwt({
    secret: config.jwtSecretKey
}).unless({path: [/^\/api\//]})); // 配置白名单
app.use(express.json()); // 解析post请求
app.use(express.urlencoded({extended: false})); // 解析post请求
app.use("/api",userRouter,commonRouter);

// 错误处理中间件应放在所有路由处理之后
app.use(function(err, req, res, next) {
    if (err instanceof Joi.ValidationError) {
        // 对于Joi验证错误，返回格式化后的错误信息
        return res.status(200).send({
            respCode: '888888',
            respMsg: err.details.map(detail => detail.message).join(', ')
        });
    }
     // 捕获身份认证失败的中间件
     if (err.name === "UnauthorizedError") {
        return res.status(401).send({
            respCode: '401',
            respMsg: "身份认证失败"
        });
    }
    // 对于其他错误，隐藏具体错误信息，避免敏感信息泄露
    const errorMessage = 'Internal Server Error';
    console.error('Error:', err); // 在服务器端打印错误信息用于调试
    return res.status(500).send({
        respCode: '500',
        respMsg: errorMessage
    });
});

app.use(cors()); // 跨域
app.listen(3000, () => {
    console.log('listen 3000');
})