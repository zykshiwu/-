<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];
$student_id=$_POST['student_id'];
$checkin_status=$_POST['checkin_status'];
$year_time=$_POST['year_time'];
$hour_time=$_POST['hour_time'];

$ser_student_checkin_status="select * from student_checkin where checkin_name='$checkin_name' and course_name='$course_name' and student_id='$student_id' and teacher_id='$teacher_id'";
$result_ser_student_checkin_status = $con->query($ser_student_checkin_status);
$obj=$result_ser_student_checkin_status->fetch_assoc();
if($obj["checkin_status"]=='已签'){
    if($checkin_status=='已签'){
        echo '已签';
    }
    else{
        $upd_q="update student_checkin set checkin_status='$checkin_status',year_time=null,hour_time=null where checkin_name='$checkin_name' and course_name='$course_name' and student_id='$student_id' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
        $result = $con->query($upd_q);
        echo '修改签到状态成功1';
    }  
}
if($obj["checkin_status"]=='未签'){
    if($checkin_status=='未签'){
        echo '未签';
    }
    if($checkin_status=='已签'){
        $upd_q="update student_checkin set checkin_status='$checkin_status',year_time='$year_time',hour_time='$hour_time' where checkin_name='$checkin_name' and course_name='$course_name' and student_id='$student_id' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
        $result = $con->query($upd_q);
        echo '修改签到状态成功2';
    }
    if($checkin_status=='请假'){
        $upd_q="update student_checkin set checkin_status='$checkin_status',year_time=null,hour_time=null where checkin_name='$checkin_name' and course_name='$course_name' and student_id='$student_id' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
        $result = $con->query($upd_q);
        echo '修改签到状态成功11';
    }
}

if($obj["checkin_status"]=='请假'){
    if( $checkin_status=='请假'){
        echo '请假';
    }
    if($checkin_status=='已签'){
        $upd_q="update student_checkin set checkin_status='$checkin_status',year_time='$year_time',hour_time='$hour_time' where checkin_name='$checkin_name' and course_name='$course_name' and student_id='$student_id' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
        $result = $con->query($upd_q);
        echo '修改签到状态成功2';
    }
    if($checkin_status=='未签'){
        $upd_q="update student_checkin set checkin_status='$checkin_status',year_time=null,hour_time=null where checkin_name='$checkin_name' and course_name='$course_name' and student_id='$student_id' and teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
        $result = $con->query($upd_q);
        echo '修改签到状态成功111';
    }
}

$con->close();//关闭数据库
?>
