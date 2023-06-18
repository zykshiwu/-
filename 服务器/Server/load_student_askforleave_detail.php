<?php
include('connect_db.php');//链接数据库
$student_id=$_POST['student_id'];

$q="select ask_for_leave.askforleave_no,ask_for_leave.student_name,ask_for_leave.phone,ask_for_leave.begin_year_time,ask_for_leave.end_year_time,ask_for_leave.create_year_time,remarks,ask_for_leave.askforleave_status,teacher.teacher_name from ask_for_leave,teacher where student_id='$student_id' and ask_for_leave.teacher_id=teacher.teacher_id";//向数据库查询表单传来的值的sql
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
