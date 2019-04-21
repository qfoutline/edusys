const crypto = require('crypto'); //加载加密文件



module.exports = {
    //加密
    md5(str){
        const md5 = crypto.createHash('md5'); 
        return md5.update(str).digest('hex');
    }
}