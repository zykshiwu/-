// pages/student_add_course/student_add_course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    course_list:{},
    inputShowed: false,
    inputVal: ''
  },
  showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      inputShowed: false,
    });
    this.onShow();
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
    this.onShow();
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value,
    });
    if(!this.data.inputVal){
      this.onShow();
    }
    else{
      console.log(this.data.course_list)
      // 模糊查询课程
      var that=this;
      wx.request({
        url: 'http://localhost/Server/search_course.php',
        method:'POST',
        data:{
          'input_content':this.data.inputVal
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
                "teacher_name":item.teacher_name,
                "teacher_id":item.teacher_id
              }
              )
            }
            that.setData({
              course_list:courselist
            })
          }
          else{
            that.setData({
              course_list:''
            })
          }
        },
      })
    }
  }
  ,

  // 学生添加课程
  student_add_course(e){
    var that=this;
    let course_name=e.currentTarget.dataset.cn;
    let teacher_id=e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost/Server/student_add_course.php',
      method:'POST',
      data:{
        "course_name":course_name,
        "teacher_id":teacher_id,
        "student_id":that.data.userinfo.student_id
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data=='success'){
          wx.showToast({
            icon:'success',
            title:"添加成功!",
            duration:1000
          })
        }
        if(res.data=='fail'){
          wx.showToast({
            icon:'error',
            title:"课程已存在!",
            duration:1000
          })
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
    //加载课程
    var that=this;
    wx.request({
      url: 'http://localhost/Server/load_all_course.php',
      method:'POST',
      data:{

      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(res.data)
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
              "teacher_name":item.teacher_name,
              "teacher_id":item.teacher_id
            }
            )
          }
          that.setData({
            course_list:courselist
          })
        }
        else{
          that.setData({
            course_list:''
          })
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