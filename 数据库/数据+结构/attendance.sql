/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : attendance

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 03/04/2023 22:27:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ask_for_leave
-- ----------------------------
DROP TABLE IF EXISTS `ask_for_leave`;
CREATE TABLE `ask_for_leave`  (
  `askforleave_no` int(0) NOT NULL AUTO_INCREMENT,
  `student_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `begin_year_time` date NOT NULL,
  `end_year_time` date NOT NULL,
  `teacher_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_year_time` date NOT NULL,
  `remarks` char(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `askforleave_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`askforleave_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20241 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ask_for_leave
-- ----------------------------
INSERT INTO `ask_for_leave` VALUES (20235, '23', '1', '19软工', '12345678', '2022-11-01', '2022-12-01', '123', '2022-11-15', '病假，回家休养', '批准');
INSERT INTO `ask_for_leave` VALUES (20236, '1920168046', '曾永康', '19软工', '45555', '2022-11-01', '2022-12-01', '5678', '2022-11-15', '回家', '拒绝');
INSERT INTO `ask_for_leave` VALUES (20237, '23', '1', '19软工', '2222', '2022-11-01', '2022-12-01', '123', '2022-11-17', '22', '批准');
INSERT INTO `ask_for_leave` VALUES (20238, '23', '1', '19软工', '8888', '2022-11-01', '2022-12-01', '123', '2022-11-17', '28888', '拒绝');
INSERT INTO `ask_for_leave` VALUES (20239, '1920168046', '曾永康', '19软工', '110', '2022-11-01', '2022-12-01', '5678', '2022-11-17', '鸡你太美', '拒绝');
INSERT INTO `ask_for_leave` VALUES (20240, '1999', '曾永康', '21计科一班', '13231231', '2023-03-04', '2023-03-06', '1010', '2023-03-04', '病假', '拒绝');

-- ----------------------------
-- Table structure for checkin
-- ----------------------------
DROP TABLE IF EXISTS `checkin`;
CREATE TABLE `checkin`  (
  `checkin_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year_time` date NOT NULL,
  `hour_time` time(0) NOT NULL,
  `checkin_switch` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`checkin_name`, `course_name`, `teacher_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of checkin
-- ----------------------------
INSERT INTO `checkin` VALUES ('1', 'test', 'teacher', '2023-03-20', '21:04:47', 'F');
INSERT INTO `checkin` VALUES ('1', '软件工程', 'lwc', '2023-03-07', '09:49:58', 'T');
INSERT INTO `checkin` VALUES ('2', '软件工程', 'lwc', '2023-03-07', '09:50:01', 'T');
INSERT INTO `checkin` VALUES ('3', '软件工程', 'lwc', '2023-03-07', '09:50:02', 'T');
INSERT INTO `checkin` VALUES ('系统分析第一次签到', '系统分析', 'lwc', '2023-04-02', '22:09:01', 'T');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `course_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`course_name`, `student_id`, `teacher_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('test', 'teacher', 'test');
INSERT INTO `class` VALUES ('系统分析', 'lwc', 'test');
INSERT INTO `class` VALUES ('软件工程', 'lwc', '1920168046');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `course_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `jx` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`course_name`, `teacher_id`) USING BTREE,
  INDEX `course_name`(`course_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('test', '111', '周五', '3-4', 'teacher');
INSERT INTO `course` VALUES ('系统分析', '3教306', '周四', '3-5', 'lwc');
INSERT INTO `course` VALUES ('软件工程', '2实203', '周一', '1-2', 'lwc');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `student_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_password` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_name` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pro` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`student_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1920168045', '123', '曾永建11', '男', '19软工', '学生');
INSERT INTO `student` VALUES ('1920168046', '123', '曾永康', '男', '19软工', '学生');
INSERT INTO `student` VALUES ('1999', '123', '曾永康', '男', '21计科一班', '学生');
INSERT INTO `student` VALUES ('23', '1', '1', '男', '19软工', '学生');
INSERT INTO `student` VALUES ('2333', '23', '永强', '男', '19计算机科学', '学生');
INSERT INTO `student` VALUES ('369', '369', '369牛局长', '男', '21软工一班', '学生');
INSERT INTO `student` VALUES ('888', '8', '龟田', '男', '2333', '学生');
INSERT INTO `student` VALUES ('test', '123', 'zyk', '男', '软工', '学生');

-- ----------------------------
-- Table structure for student_checkin
-- ----------------------------
DROP TABLE IF EXISTS `student_checkin`;
CREATE TABLE `student_checkin`  (
  `checkin_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_name` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `checkin_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '未签',
  `year_time` date NULL DEFAULT NULL,
  `hour_time` time(0) NULL DEFAULT NULL,
  `checkin_switch` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_checkin
-- ----------------------------
INSERT INTO `student_checkin` VALUES ('1', '软件工程', 'lwc', '1920168046', '已签', '2023-04-02', '22:04:04', 'T');
INSERT INTO `student_checkin` VALUES ('2', '软件工程', 'lwc', '1920168046', '未签', NULL, NULL, 'T');
INSERT INTO `student_checkin` VALUES ('3', '软件工程', 'lwc', '1920168046', '未签', NULL, NULL, 'T');
INSERT INTO `student_checkin` VALUES ('1', 'test', 'teacher', 'test', '未签', NULL, NULL, 'F');
INSERT INTO `student_checkin` VALUES ('系统分析第一次签到', '系统分析', 'lwc', 'test', '未签', NULL, NULL, 'T');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `teacher_id` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_password` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teacher_name` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pro` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1010', '1010', '袁世凯', '女', '教师');
INSERT INTO `teacher` VALUES ('111', '1', '吴彦祖', '男', '教师');
INSERT INTO `teacher` VALUES ('123', '123', '吴攀123', '男', '教师');
INSERT INTO `teacher` VALUES ('123456', '123', 'gg思密达', '男', '教师');
INSERT INTO `teacher` VALUES ('231', '33', '谢广坤', '男', '教师');
INSERT INTO `teacher` VALUES ('5678', '6', '蔡徐坤', '男', '教师');
INSERT INTO `teacher` VALUES ('8888', '8', '吴攀123(1)', '女', '教师');
INSERT INTO `teacher` VALUES ('99999', '32', '213', '男', '教师');
INSERT INTO `teacher` VALUES ('lwc', 'lwc', '刘文超', '男', '教师');
INSERT INTO `teacher` VALUES ('teacher', '123', 'teacher', '男', '教师');

SET FOREIGN_KEY_CHECKS = 1;
