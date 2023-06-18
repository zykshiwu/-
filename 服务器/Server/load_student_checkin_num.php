<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$teacher_id=$_POST['teacher_id'];

$q="select checkin_name,checkin_status,count(checkin_status) as checkin_num from student_checkin where course_name='$course_name' and teacher_id='$teacher_id' GROUP BY checkin_status,checkin_name";//向数据库查询表单传来的值的sql
$result_q = $con->query($q);// 执行 sql
$list=array();
// 获取执行 sql 后的返回对象
if (mysqli_num_rows($result_q) > 0){
    while($obj_q=$result_q->fetch_assoc()){
        array_push($list,$obj_q);
    }
    echo json_encode($list);
}else{
    echo null;
}
$con->close();//关闭数据库
?>