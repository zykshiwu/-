// pages/changeUserinfo/changeUserinfo.js
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    array: ['男', '女'],
    value: 0,
  },

  bindPicker3Change(e) {
    this.setData({
      value: e.detail.value,
    });
  },

  
  changeinfo(e){
    var that=this;
    wx.showModal({
      title: '提交提示！',
      content:"确定要提交？",
      success(res){
        if(res.confirm){
          let item=e.detail.value
          if(that.data.userinfo.pro=='学生'){
            if(!item.student_id){
              wx.showToast({
                icon:'error',
                title: '请输入学号',
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
              url: 'http://localhost/Server/student_changeUserinfo.php',
              method:'POST',
              data:{
                'student_id':item.student_id,
                'old_student_id':that.data.userinfo.student_id,
                'student_name':item.student_name,
                'sex':that.data.array[that.data.value],
                'class':item.class
              },
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              success(res){
                if(res.data!=''){
                  wx.setStorageSync('user', res.data[0]);
                  common.changeinfo_toast('修改成功',"success");
                }else{
                  common.changeinfo_toast('学号已存在!',"error");
                }
              },
            })
            
          }
          if(that.data.userinfo.pro=='教师'){
            if(!item.teacher_id){
              wx.showToast({
                icon:'error',
                title: '请输入教工号',
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
              url: 'http://localhost/Server/teacher_changeUserinfo.php',
              method:'POST',
              data:{
                'teacher_id':item.teacher_id,
                'old_teacher_id':that.data.userinfo.teacher_id,
                'teacher_name':item.teacher_name,
                'sex':that.data.array[that.data.value],
              },
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              success(res){
                if(res.data!=''){
                  wx.setStorageSync('user', res.data[0]);
                  common.changeinfo_toast('修改成功',"success");
                }else{
                  common.changeinfo_toast('教工号已存在!',"error");
                }
              }
            })
            
          }
      }
    },
    })
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
    let getUser=wx.getStorageSync('user');
    this.setData({
      userinfo:getUser,
    });
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