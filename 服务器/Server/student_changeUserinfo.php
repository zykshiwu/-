<?php
include('connect_db.php');//链接数据库

$student_id=$_POST['student_id'];
$old_student_id=$_POST['old_student_id'];
$student_name=$_POST['student_name'];
$sex=$_POST['sex'];
$class=$_POST['class'];

$upd_q="update student set student_id='$student_id',student_name='$student_name',sex='$sex',class='$class' where student_id='$old_student_id'";
$ser_q="select * from student where student_id = '$student_id' and student_name='$student_name'";
$reslut_upd=$con->query($upd_q);//执行sql
$list=array();

if($reslut_upd){
    $result_ser=$con->query($ser_q);
    $obj=$result_ser->fetch_assoc();
    if(mysqli_num_rows($result_ser) > 0){
        array_push($list,$obj);
        echo json_encode($list);
    }
}
else{
    return null;
}


$con->close()//关闭数据库

?>