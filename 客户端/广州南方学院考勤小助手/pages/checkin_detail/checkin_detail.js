// pages/checkin_detail/checkin_detail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    ready_checkin:{},
    no_checkin:{},
    askforleave_checkin:{},
    student_checkin_time:{},
    radioItems: [
      { name: '已签到', value: '0',checked: true},
      { name: '未签到', value: '1'},
      { name: '请假', value: '2'}
    ],
    radioItems_value:'0',
    checkin_name:'',
    course_name:'',
    teacher_id:'',
    show_change_student_status_Dialog: false,
    getStudent_name:'',
    getStudent_id:'',
    change_status_name:'',
    get_change_status_year_time:'',
    get_change_status_hour_time:''
  },
  open_dialog(e) {
    this.setData({
      show_change_student_status_Dialog: true,
      getStudent_name:e.currentTarget.dataset.student_name,
      getStudent_id:e.currentTarget.dataset.student_id
    });
  },
  close() {
    this.setData({
      show_change_student_status_Dialog: false,
    });
  },
  radioChange(e) {
    const { radioItems } = this.data;
    for (let i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems,
      radioItems_value:e.detail.value
    });
  },
  // 获取和修改学生状态
  get_change_status(e){
    var that=this;
    var year_time_1 = util.year_Time(new Date());
    var hour_time_1 = util.hour_Time(new Date());
    this.setData({
      change_status_name: e.currentTarget.dataset.status_msg,
      get_change_status_year_time:year_time_1,
      get_change_status_hour_time:hour_time_1
    });
    wx.showModal({
      title: '温馨提示!',
      content:'确定要修改为'+e.currentTarget.dataset.status_msg+'吗?',
      success:function (res) {
        if(!res.cancel){
          wx.request({
            url: 'http://localhost/Server/change_student_checkin.php',
            method:'POST',
            data:{
              'checkin_name':that.data.checkin_name,
              'course_name':that.data.course_name,
              'teacher_id':that.data.teacher_id,
              'student_id':that.data.getStudent_id,
              'checkin_status':that.data.change_status_name,
              'year_time':that.data.get_change_status_year_time,
              'hour_time':that.data.get_change_status_hour_time
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success(res){
              console.log(res.data)
              if (res.data=='已签' || res.data=='未签' || res.data=='请假') {
                wx.showToast({
                  icon:"error",
                  title:'该同学已是'+res.data,
                  duration:1000
                })
              }else{
                wx.showToast({
                  icon:"success",
                  title:res.data,
                  duration:1000
                })
              } 
              that.onShow();
            }
          })
        }
      }
    })
  },
  //教师关闭签到
  close_checkin(e){
    var that=this;
    wx.showModal({
      title: '温馨提示!',
      content:'确定要关闭签到吗?',
      success:function (res) {
        if(!res.cancel){
          wx.request({
            url: 'http://localhost/Server/close_checkin.php',
            method:'POST',
            data:{
              'checkin_name':that.data.checkin_name,
              'course_name':that.data.course_name,
              'teacher_id':that.data.teacher_id,
              'checkin_switch':'F'
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success(res){
              console.log(res.data)
              wx.showToast({
                icon:'success',
                title: res.data,
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.onShow();
    this.setData({
      checkin_name:options.checkin_name,
      course_name:options.course_name,
      teacher_id:options.teacher_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 加载学生的签到时间和判断学生有没有签到
    // if(this.data.userinfo.pro=='学生'){
    //   wx.showLoading({
    //     title: '加载中',
    //     duration:1000
    //   })
    //   setTimeout(()=>{
    //     var that=this;
    //       wx.request({
    //         url: 'http://localhost/Server/load_student_checkin_time.php',
    //         method:'POST',
    //         data:{
    //           'checkin_name':that.data.checkin_name,
    //           'course_name':that.data.course_name,
    //           'teacher_id':that.data.teacher_id,
    //           'student_id':that.data.userinfo.student_id
    //         },
    //         header:{
    //           'content-type':'application/x-www-form-urlencoded'
    //         },
    //         success(res){
    //           if(res.data!=''){
    //             that.setData({
    //               student_checkin_time:res.data[0]
    //             })
    //             console.log(that.data.student_checkin_time);
    //           }
    //         }
    //       });
    //   },1100)
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let getUser=wx.getStorageSync('user');
    this.setData({
      userinfo:getUser,
    });

    //加载签到人员名单
    var that=this;
    wx.request({
      url: 'http://localhost/Server/load_student_checkin.php',
      method:'POST',
      data:{
        'checkin_name':that.data.checkin_name,
        'course_name':that.data.course_name,
        'teacher_id':that.data.teacher_id
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data!=''){
          let ready_list=[];
          let no_list=[];
          let askforleave_list=[];
          let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              if(item.checkin_status=="未签"){
                no_list.push({
                  "student_id":item.student_id,
                  "student_name":item.student_name
                })
              }
              if(item.checkin_status=="已签"){
                ready_list.push({
                  "student_id":item.student_id,
                  "student_name":item.student_name,
                  "year_time":item.year_time,
                  "hour_time":item.hour_time
                })
              }
              if(item.checkin_status=="请假") {
                askforleave_list.push({
                  "student_id":item.student_id,
                  "student_name":item.student_name
                })
              }
            }
            that.setData({
              ready_checkin:ready_list,
              no_checkin:no_list,
              askforleave_checkin:askforleave_list
            });
        }
        else{
          that.setData({
            ready_checkin:'',
            no_checkin:'',
            askforleave_checkin:''
          });
        }
      }
    });


    //加载学生的签到时间和判断学生有没有签到
    // if(this.data.userinfo.pro=='学生'){
    //   var that=this
    //   wx.request({
    //     url: 'http://localhost/Server/load_student_checkin_time.php',
    //     method:'POST',
    //     data:{
    //       'checkin_name':that.data.checkin_name,
    //       'course_name':that.data.course_name,
    //       'teacher_id':that.data.teacher_id,
    //       'student_id':that.data.userinfo.student_id
    //     },
    //     header:{
    //       'content-type':'application/x-www-form-urlencoded'
    //     },
    //     success(res){
    //       if(res.data!=''){
    //         that.setData({
    //           student_checkin_time:res.data[0]
    //         })
    //         console.log(that.data.student_checkin_time);
    //       }
    //     }
    //   });
    // }
    
    if(this.data.userinfo.pro=='学生'){
      wx.showLoading({
        title: '加载中',
        duration:500
      })
      setTimeout(()=>{
        var that=this;
          wx.request({
            url: 'http://localhost/Server/load_student_checkin_time.php',
            method:'POST',
            data:{
              'checkin_name':that.data.checkin_name,
              'course_name':that.data.course_name,
              'teacher_id':that.data.teacher_id,
              'student_id':that.data.userinfo.student_id
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success(res){
              if(res.data!=''){
                that.setData({
                  student_checkin_time:res.data[0]
                })
                console.log(that.data.student_checkin_time);
              }
            }
          });
      },500)
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