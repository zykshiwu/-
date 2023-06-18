<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];


$delete_checkin="delete from checkin where checkin_name='$checkin_name' and course_name='$course_name' and teacher_id='$teacher_id'";
$delete_student_checkin="delete from student_checkin where checkin_name='$checkin_name' and course_name='$course_name' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql

$result_checkin = $con->query($delete_checkin);
$result_student_checkin = $con->query($delete_student_checkin);// 执行 sql
// 获取执行 sql 后的返回对象
if ($result_checkin){
    echo "删除签到成功!";
}
$con->close();//关闭数据库
?>
