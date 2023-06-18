<?php
include('connect_db.php');//链接数据库

$student_id=$_POST['student_id'];
$student_password=$_POST['student_password'];
$student_name=$_POST['student_name'];
$sex=$_POST['sex'];
$class=$_POST['class'];
$pro=$_POST['pro'];

$q="insert into student VALUES('$student_id','$student_password','$student_name','$sex','$class','$pro')";
$reslut=$con->query($q);//执行sql

if (!$reslut){
    echo "注册失败";
}else{
    echo "注册成功";
}
$con->close()//关闭数据库
?>
