<?php
include('connect_db.php');//链接数据库
$checkin_name=$_POST['checkin_name'];
$course_name=$_POST['course_name'];
$teacher_name=$_POST['teacher_name'];
$teacher_id='';

//根据老师名查询出老师id
$ser_teacher_id="select teacher.teacher_id from teacher,course where teacher.teacher_id=course.teacher_id and course.course_name='$course_name' and teacher.teacher_name='$teacher_name'";
$result = $con->query($ser_teacher_id);
$obj=$result->fetch_assoc();
$teacher_id=$obj["teacher_id"];

$q="select class.course_name,class.teacher_id,student.student_id from class,student where  course_name='$course_name' and teacher_id='$teacher_id' and class.student_id=student.student_id;";//向数据库查询表单传来的值的sql
$result_q = $con->query($q);// 执行 sql
if (mysqli_num_rows($result_q) > 0){
    while($obj_q=$result_q->fetch_assoc()){
        $student_checkin_course_name=$obj_q['course_name'];
        $student_checkin_teacher_id=$obj_q['teacher_id'];
        $student_checkin_student_id=$obj_q['student_id'];
        // $insert_sql="insert into student_checkin(checkin_name,course_name,teacher_id,student_id) values('$checkin_name','$student_checkin_course_name','$student_checkin_teacher_id','$student_checkin_student_id')";
        $insert_sql="insert into student_checkin(checkin_name,course_name,teacher_id,student_id,checkin_switch) values('$checkin_name','$student_checkin_course_name','$student_checkin_teacher_id','$student_checkin_student_id','T')";
        $result_insert_q=$con->query($insert_sql);
    }
    echo '插入student_checkin成功';
}else{
    echo null;
}
$con->close();//关闭数据库
?>