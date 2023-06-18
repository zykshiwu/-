<?php
include('connect_db.php');//链接数据库
$course_name=$_POST['course_name'];
$teacher_name=$_POST['teacher_name'];
$student_id=$_POST['student_id'];
$student_name=$_POST['student_name'];

//根据老师名查询出老师id
$ser_teacher_id="select teacher.teacher_id from teacher,course where teacher.teacher_id=course.teacher_id and course.course_name='$course_name' and teacher.teacher_name='$teacher_name'";
$result = $con->query($ser_teacher_id);
$obj=$result->fetch_assoc();
$teacher_id=$obj["teacher_id"];


$ser_student="select * from student where student_id='$student_id' and student_name='$student_name'";
$result_s = $con->query($ser_student);

// 老师新建签到后再添加学生之后，插入签到表
$ser_checkin="select checkin_name,checkin_switch from checkin where course_name='$course_name' and teacher_id='$teacher_id'";
$result_student_checkin=$con->query($ser_checkin);

if (mysqli_num_rows($result_s) > 0){
    $insert_class="insert into class values('$course_name','$teacher_id','$student_id')";
    $result_ic = $con->query($insert_class);
    echo '添加学生成功';
    if(mysqli_num_rows($result_student_checkin) > 0){
        while($obj_q=$result_student_checkin->fetch_assoc()){
            $checkin_name=$obj_q['checkin_name'];
            $checkin_switch=$obj_q['checkin_switch'];
            $insert_sql="insert into student_checkin(checkin_name,course_name,teacher_id,student_id,checkin_switch) values('$checkin_name','$course_name','$teacher_id','$student_id','$checkin_switch')";
            $result_insert_q=$con->query($insert_sql);
        }
    }
}else{
    echo "不存在这个学生";//还没有学生时候，做逻辑处理
}
$con->close();//关闭数据库
?>