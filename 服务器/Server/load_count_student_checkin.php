<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$student_id=$_POST['student_id'];

$q="select student_checkin.checkin_name,student_checkin.year_time,student_checkin.hour_time,student_checkin.checkin_status,teacher.teacher_name from student_checkin,teacher where student_checkin.course_name='$course_name' and student_checkin.student_id='$student_id' and student_checkin.teacher_id=teacher.teacher_id";//向数据库查询表单传来的值的sql
$result_q = $con->query($q);// 执行 sql
$list=array();
// 获取执行 sql 后的返回对象
if (mysqli_num_rows($result_q) > 0){
    while($obj_q=$result_q->fetch_assoc()){
        array_push($list,$obj_q);
    }
    echo json_encode($list);
}else{
    echo null;
}
$con->close();//关闭数据库
?>
