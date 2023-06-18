// pages/addCourse/addCourse.js
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    time: ['周一', '周二', '周三','周四', '周五', '周六','周日'],
    timeIndex: 0,
    jx: ['1-2', '1-3', '3-4','3-5','8-9','8-10','9-10','12-13','12-14','13-14'],
    jxIndex: 0,
  },

  bindtimeChange(e) {
    this.setData({
      timeIndex: e.detail.value,
    });
  },
  bindjxChange(e){
    this.setData({
      jxIndex: e.detail.value,
    });
  },
  addcourse(e){
    var that=this;
    let item=e.detail.value;
    if(!item.course_name){
      wx.showToast({
        icon:'error',
        title: '请输入课程名称',
      })
      return
    }
    if(!item.address){
      wx.showToast({
        icon:'error',
        title: '请输入上课地点',
      })
      return
    }
    wx.request({
      url: 'http://localhost/Server/addCourse.php',
      method:'POST',
      data:{
        'course_name':item.course_name,
        'address':item.address,
        'jx':that.data.jx[that.data.jxIndex],
        'time':that.data.time[that.data.timeIndex],
        'teacher_id':that.data.userinfo.teacher_id
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data!=''){
          common.addCourse_toast("添加课程成功!");
        }
      },
    })
  }
  ,
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