// pages/home/code.js
var util = require('../../utils/util.js');
Page({
  data: {
		//../../image/code.jpg
    imgUrl:'',
    stuId: '',
    name: wx.getStorageSync('name'),
    isHealth: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if(wx.getStorageSync('healthCode') == null){
			wx.showModal({
				title:'请进行健康打卡'
			})
			return;
		}
		var i = wx.getStorageSync('healthCode');
		console.log(i);
		if(i==0){
			this.setData({
				imgUrl : '../../image/greenCode.png'
			})
		}else if(i==1){
			this.setData({
				imgUrl : '../../image/yellowCode.png'
			})
		}else if(i==2){
			this.setData({
				imgUrl:'../../image/redCode.png'
			})
		}
    this.setData({
      stuId : wx.getStorageSync('userid'),
      name : wx.getStorageSync('username')
    })
    this.onShow()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      stuId : wx.getStorageSync('userid'),
      name : wx.getStorageSync('username')
    })
    setInterval(() => {
      var time = util.formatTime(new Date())
    this.setData({
      time: time
    })
    }, 1000);
    if(wx.getStorageSync("state") == this.formatDate(new Date())){
      this.setData({
        isHealth:1
      })
    }else{
      this.setData({
        isHealth:0
      })
    }
  },
  formatDate: function(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month.toString()
    month[1] ? month=month :month='0' + month
    let day = date.getDate()
    day = day.toString()
    day[1] ? day=day : day='0' + day
    return year+"-"+month+"-"+day
   },
})