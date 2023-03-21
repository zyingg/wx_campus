//引入事先写好的日期设置util.js文件
var dateTimePicker = require('../../utils/dateTimePicker.js')

Page({
  //与wxml中的数据一一对应，在具体函数中修改time、multiArray、multiIndex等值，进行页面的呈现
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    choose_year: "",
    index1: 0,
    index2: 0,
    option1: ['苗文双', '张展骞', '王芳', '李彪', '向一辰', '张礼胜'],
    option2: ['否', '是'],

    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    dateTimeArray2: null,
    dateTime2: null,
    startYear: 2010,
    endYear: 2050,
    date1: '',
    date2: '',

  },
    getReason: function (e) {
    this.setData({
      reason: e.detail.value
    });
  },
  getLink: function (e) {
    this.setData({
      link: e.detail.value
    });
  },
  getNum: function (e) {
    this.setData({
      num: e.detail.value
    });
  },
  bindchange2: function (e) {
    this.setData({
      index2: e.detail.value
    }),console.log(e.detail.value)
  },
  sendMessage: function () {
    var data = this.data;
    this.setData({
      date1: data.dateTimeArray1[0][data.dateTime1[0]] + "-" + data.dateTimeArray1[1][data.dateTime1[1]] + "-" +
        data.dateTimeArray1[2][data.dateTime1[2]] + " " + data.dateTimeArray1[3][data.dateTime1[3]] + ":" + data.dateTimeArray1[4][data.dateTime1[4]],
      date2: data.dateTimeArray2[0][data.dateTime2[0]] + "-" + data.dateTimeArray2[1][data.dateTime2[1]] + "-" +
        data.dateTimeArray2[2][data.dateTime2[2]] + " " + data.dateTimeArray2[3][data.dateTime2[3]] + ":" + data.dateTimeArray2[4][data.dateTime2[4]]
    })
    if (data.reason == null) {
      wx.showToast({
        title: '请填写请假事由',
        icon:'none',
        duration: 2000
      })
    } else if (data.link == null) {
      wx.showToast({
        title: '请填写紧急联系人',
        icon:'none',
        duration: 2000
      })
    } else if (data.num == null) {
      wx.showToast({
        title: '请填写紧急联系人电话',
        icon:'none',
        duration: 2000
      })
    } else if (data.dateTime1[0] == data.dateTime2[0]) {
      if (data.dateTime1[1] > data.dateTime2[1] || (data.dateTime1[1] <= data.dateTime2[1] && data.dateTime1[2] > data.dateTime2[2])) {
        wx.showToast({
          title: '返校时间不能早于离校',
          icon: 'none',
          duration: 2000
        })
      } else if (data.dateTime1[1] == data.dateTime2[1] && data.dateTime1[2] == data.dateTime2[2]) {
        if (data.dateTime1[3] > data.dateTime2[3] || (data.dateTime1[3] <= data.dateTime2[3] && data.dateTime1[4] > data.dateTime2[4])) {
          wx.showToast({
            title: '返校时间不能早于离校',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showLoading({
            title: '正在上传中...',
          })
          this.apply();
        }
      } else {
        wx.showLoading({
          title: '正在上传中...',
        })
        this.apply();
      }
    }else if (data.dateTime1[0] < data.dateTime2[0]) {
      wx.showLoading({
        title: '正在上传中...',
      })
      this.apply();
    }else if(data.dateTime1[0] > data.dateTime2[0]){
      wx.showToast({
        title: '返校时间不能早于离校',
        icon: 'none',
        duration: 2000
      })
    }
  },


  apply: function () {
    var data = this.data;
    wx.request({
      url: 'http://localhost:8080/leave/add',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        'userId':wx.getStorageSync('userid'),
        'reason': data.reason,
        'emergencyContact': data.link,
        'ecPhone': data.num,
        'startTime': data.date1,
        'endTime': data.date2,
        'leaveCity':data.index2
      },
      success: (result) => {
        wx.hideLoading({
          success: (result) => {},
        })
        wx.showToast({
          title: '上传成功',
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 0,
              })
            }, 1000);
          }
          
        })
        console.log(result.data)
      },
      fail: () => {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '上传失败',
          icon:'error',
          duration:2000
        })
      }

    })
  },

  onLoad() {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj2 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray1 = obj1.dateTimeArray.pop();
    var lastTime1 = obj1.dateTime.pop();
    var lastArray2 = obj2.dateTimeArray.pop();
    var lastTime2 = obj2.dateTime.pop();
    obj2.dateTime[3] += 2
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateTimeArray2: obj2.dateTimeArray,
      dateTime2: obj2.dateTime,
    });
  },
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTime2(e) {
    this.setData({
      dateTime2: e.detail.value
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2,
      dateArr = this.data.dateTimeArray2;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr
    });
  },

})