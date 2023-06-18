<?php
include('connect_db.php');//链接数据库
$student_id=$_POST['student_id'];
$list=array();

$ser_student_id="select DISTINCT teacher.teacher_name from class,teacher where class.student_id='$student_id' and class.teacher_id=teacher.teacher_id";
$result = $con->query($ser_student_id);
if (mysqli_num_rows($result) > 0){
    while($obj=$result->fetch_assoc()){
        array_push($list,$obj);
    }
    echo json_encode($list);
}else{
    echo null;
}

$con->close();//关闭数据库
?>
