<?php
include('connect_db.php');//链接数据库

$teacher_id=$_POST['teacher_id'];
$teacher_password=$_POST['teacher_password'];
$teacher_name=$_POST['teacher_name'];
$sex=$_POST['sex'];
$pro=$_POST['pro'];
$number='';

$ser_teacher_name_sql="select teacher_name from teacher where teacher_name like '$teacher_name%'";
$result=$con->query($ser_teacher_name_sql);
if (mysqli_num_rows($result) > 0){
    $number=mysqli_num_rows($result);
    $q="insert into teacher VALUES('$teacher_id','$teacher_password','$teacher_name($number)','$sex','$pro')";
    $result_q=$con->query($q);//执行sql

    if (!$result_q){
        echo "注册失败";
    }else{
        echo "注册成功";
    }
}
else{
    $q="insert into teacher VALUES('$teacher_id','$teacher_password','$teacher_name','$sex','$pro')";
    $result_q=$con->query($q);//执行sql

    if (!$result_q){
        echo "注册失败";
    }else{
        echo "注册成功";
    }
}

$con->close()//关闭数据库
?>
