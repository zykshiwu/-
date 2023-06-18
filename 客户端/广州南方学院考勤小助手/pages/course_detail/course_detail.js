// pages/course_detail/course_detail.js
var util = require('../../utils/util.js');
const common =require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialog3: false,
    dialog4:false,
    userinfo:{},
    checkin:{},
    course_name:'',
    teacher_name:'',
    year_time:'',
    hour_time:'',
    checkin_name:'',
    current_checkin_name:'',
    input_studentId:'',
    input_studentName:''
  },

  open3() {
    this.setData({
      dialog3: true,
    });
  },
  close() {
    this.setData({
      dialog3: false,
    });
  },
  open4() {
    this.setData({
      dialog4: true,
    });
  },
  close4() {
    this.setData({
      dialog4: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      course_name:options.course_name,
      teacher_name:options.teacher_name
    })
    wx.setNavigationBarTitle({
      title: options.course_name,
    })
  },
  getCheckinName(e){
    this.setData({
      checkin_name:e.detail.value
    })
  },
  getStudentid(e){
    this.setData({
      input_studentId:e.detail.value
    })
  },
  getStudentName(e){
    this.setData({
      input_studentName:e.detail.value
    })
  },
  add_studnet_summit(e){
    var that=this;
    wx.request({
      url: 'http://localhost/Server/add_student.php',
      method:'POST',
      data:{
        'course_name':that.data.course_name,
        'teacher_name':that.data.teacher_name,
        'student_id':that.data.input_studentId,
        'student_name':that.data.input_studentName,
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data=='添加学生成功'){
          common.addStudnet_toast(res.data,'succcess')
          that.setData({
            dialog4: false,
          });
        }
        if(res.data=='不存在这个学生'){
          common.addStudnet_toast(res.data,'error')
        }
      },
    });
  },
  student_click_checkin(e){
    if(this.data.userinfo.pro=='学生'){
      var year_time = util.year_Time(new Date());
      var hour_time = util.hour_Time(new Date());
      this.setData({
        year_time:year_time,
        hour_time:hour_time,
        current_checkin_name:e.currentTarget.dataset.name
      });
      var that=this;
      wx.request({
        url: 'http://localhost/Server/student_checkin.php',
        method:'POST',
        data:{
          'checkin_name':that.data.current_checkin_name,
          'course_name':that.data.course_name,
          'teacher_name':that.data.teacher_name,
          'student_id':that.data.userinfo.student_id,
          'year_time':that.data.year_time,
          'hour_time':that.data.hour_time,
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          console.log(res.data);
        },
      });
    }
  },
  click_summit(e){
    var that=this;
    var year_time = util.year_Time(new Date());
    var hour_time = util.hour_Time(new Date());
    this.setData({
      year_time:year_time,
      hour_time:hour_time
    });
    if(!that.data.checkin_name){
      common.addCheckin_toast("请输入签到名","error");
      return
    }
    //添加签到
    wx.request({
      url: 'http://localhost/Server/add_checkin.php',
      method:'POST',
      data:{
        'checkin_name':that.data.checkin_name,
        'year_time':that.data.year_time,
        'hour_time':that.data.hour_time,
        'course_name':that.data.course_name,
        'teacher_name':that.data.teacher_name
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data=="新建签到成功"){
          common.addCheckin_toast(res.data,"success");
          //将人数写入签到表
          wx.request({
            url: 'http://localhost/Server/add_student_checkin.php',
            method:'POST',
            data:{
              'checkin_name':that.data.checkin_name,
              'course_name':that.data.course_name,
              'teacher_name':that.data.teacher_name
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success(res){
              console.log(res.data);
            },
          });
          that.onShow();
        }
        else{
          that.setData({
            dialog3: true,
          });
          if(res.data=="无学生在班级里"){
            common.addCheckin_toast(res.data,"error");
          }
          if(res.data=="签到名重复"){
            common.addCheckin_toast(res.data,"error");
          }
        }
      },
    });
    this.setData({
      dialog3: false,
    });

  },
  delete_checkin(e){
    var that=this;
    if (this.data.userinfo.pro=='教师'){
      wx.showModal({
        title: '温馨提示',
        content:'确定要删除'+e.currentTarget.dataset.name+'这个签到吗?',
        success:function (res) {
          if(!res.cancel){
            wx.request({
              url: 'http://localhost/Server/delete_checkin.php',
              method:'POST',
              data:{
                'checkin_name':e.currentTarget.dataset.name,
                'course_name':that.data.course_name,
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

    // 加载签到名
    var that=this;
    wx.request({
      url: 'http://localhost/Server/load_checkin.php',
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
          console.log(res.data)
          let checkin_list=[];
          let count =res.data.length;
          for(let i=0;i<count;i++){
            let item=res.data[i];
            checkin_list.push({
              "checkin_name":item.checkin_name,
              "year_time":item.year_time,
              "hour_time":item.hour_time,
              "teacher_id":item.teacher_id,
              "checkin_switch":item.checkin_switch
            }
            )
          }
          that.setData({
            checkin:checkin_list
          });
        }
        else{
          that.setData({
            checkin:''
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