<?php
include('connect_db.php');//链接数据库
$teacher_id=$_POST['teacher_id'];

$q="select * from ask_for_leave where teacher_id='$teacher_id'";//向数据库查询表单传来的值的sql
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
