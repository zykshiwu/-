<?php
include('connect_db.php');//链接数据库
$student_id=$_POST['student_id'];
$student_name=$_POST['student_name'];
$class=$_POST['class'];
$phone=$_POST['phone'];
$teacher_name=$_POST['teacher_name'];
$begin_year_time=$_POST['begin_year_time'];
$end_year_time=$_POST['end_year_time'];
$create_year_time=$_POST['create_year_time'];
$remarks=$_POST['remarks'];
$teacher_id='';

$ser_teacher_id="select teacher_id from teacher where teacher_name='$teacher_name'";
$result = $con->query($ser_teacher_id);
$obj=$result->fetch_assoc();
$teacher_id=$obj["teacher_id"];

$q="insert into ask_for_leave(student_id,student_name,class,phone,begin_year_time,end_year_time,teacher_id,create_year_time,remarks) VALUES('$student_id','$student_name','$class','$phone','$begin_year_time','$end_year_time','$teacher_id','$create_year_time','$remarks')";//向数据库查询表单传来的值的sql
$result_q = $con->query($q);// 执行 sql
if($result_q){
    echo "添加假条成功";
}else{
    return null;
}
$con->close();//关闭数据库
?>