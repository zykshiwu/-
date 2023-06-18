<?php
include('connect_db.php');//链接数据库
$askforleave_no=$_POST['askforleave_no'];
$askforleave_status=$_POST['askforleave_status'];

$q="update ask_for_leave set askforleave_status='$askforleave_status' where askforleave_no='$askforleave_no'";//向数据库查询表单传来的值的sql
$result = $con->query($q);// 执行 sql
// 获取执行 sql 后的返回对象
if ($result){
    echo "审批成功";
}
$con->close();//关闭数据库

?>
