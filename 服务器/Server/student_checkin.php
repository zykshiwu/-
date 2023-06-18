<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_name=$_POST['teacher_name'];
$student_id=$_POST['student_id'];
$year_time=$_POST['year_time'];
$hour_time=$_POST['hour_time'];

//通过老师名拿到老师id
$ser_teacher_id="select teacher.teacher_id from teacher,course where teacher.teacher_id=course.teacher_id and course.course_name='$course_name' and teacher.teacher_name='$teacher_name'";
$result = $con->query($ser_teacher_id);
$obj=$result->fetch_assoc();
$teacher_id=$obj["teacher_id"];


//查询学生是否已经签过到
$ser_student_checkin="select * from student_checkin where  course_name='$course_name' and teacher_id='$teacher_id' and student_id='$student_id' and  checkin_name='$checkin_name'";
$result_checkin = $con->query($ser_student_checkin);
$obj_checkin=$result_checkin->fetch_assoc();
$checkin_result=$obj_checkin["checkin_status"];
$checkin_result_switch=$obj_checkin["checkin_switch"];

if($checkin_result_switch=='T'){

    if($checkin_result=='已签' or $checkin_result=='请假' ){
        echo "已签";
    }
    else{
        $q="update student_checkin set checkin_status='已签',year_time='$year_time',hour_time='$hour_time' where checkin_name='$checkin_name' and course_name='$course_name' and teacher_id='$teacher_id' and student_id='$student_id'";//向数据库查询表单传来的值的sql
        $result_q = $con->query($q);// 执行 sql

        if($result_q){
            echo "签到成功";
        }

    }
}
if($checkin_result_switch=='F'){
    echo "签到已过期";
}


$con->close();//关闭数据库
?>
