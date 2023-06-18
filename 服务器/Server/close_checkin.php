<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];
$checkin_switch=$_POST['checkin_switch'];

//更新签到名表
$upd_q_1="update checkin set checkin_switch='$checkin_switch' where checkin_name='$checkin_name' and course_name='$course_name' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
$result_1 = $con->query($upd_q_1);
//更新签到表
$upd_q="update student_checkin set checkin_switch='$checkin_switch' where checkin_name='$checkin_name' and course_name='$course_name' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
$result = $con->query($upd_q);// 执行 sql

if ($result){
    echo "关闭签到成功";
}
$con->close();//关闭数据库
?>
