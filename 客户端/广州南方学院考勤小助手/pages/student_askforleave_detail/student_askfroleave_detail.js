// pages/student_askforleave_detail/student_askfroleave_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    student_askforleave:{},
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
    var that=this;
      wx.request({
        url: 'http://localhost/Server/load_student_askforleave_detail.php',
        method:'POST',
        data:{
          'student_id':that.data.userinfo.student_id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let student_askforleave_list=[];
            let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              student_askforleave_list.push({
                "askforleave_no":item.askforleave_no,
                "student_name":item.student_name,
                "phone":item.phone,
                "begin_year_time":item.begin_year_time,
                "end_year_time":item.end_year_time,
                "teacher_name":item.teacher_name,
                "create_year_time":item.create_year_time,
                "remarks":item.remarks,
                "askforleave_status":item.askforleave_status
              }
              )
            }
            that.setData({
              student_askforleave:student_askforleave_list
            })
          }
          else{
            that.setData({
              student_askforleave:''
            })
          }
       }
      })
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