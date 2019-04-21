/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : h5_1804

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-08-03 16:45:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` varchar(10) CHARACTER SET utf8 NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `off` decimal(10,2) DEFAULT NULL,
  `star` int(5) DEFAULT NULL,
  `commentCount` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('G001', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g1.jpg', '#', '899.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G002', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g2.jpg', '#', '698.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G003', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g3.jpg', '#', '398.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G004', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g4.jpg', '#', '998.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G005', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g5.jpg', '#', '198.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G006', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g6.jpg', '#', '6998.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G007', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g7.jpg', '#', '3998.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G008', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g8.jpg', '#', '698.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G009', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g9.jpg', '#', '1998.00', '0.20', '4', '10002');
INSERT INTO `goodslist` VALUES ('G0010', 'Thermos 膳魔�?Funtainer系列水杯 12盎司�?40g�?粉红�?', 'shoes', 'images/g10.jpg', '#', '2998.00', '0.20', '4', '10002');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 NOT NULL,
  `age` varchar(10) DEFAULT NULL,
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', 'laoxie', '18', '2018-08-03 16:29:06');
SET FOREIGN_KEY_CHECKS=1;
