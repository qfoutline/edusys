/*
	连接数据库
		* 
 */

const mysql = require('mysql');

const config = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'edusys'
}



module.exports = {
  connect(){
    let connection = mysql.createConnection(config);
    connection.connect(res=>{
      console.log('mysql service connect success!')
    });
    return connection
  },
  query(sql){
    let connection = this.connect();
    return new Promise((resolve,reject)=>{
      connection.query(sql,(err,data)=>{
        if(err) return reject(err);
        resolve(data);

        connection.end();
      })
    })
  }
}