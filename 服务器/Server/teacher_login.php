<?php
include('connect_db.php');//链接数据库
$teacher_id=$_POST['teacher_id'];
$teacher_password=$_POST['teacher_password'];

$q="select * from teacher where teacher_id = '$teacher_id' and teacher_password = '$teacher_password'";//向数据库查询表单传来的值的sql
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
