
//这是一个公共脚本
module.exports = {
  toast:toast,
  login_toast:login_toast,
  loginout_toast:loginout_toast,
  changeinfo_toast:changeinfo_toast,
  myCourse_toast:myCourse_toast,
  addCourse_toast:addCourse_toast,
  addCheckin_toast:addCheckin_toast,
  addStudnet_toast:addStudnet_toast,
  askforleave_toast:askforleave_toast
}

//注册页面弹出简单提示框
function toast(mesg,type){
  if(mesg=="注册成功"){
    wx.showToast({
      icon:type,
      title:mesg,
      duration:1000
    })
    setTimeout(()=>{
      wx.navigateBack({
        delta: 0,
      });
    },1000)
  }else{
    wx.showToast({
      icon:type,
      title:mesg,
      duration:1000
    })
  }
  
}

//登录提示框
function login_toast(mesg,type) {
  if(mesg=="登录成功"){
    wx.showToast({
      icon:type,
      title:mesg,
      duration:1000
    })
    setTimeout(()=>{
      wx.navigateBack({
        delta: 0,
      });
    },1000)
  }else{
    wx.showToast({
      icon:type,
      title:mesg,
      duration:1000
    })
  }
}

//登出信息提示框
function loginout_toast(mesg,type) {
  wx.showToast({
    icon:type,
    title:mesg,
    duration:1000
  })
}


//修改信息提示框
function changeinfo_toast(mesg,type){
  if(mesg=="修改成功"){
    wx.showToast({
      icon:type,
      title:mesg,
      duration:1000
    })
    setTimeout(()=>{
      wx.navigateBack({
        delta: 0,
      });
    },1000)
  }else{
    wx.showToast({
      icon:type,
      title:mesg,
      duration:1000
    })
  }
}

//加载课程提示框
function myCourse_toast(mesg) {
  wx.showModal({
    title: '温馨提示',
    content:mesg,
    showCancel:false
  });
}


// 添加课程提示框
function addCourse_toast(mesg) {
  wx.showToast({
    title:mesg,
    duration:1000
  })
  setTimeout(()=>{
    wx.navigateBack({
      delta: 0,
    });
  },1000)
}

//添加签到提示框
function addCheckin_toast(mesg,type) {
  wx.showToast({
    icon:type,
    title:mesg,
    duration:1000
  })
}

//添加学生提示框
function addStudnet_toast(mesg,type) {
  wx.showToast({
    icon:type,
    title:mesg,
    duration:1000
  })
}

//请假提交提示框
function askforleave_toast(mesg,type) {
  wx.showToast({
    icon:type,
    title:mesg,
    duration:1000
  })
  setTimeout(()=>{
    wx.navigateBack({
      delta: 0,
    });
  },1000)
}