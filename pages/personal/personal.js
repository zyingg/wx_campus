// pages/personal/personal.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{
			nickName:'点击微信登录',
		},
		userid:'',
		islogin:false,
	},
  gotoModify:function(){
		wx.navigateTo({
      url: '../modify/modify_stu',
    })
  },
  gotologin:function(){
		wx.clearStorage({
			success: (res) => {
				console.log(res)
				wx.clearStorage()
			},
		})
		wx.reLaunch({
			url: '/pages/login/login',
		})
	},
	handleTapLogin(){
		if(this.data.islogin){
			return;
		}
		wx.getUserProfile({
			desc: '获取用户信息',
			lang:'zh_CN',
			success:(res)=>{
				console.log('获取用户信息',res)
				this.setData({
					islogin:true,
					userInfo:res.userInfo,
					userid:wx.getStorageSync('userid')
					
				})
				
			}
		})
		
	},
    gotoApplyRecord:function(){
		wx.navigateTo({
			url: '../applyRecord/applyRecord',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad:function(options) {
		this.setData({
			userid:wx.getStorageSync('userid')
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