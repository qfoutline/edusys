const express = require('express');
const Router = express.Router();


// 连接数据库
const db = require('../db');

const tools = require('../utils');

// import token from './tools/token';

Router.route('/')

    /*
        获取用户列表
        * [class_id]    获取某个班级学生
        * [admin]       是否管理员（管理员：user表，学生：student表）
	 */
    .get(async (req,res)=>{
        let {class_id} = req.query;

        let sql = `select id,name,class_id,before_class,suspension,regtime from `;

        if(class_id){
            sql += `student where class_id=${class_id} and `;
        }else{
            sql +=`user where`
        }


        // 避免无class_id时报错
        sql += '1=1';console.log(sql)

        let result = await db.query(sql);
        // 格式化数据
        result = tools.formatData({
            data:result
        });

        // 返回数据
        res.send(result);
    });


// 操作具体某个用户
Router.route('/:id')
    .get(async (req,res)=>{
        let {admin=false} = req.query;
        let {id} = req.query.params;
        let sql = `select * from ${admin ? 'user':'student'} where id=${id}`;

        let result = await db.query(sql);
        // 格式化数据
        result = tools.formatData({
            data:result
        });

        // 返回数据
        res.send(result);
    })


module.exports = Router;