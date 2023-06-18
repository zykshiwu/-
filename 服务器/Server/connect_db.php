<?php
$server = "localhost";//主机
$db_username = "root";//你的数据库用户名
$db_password = "root";//你的数据库密码
$db_name = "attendance";//你的数据库名

$con =mysqli_connect($server, $db_username, $db_password,$db_name);//链接数据库
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
// else{
//     echo "连接成功";
// }

?>
