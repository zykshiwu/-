<?php
include('connect_db.php');//链接数据库
$input_content=$_POST['input_content'];
$q="SELECT * FROM course,teacher where course.teacher_id=teacher.teacher_id and course_name like '%$input_content%'";//向数据库查询表单传来的值的sql

$result = $con->query($q);// 执行 sql
$list=array();
// 获取执行 sql 后的返回对象
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
