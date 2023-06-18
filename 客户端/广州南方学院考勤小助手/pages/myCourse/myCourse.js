// pages/myCourse/myCourse.js
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    course:{},
    student_course:{},
  },
  delete_course(e){
    var that=this;
    if (this.data.userinfo.pro=='教师'){
      wx.showModal({
        title: '温馨提示',
        content:'确定要删除'+e.currentTarget.dataset.course_name+'这个课程吗?',
        success:function (res) {
          if(!res.cancel){
            wx.request({
              url: 'http://localhost/Server/delete_course.php',
              method:'POST',
              data:{
                'course_name':e.currentTarget.dataset.course_name,
                'teacher_id':that.data.userinfo.teacher_id,
              },
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              success(res){
                wx.showToast({
                  icon:"success",
                  title:res.data,
                  duration:1000
                })
                that.onShow();
              }
            })
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
    let getUser=wx.getStorageSync('user');
    this.setData({
      userinfo:getUser,
    });

    // 加载课程
    var that=this;
    if(that.data.userinfo.pro=='学生'){
      wx.request({
        url: 'http://localhost/Server/load_student_Course.php',
        method:'POST',
        data:{
          'student_id':that.data.userinfo.student_id,
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let courselist=[];
            let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              courselist.push({
                "course_name":item.course_name,
                "address":item.address,
                "time":item.time,
                "jx":item.jx,
                "teacher_name":item.teacher_name
              }
              )
            }
            that.setData({
              student_course:courselist
            })
          }
          else{
            common.myCourse_toast("目前还没任何课程!");
            that.setData({
              student_course:''
            })
          }
        },
      })
    }

    if(that.data.userinfo.pro=='教师'){
      wx.request({
        url: 'http://localhost/Server/load_teacher_Course.php',
        method:'POST',
        data:{
          "teacher_id":that.data.userinfo.teacher_id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let courselist=[];
            let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              courselist.push({
                "course_name":item.course_name,
                "address":item.address,
                "time":item.time,
                "jx":item.jx,
                "teacher_name":item.teacher_name
              }
              )
            }
            that.setData({
              course:courselist
            })
          }
          else{
            common.myCourse_toast("还没创建任何课程,去添加!");
            that.setData({
              course:''
            })
          }
        },
      })
    }
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