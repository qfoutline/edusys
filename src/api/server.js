/*
	Nodejs express服务器
		* 用于数据接口开发
 */

const express = require('express');

// 路由模块
const router = require('./router');
const {PORT} = require('./config.json');

const app = express();

// 设置静态服务器
app.use(express.static('../'))

// 路由列表
.use('/api',router)

.use('/test',()=>{
	console.log('test')
})

// 监听端口
app.listen(PORT,()=>{
	console.log("服务器启动成功，访问地址为 http://localhost:%s", PORT);
});