<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];


$delete_course="delete from course where course_name='$course_name' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
$delete_class="delete from class where course_name='$course_name' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
$delete_checkin="delete from checkin where course_name='$course_name' and teacher_id='$teacher_id'";
$delete_student_checkin="delete from student_checkin where course_name='$course_name' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
$result_course = $con->query($delete_course);
$result_class = $con->query($delete_class);
$result_checkin = $con->query($delete_checkin);
$result_student_checkin = $con->query($delete_student_checkin);// 执行 sql
// 获取执行 sql 后的返回对象
if ($result_course){
    echo "删除课程成功!";
}
$con->close();//关闭数据库
?>
