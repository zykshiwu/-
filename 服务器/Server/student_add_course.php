<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];
$student_id=$_POST['student_id'];

$ser_q="select * from class where course_name='$course_name' and teacher_id='$teacher_id' and student_id='$student_id'";//向数据库查询表单传来的值的sql
$result = $con->query($ser_q);// 执行 sql

if (mysqli_num_rows($result) > 0){
    echo "fail";
}
else{
    $inser_q="insert into class VALUES('$course_name','$teacher_id','$student_id')";//向数据库查询表单传来的值的sql
    $result = $con->query($inser_q);
    echo "success";
    // 学生进入课程自动添加历史签到
    $ser_checkin="select checkin_name,checkin_switch from checkin where course_name='$course_name' and teacher_id='$teacher_id'";
    $result_student_checkin=$con->query($ser_checkin);
    if(mysqli_num_rows($result_student_checkin) > 0){
        while($obj_q=$result_student_checkin->fetch_assoc()){
            $checkin_name=$obj_q['checkin_name'];
            $checkin_switch=$obj_q['checkin_switch'];
            $insert_sql="insert into student_checkin(checkin_name,course_name,teacher_id,student_id,checkin_switch) values('$checkin_name','$course_name','$teacher_id','$student_id','$checkin_switch')";
            $result_insert_q=$con->query($insert_sql);
        }
    }
}
$con->close();//关闭数据库
?>
