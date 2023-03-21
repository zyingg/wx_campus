 
var inputUserName = "";
var inputPassword = "";
var inputTelePhone = "";
var inputUserId = "";
// var inputRemark = "";
// var inputGroup = "";

Page({

	/**
	 * 页面的初始数据
	 */
	
	data: {
		index1: 0,
    option1: ['绿码', '黄码', '红码'],
	},
  gotologin:function(){
		wx.reLaunch({
			url: '/pages/login/login',
		})
	},
	 //获取用户输入的学号
	 inputUserId: function(e) {
		inputUserId = e.detail.value;
		console.log("输入的工号：" +inputUserId);
	 },
	 //获取用户输入的密码
	 inputPassword: function(e) {
		inputPassword = e.detail.value;
		console.log("输入的密码：" + inputPassword);
	 },
	 //获取用户输入的姓名
	 inputUserName: function(e) {
		inputUserName = e.detail.value;
		console.log("输入的姓名：" +inputUserName);
	 },
	 //获取用户输入的手机
	 inputTelePhone: function(e) {
		inputTelePhone = e.detail.value;
		console.log("输入的手机：" +inputTelePhone);
	 },
	  //获取用户输入的学院
		inputRemark: function(e) {
			inputRemark = e.detail.value;
			console.log("输入的学院：" +inputRemark);
		 },
		  //获取用户输入的班级
			inputGroup: function(e) {
				inputGroup = e.detail.value;
		console.log("输入的班级：" +inputGroup);
	 },
	//注册
	register: function() {
		var that = this;
		var isrightful = that.checkInput();
		if (isrightful) {
		 wx.request({
			url: 'http://localhost:8080/user/register',
			header: {
			 "Content-Type": "application/json"
			},
			method: "POST",
			data: {
			 userId: inputUserId,
			 password: inputPassword,
			 username:inputUserName,
			 telephone:inputTelePhone,
			 userType:1,
			 roles:"normal",
			 remark:inputRemark,
			 major:inputGroup
			},
			success: function(res) {
			 console.log(res)
			 if (res.statusCode != 200) {
				wx.showToast({ //这里提示失败原因
				 title: res.data.message,
				 icon: 'loading',
				 duration: 1500
				})
			 } else {
				wx.showToast({
				 title: '注册成功', //这里成功
				 icon: 'success',
				 duration: 1000
				});
				that.setData({
				 isLogin: true,
				}
				)
			 }
			},
			fail: function(res) {
			 console.log(res)
			 wx.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 1500
			 })
			}
		 });
		}
	 },
	 //检测输入值
 checkInput: function() {
  if (inputUserId == "" || inputUserId == null ||
	inputUserId == undefined) {
   this.showErrorToastUtils('请输入学号');
  } else if (inputPassword == "" || inputPassword == null || inputPassword == undefined) {
   this.showErrorToastUtils('请输入密码');
  } else if (inputPassword.length < 6) {
   this.showErrorToastUtils('密码至少要6位');
  }
  return true;
 },
 
  // 错误提示
	showErrorToastUtils: function(e) {
		wx.showModal({
		 title: '提示！',
		 confirmText: '朕知道了',
		 showCancel: false,
		 content: e,
		 success: function(res) {
			if (res.confirm) {
			 console.log('用户点击确定')
			}
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