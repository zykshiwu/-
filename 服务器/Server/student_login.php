<?php
include('connect_db.php');//链接数据库
$student_id=$_POST['student_id'];
$student_password=$_POST['student_password'];

$q="select * from student where student_id = '$student_id' and student_password = '$student_password'";//向数据库查询表单传来的值的sql
$result = $con->query($q);// 执行 sql
$list=array();
// 获取执行 sql 后的返回对象
$obj=$result->fetch_assoc();
if (mysqli_num_rows($result) > 0){
    array_push($list,$obj);
    echo json_encode($list,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
}else{
    echo null;
}
$con->close();//关闭数据库
?>
