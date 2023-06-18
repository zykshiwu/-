<?php
include('connect_db.php');//链接数据库

$teacher_id=$_POST['teacher_id'];
$old_teacher_id=$_POST['old_teacher_id'];
$teacher_name=$_POST['teacher_name'];
$sex=$_POST['sex'];

$upd_q="update teacher set teacher_id='$teacher_id',teacher_name='$teacher_name',sex='$sex' where teacher_id='$old_teacher_id'";
$ser_q="select * from teacher where teacher_id = '$teacher_id' and teacher_name='$teacher_name'";
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