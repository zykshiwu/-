// pages/My/My.js
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
  },
  login(e){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  loginout(e){
    this.setData({
      user:null
    });
    common.loginout_toast("退出成功","successs");
    wx.setStorageSync('user', null);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let getUser=wx.getStorageSync('user');
    this.setData({
      user:getUser,
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