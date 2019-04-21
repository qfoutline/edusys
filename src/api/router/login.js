const express = require('express');
const Router = express.Router();


// 连接数据库
const db = require('../db');

const {token,formatData,md5} = require('../utils');


Router.route('/')

    /*
        获取用户列表
        * [class_id]    获取某个班级学生
        * [admin]       是否管理员（管理员：user表，学生：student表）
	 */
    .post(async (req,res)=>{
        let {username,password,class_id} = req.body;

        // 计算加密后的密码
        password = md5.md5(password);
        
        let sql = `select * from ${class_id ? 'student':'users'} where name='${username}' and password='${password}'`;
        if(class_id){
            sql += ` and class_id=${class_id}`
        }
        console.log(sql);

        let result = await db.query(sql);
        // 用户或密码不正确
        if(result.length==0){
            result = formatData({code:401,msg:'fail'})
        }else{
            // 格式化数据
            let {id,name,class_id,suspention} = result[0];
            result = formatData({
                data:{
                    id,
                    name,
                    class_id,
                    suspention,
                    admin:class_id?false:true
                },
                msg:'success',
                token:token.create(username)
            });

        }


        // 返回数据
        res.send(result);
    });

module.exports = Router;