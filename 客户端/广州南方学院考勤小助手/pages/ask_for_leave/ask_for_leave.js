// pages/ask_for_leave/ask_for_leave.js
const common =require("../../common.js");
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    teacher_name: [],
    student_askforleave:{},
    teacher_value:0,
    text_lenght:0,
    remarks:'',
    Phone:'',
    create_year_time:'',
    date1: '2022-11-01',
    date2: '2022-12-01',
  },
  bindDateChange1(e) {
    this.setData({
      date1: e.detail.value,
    });
  },
  bindDateChange2(e) {
    this.setData({
      date2: e.detail.value,
    });
  },
  bindPicker3Change(e) {
    this.setData({
      teacher_value: e.detail.value,
    });
  },
  getInput(e){
    this.setData({
      text_lenght:e.detail.value.length,
      remarks:e.detail.value
    });
  },
  getPhone(e){
    this.setData({
      Phone:e.detail.value,
    });
  },
  click_summit(e){
    var that=this;
    wx.showModal({
      title: '温馨提示',
      content:'确定要提交?',
      success:function (res) {
        var create_year_time = util.year_Time(new Date());
        that.setData({
          create_year_time:create_year_time,
        })
        if(!res.cancel){
          if(!that.data.Phone){
            wx.showToast({
              icon:'error',
              title: '请输入手机号',
            });
            return
          }
          if(!that.data.remarks){
            wx.showToast({
              icon:'error',
              title: '请输入备注',
            });
            return
          }
          wx.request({
            url: 'http://localhost/Server/add_askforleave.php',
            method:'POST',
            data:{
              'student_id':that.data.userinfo.student_id,
              'student_name':that.data.userinfo.student_name,
              'class':that.data.userinfo.class,
              'phone':that.data.Phone,
              'begin_year_time':that.data.date1,
              'end_year_time':that.data.date2,
              'teacher_name':that.data.teacher_name[that.data.teacher_value],
              'create_year_time':that.data.create_year_time,
              'remarks':that.data.remarks,
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            success(res){
              if(res.data!=''){
                common.askforleave_toast(res.data,'succcess');
              }
            }
          })
        }
      }
    })
  },

  getButton_data(e){
    var that=this;
      wx.request({
        url: 'http://localhost/Server/teacher_change_askforleave.php',
        method:'POST',
        data:{
          "askforleave_no":e.currentTarget.dataset.no,
          "askforleave_status":e.currentTarget.dataset.name
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          wx.showToast({
            icon:"success",
            title:res.data,
            duration:1000
          });
          that.onShow();
       }
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

    //加载老师名
    if(this.data.userinfo.pro=='学生'){
      var that=this;
      wx.request({
        url: 'http://localhost/Server/load_teacher_name.php',
        method:'POST',
        data:{
          'student_id':that.data.userinfo.student_id
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          if(res.data!=''){
            let teacherNamelist=[];
            let count =res.data.length;
            for(let i=0;i<count;i++){
              let item=res.data[i];
              teacherNamelist.push(
                item.teacher_name,
              )
            }
            that.setData({
              teacher_name:teacherNamelist
            })
          }
       }
      })
    }

    if(this.data.userinfo.pro=='教师'){
      var that=this;
      wx.request({
        url: 'http://localhost/Server/load_student_askforleave.php',
        method:'POST',
        data:{
          'teacher_id':that.data.userinfo.teacher_id
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
                "student_id":item.student_id,
                "student_name":item.student_name,
                "class":item.class,
                "phone":item.phone,
                "begin_year_time":item.begin_year_time,
                "end_year_time":item.end_year_time,
                "teacher_id":item.teacher_id,
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