Page({

  /**
   * 页面的初始数据
   */
  data: {
		list: [],
		username: 'admin',
swiperList:[],
artlist:[
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" },
{ imag: 'cloud://epidemic-prevention-0cc380f3a132.6570-epidemic-prevention-0cc380f3a132-1312808262/pic1.jpg', art: "突发！震惊！李浚毅居然说这个是标题！" }
]
	},
	// 跳转审批模块
	gotocheck:function(){
		wx.navigateTo({
			url: '/pages/newsdetail/newsdetail',
		})
	},
	// 跳转新闻
	gotonews:function(){
		wx.navigateTo({
			url: '/pages/newsdetail/newsdetail',
		})
	},
	// 跳转健康打卡
  gotoreport:function(){
		wx.navigateTo({
      url: '../report/report',
    })
	},
	
//  跳转查看未打卡人员
	gotounreport:function(){
		wx.navigateTo({
      url: '../unreport/unreport',
    })
	},
	// 跳转查看疫情动态
	gototx:function(){
		wx.navigateTo({
      url: '../tx/tx',
    })
	},
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad() {
// this.getSwiperList()
 
//   },
// //获取轮播图数据
// getSwiperList(){
// wx.request({
//   url: 'http://www.escook.cn/slides',
//   method:'GET',
//   success:(res)=>
//   {
//     console.log(res)
//     this.setData({
//       swiperList:res.data
//     })
//   }
// })
// },
onLoad: function (options) {
	wx.request({
		 
			 url: `http://localhost:8080/notice/fontsearch/${this.username}`,
		header: {
			'content-type': 'application/json'
		},
		success: res => {
			//1:在控制台打印一下返回的res.data数据
			console.log(res)
			//2:在请求接口成功之后，用setData接收数据
			this.setData({
				//第一个data为固定用法
				list: res.data.data.records
			})
			
		}
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