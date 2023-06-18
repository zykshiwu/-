<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];


$q="select student_checkin.student_id,student.student_name,student_checkin.checkin_status,student_checkin.year_time,student_checkin.hour_time from student_checkin,student where checkin_name='$checkin_name' and course_name='$course_name' and teacher_id='$teacher_id' and student.student_id=student_checkin.student_id";//向数据库查询表单传来的值的sql
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
