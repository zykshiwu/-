// pages/study_record/study_record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    count_student_checkin:{},
    count_teacher_checkin:{},
    student_checkin_num:{},
    course_name:'',
    count_ready_checkin:0,
    count_no_checkin:0,
    count_teacher_checkin_num:0,
    count_askforleave:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      course_name:options.course_name
    })
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
    if(that.data.userinfo.pro=='学生'){
      wx.request({
        url: 'http://localhost/Server/load_count_student_checkin.php',
        method:'POST',
        data:{
          'course_name':that.data.course_name,
          'student_id':that.data.userinfo.student_id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let count_checkin_list=[];
            let count =res.data.length;
            let count_ready_checkin_list=0;
            let count_no_checkin_list=0;
            let count_askforleave_list=0
            for(let i=0;i<count;i++){
              let item=res.data[i];
              if(item.checkin_status=='已签'){
                count_ready_checkin_list+=1
              }
              if(item.checkin_status=='未签'){
                count_no_checkin_list+=1
              }
              if(item.checkin_status=='请假'){
                count_askforleave_list+=1
              }
              count_checkin_list.push({
                "checkin_name":item.checkin_name,
                "year_time":item.year_time,
                "hour_time":item.hour_time,
                "teacher_name":item.teacher_name,
                "checkin_status":item.checkin_status,
              }
              )
            }
            that.setData({
              count_student_checkin:count_checkin_list,
              count_ready_checkin:count_ready_checkin_list,
              count_no_checkin:count_no_checkin_list,
              count_askforleave:count_askforleave_list
            });
          }
          else{
            that.setData({
              count_student_checkin:'',
            });
          }
        },
      })
    }

    if(that.data.userinfo.pro=='教师'){
      wx.request({
        url: 'http://localhost/Server/load_count_teacher_checkin.php',
        method:'POST',
        data:{
          'course_name':that.data.course_name,
          'teacher_id':that.data.userinfo.teacher_id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let count_teacher_checkin_list=[];
            let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              count_teacher_checkin_list.push({
                "checkin_name":item.checkin_name,
                "year_time":item.year_time,
                "hour_time":item.hour_time,
              }
              )
            }
            that.setData({
              count_teacher_checkin:count_teacher_checkin_list,
              count_teacher_checkin_num:count
            });
          }
          else{
            that.setData({
              count_teacher_checkin:'',
            });
          }
        },
      })

      //加载签到状态的人数
      wx.request({
        url: 'http://localhost/Server/load_student_checkin_num.php',
        method:'POST',
        data:{
          'course_name':that.data.course_name,
          'teacher_id':that.data.userinfo.teacher_id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let count_student_checkin_num_list=[];
            let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              count_student_checkin_num_list.push({
                "checkin_name_1":item.checkin_name,
                "checkin_status_1":item.checkin_status,
                "count":item.checkin_num,
              }
              )
            }
            that.setData({
              student_checkin_num:count_student_checkin_num_list
            });
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