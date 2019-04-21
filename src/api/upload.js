/*
	文件上传中间件
		* multer
 */

const multer = require('multer');

let storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, './uploads/');
  // },
  destination:'./uploads/',
  filename: function (req, file, cb) {
    console.log('qq:',req);
  	let fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  }
})

// 设置文件保存目录
let upload = multer({storage});

module.exports = upload;