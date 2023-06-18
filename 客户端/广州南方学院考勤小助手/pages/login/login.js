// pages/login/login.js
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pro:'学生',
  },

  getPro(e){
    this.setData({
      pro:e.currentTarget.dataset.name,
    });
  },

  register(e){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  login(e){
    let item=e.detail.value
    if(this.data.pro=="学生"){
      if(!item.student_id){
        wx.showToast({
          icon:'error',
          title: '请输入学号',
        })
        return
      }if(!item.password){
        wx.showToast({
          icon:'error',
          title: '请输入密码',
        })
        return
      }
      // var page=this;//记得定义
      wx.request({
        url: 'http://localhost/Server/student_login.php',
        method:'POST',
        data:{
          'student_id':item.student_id,
          'student_password':item.password,
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          // console.log(res.data);
          // console.log(res.data[0]);
          // page.setData({
          //   record:res.data.data[0]
          // });
          wx.setStorageSync('user', res.data[0]);
          if(res.data!=''){
            common.login_toast("登录成功","success");
          }else{
            common.login_toast("学号或者密码错误","error");
          }
        }
      })
    }

    if(this.data.pro=="教师"){
      if(!item.teacher_id){
        wx.showToast({
          icon:'error',
          title: '请输入教工号',
        })
        return
      }if(!item.password){
        wx.showToast({
          icon:'error',
          title: '请输入密码',
        })
        return
      }
      wx.request({
        url: 'http://localhost/Server/teacher_login.php',
        method:'POST',
        data:{
          'teacher_id':item.teacher_id,
          'teacher_password':item.password,
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          wx.setStorageSync('user', res.data[0]);
          if(res.data!=''){
            common.login_toast("登录成功","success");
          }else{
            common.login_toast("教工号或者密码错误","error");
          }
        }
      })
    }
  },
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