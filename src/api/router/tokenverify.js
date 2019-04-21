const express = require('express');
const Router = express.Router();



const {token:{verify},formatData} = require('../utils');

// 处理token验证
Router.use((req, res, next) => {
    // 获取请求头中的token
    let token = req.header('token');
    if (verify(token)) {
        // next();
        res.send(formatData());//{data:[],code:200}
    } else {
        res.send(formatData({ code: 401 }));//{data:[],code:401}
    }
});

module.exports = Router;