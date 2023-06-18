<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$teacher_name=$_POST['teacher_name'];
$teacher_id='';

$ser_teacher_id="select teacher.teacher_id from teacher,course where teacher.teacher_id=course.teacher_id and course.course_name='$course_name' and teacher.teacher_name='$teacher_name'";
$result = $con->query($ser_teacher_id);
$obj=$result->fetch_assoc();
$teacher_id=$obj["teacher_id"];


$q="select * from checkin where  course_name='$course_name' and teacher_id='$teacher_id' ORDER BY year_time,hour_time asc";//向数据库查询表单传来的值的sql
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
