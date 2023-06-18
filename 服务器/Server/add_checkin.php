<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_name=$_POST['teacher_name'];
$year_time=$_POST['year_time'];
$hour_time=$_POST['hour_time'];
$teacher_id='';

$ser_teacher_id="select teacher.teacher_id from teacher,course where teacher.teacher_id=course.teacher_id and course.course_name='$course_name' and teacher.teacher_name='$teacher_name'";
$result = $con->query($ser_teacher_id);
$obj=$result->fetch_assoc();
$teacher_id=$obj["teacher_id"];

// 判断班级人数是不是0个，如果是0不给签到
$ser_class_num="select * from class where course_name='$course_name' and teacher_id='$teacher_id' ";
$result_ser_class_num=$con->query($ser_class_num);

if(mysqli_num_rows($result_ser_class_num) > 0){
    // $q="insert into checkin VALUES('$checkin_name','$course_name','$teacher_id','$year_time','$hour_time')";//向数据库查询表单传来的值的sql
    $q="insert into checkin VALUES('$checkin_name','$course_name','$teacher_id','$year_time','$hour_time','T')";
    $result_q = $con->query($q);
    if($result_q){
        echo "新建签到成功";
    }else{
        echo "签到名重复";
    }
}
else{
    echo "无学生在班级里";
}
$con->close();//关闭数据库
?>