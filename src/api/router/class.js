const express = require('express');
const Router = express.Router();

const db = require('../db');
const tools = require('../utils');

Router.route('/')

    /*
        获取班级列表
        * city: 所在城市
        * category: 学科
	 */
    .get(async (req,res)=>{
        let city = req.query.city;
        let category = req.query.category;

        let sql = 'select * from class where ';

        if(city){
            sql += `city=${city} and `;
        }

        if(category){
            sql += `category=${category} and `;
        }

        // 避免无class_id时报错
        sql += '1=1';

        // 排序
        sql += ' order by id desc';

        let result = await db.query(sql);
        // 格式化数据
        result = tools.formatData({
            data:result
        });

        // 返回数据
        res.send(result);
    });

	


module.exports = Router;