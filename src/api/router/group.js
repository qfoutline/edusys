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

        let sql = `select * from class_group where `;

        if(class_id){
            sql += `class_id=${class_id} and `;
        }


        // 避免无class_id时报错
        sql += '1=1';

        let result = await db.query(sql);
        // 格式化数据
        result = tools.formatData({
            data:result
        });

        // 返回数据
        res.send(result);
    });


// 操作分组
Router.route('/:id')
    // 获取某个分组信息
    .get(async (req,res)=>{
        let {id} = req.query.params;
        let sql = `select * from class_group where id=${id}`;

        let result = await db.query(sql);
        // 格式化数据
        result = tools.formatData({
            data:result
        });

        // 返回数据
        res.send(result);
    })

    // 修改分组
    .post(async (req,res)=>{
        let {name,leader,members} = req.body;
        let sql = `update class_group set `;

        if(name){
            sql += `name='${name}' `;
        }

        if(leader){
            sql += `leader='${leader}' `;
        }

        if(members){
            sql += `members='${members}' `;
        }

        sql += `where id=${id}`;

        let result = await db.query(sql);
        // 格式化数据
        result = tools.formatData({
            data:result
        });

        // 返回数据
        res.send(result);
    })

module.exports = Router;