Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		username: 'admin',
		swiperList: [],

	},
	// 跳转详情
	showDetail: function (e) {
		wx.navigateTo({
			url: '/pages/newsdetail/newsdetail?id=' + e.currentTarget.dataset.id,


		})

	},

	onTapJump(params) {
		wx.navigateTo({
			url: '/pages/code/code',
		})
	},
	gotoreport: function () {
		wx.navigateTo({
			url: '../report/report',
		})
	},
	gotoapply: function () {
		wx.navigateTo({
			url: '../apply/apply',
		})
	},

	gotorecord:function(){
		wx.navigateTo({
			url: '../applyRecord/applyRecord',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad: function (options) {
		wx.request({
			// url: 'https://unidemo.dcloud.net.cn/api/news',
			url: `http://localhost:8080/news/news/1`,
			header: {
				'content-type': 'application/json'
			},
			success: res => {
				console.log(res)
				this.setData({
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