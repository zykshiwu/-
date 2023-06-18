// pages/class_people_number/class_people_number.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    student_name_list:{},
    course_name:'',
    teacher_name:''
  },
  delete_student(e){
    var that=this;
    if (this.data.userinfo.pro=='教师') {
      wx.showModal({
        title: '温馨提示',
        content:'确定要删除'+e.currentTarget.dataset.student_name+'这个学生吗?',
        success:function (res) {
          if(!res.cancel){
            wx.request({
              url: 'http://localhost/Server/delete_student.php',
              method:'POST',
              data:{
                'course_name':that.data.course_name,
                'teacher_id':e.currentTarget.dataset.teacher_id,
                'student_id':e.currentTarget.dataset.student_id
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
    this.setData({
      course_name:options.course_name,
      teacher_name:options.teacher_name
    });
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
      url: 'http://localhost/Server/load_class_people.php',
      method:'POST',
      data:{
        'course_name':that.data.course_name,
        'teacher_name':that.data.teacher_name
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data!=''){
          let student_list=[];
          let count =res.data.length;
          for(let i=0;i<count;i++){
            let item=res.data[i];
            student_list.push({
              "teacher_id":item.teacher_id,
              "student_id":item.student_id,
              "student_name":item.student_name
            })
          }
            that.setData({
              student_name_list:student_list
            });
        }
        else{
          that.setData({
            student_name_list:''
          });
        }
      },
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