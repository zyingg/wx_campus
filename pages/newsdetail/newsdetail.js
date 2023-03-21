// pages/newsdetail/newsdetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(params) {
		var newsId = params.id;
		// 发起请求获取新闻详情赋值到list
		wx.request({
			url: `http://localhost:8080/news/${newsId}`,
			header: {
				'content-type': 'application/json'
			},
			success: res => {
				this.setData({
					//第一个data为固定用法
					list: res.data.data
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