// pages/register/register.js
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    value: 0,
    pro:'学生',
  },

  bindPicker3Change(e) {
    this.setData({
      value: e.detail.value,
    });
  },

  getPro(e){
    this.setData({
      pro:e.currentTarget.dataset.name,
    });
  },

  register(e){
    let item=e.detail.value
    if(this.data.pro=='学生'){
      if(!item.student_id){
        wx.showToast({
          icon:'error',
          title: '请输入学号',
        })
        return
      }
      if(!item.password){
        wx.showToast({
          icon:'error',
          title: '请输入密码',
        })
        return
      }
      if(!item.student_name){
        wx.showToast({
          icon:'error',
          title: '请输入姓名',
        })
        return
      }
      if(!item.class){
        wx.showToast({
          icon:'error',
          title: '请输入班级',
        })
        return
      }
      wx.request({
        url: 'http://localhost/Server/student_register.php',
        method:'POST',
        data:{
          'student_id':item.student_id,
          'student_password':item.password,
          'student_name':item.student_name,
          'sex':this.data.array[this.data.value],
          'class':item.class,
          'pro':this.data.pro
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data=="注册失败"){
            common.toast("学号已存在","error");
          }else{
            common.toast(res.data,"success");
          }
        },
      })
      
    }
    if(this.data.pro=='教师'){
      if(!item.teacher_id){
        wx.showToast({
          icon:'error',
          title: '请输入教工号',
        })
        return
      }
      if(!item.password){
        wx.showToast({
          icon:'error',
          title: '请输入密码',
        })
        return
      }
      if(!item.teacher_name){
        wx.showToast({
          icon:'error',
          title: '请输入姓名',
        })
        return
      }
      wx.request({
        url: 'http://localhost/Server/teacher_register.php',
        method:'POST',
        data:{
          'teacher_id':item.teacher_id,
          'teacher_password':item.password,
          'teacher_name':item.teacher_name,
          'sex':this.data.array[this.data.value],
          'pro':this.data.pro
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          console.log(res.data);
          if(res.data=="注册失败"){
            common.toast("教工号已存在","error");
          }else{
            common.toast(res.data,"success");
          }
        }
      })
      
    }
  },



  //提示框
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})