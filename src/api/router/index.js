const express = require('express');
const Router = express.Router();

// 处理传入参数
const bodyParser = require('body-parser');
// format applicatioin/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// format application/json
const jsonParse = bodyParser.json();

const classRouter = require('./class');
const userRouter = require('./user');
const groupRouter = require('./group');
const loginRouter = require('./login');
const tokenverifyRouter = require('./tokenverify');
const {verify,create} = require('../utils/token');

// 运用跨域的中间件
Router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.sendStatus(200);/*让options请求快速返回*/
    } else{
      //验证每个请求的token是否过期
      let Authorization = req.header('Authorization');
      let token,username;
      if(Authorization){
        [username,token] = Authorization.split('|')
      }
      if(token && !verify(token)){
        // 生成新的token
        token = create(username);
        res.setHeader('Authorization',token);
      }

      next();
    }
});



// 利用body-parser格式化前端传入的参数
Router.use(urlencodedParser, jsonParse);

// 关于班级
Router.use('/class',classRouter);

// 关于用户
Router.use('/user',userRouter);

// 关于分组
Router.use('/group',groupRouter);

// 登录接口（token生成接口）
Router.use('/login', loginRouter);

// token验证接口
Router.use('/tokenverify', tokenverifyRouter);

module.exports = Router;