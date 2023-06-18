<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$address=$_POST['address'];
$time=$_POST['time'];
$jx=$_POST['jx'];
$teacher_id=$_POST['teacher_id'];

$q="insert into course VALUES('$course_name','$address','$time','$jx','$teacher_id')";//向数据库查询表单传来的值的sql
$result = $con->query($q);// 执行 sql

if ($result){
    echo "添加成功";
}else{
    echo null;
}
$con->close();//关闭数据库
?>
