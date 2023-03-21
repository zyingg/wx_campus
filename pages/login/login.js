var inputName = "";
var inputPassword = "";
Page({
	/**
	 * 页面的初始数据
	 * 初始化两个输入值
	 */
	data: {
		isLogin: false
	},
	//获取用户输入的值a
	inputName: function (e) {
		inputName = e.detail.value;
	},
	//获取用户输入的值b
	inputPassword: function (e) {
		inputPassword = e.detail.value;
		console.log("输入的密码：" + inputPassword);
	},


	// 登陆
	login: function () {
		var that = this;
		var isrightful = that.checkInput();
		if (isrightful) {
			wx.request({
				url: 'http://localhost:8080/user/login',
				header: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				data: {
					userId: inputName,
					password: inputPassword
				},
				success: function (res) {
					console.log(res)
					if (res.data.code != 0) {
						wx.showToast({ //这里提示失败原因
							title: res.data.message,
							icon: 'loading',
							duration: 1000
						})
					} else {
						wx.showToast({
							title: '登陆成功！', //这里成功
							icon: 'success',
							duration: 1000
						})
						wx.setStorage({
							key: 'id',
							data: res.data.data.user.id
						})
						wx.setStorage({
							key: 'userid',
							data: inputName
						})
						wx.setStorage({
							key: 'password',
							data: inputPassword
						})
						wx.setStorage({
							key: 'username',
							data: res.data.data.user.username
						})
						wx.setStorage({
							key: 'remark',
							data: res.data.data.user.remark
						})
						wx.setStorage({
							key: 'major',
							data: res.data.data.user.major
						})
						wx.setStorage({
							key: 'telephone',
							data: res.data.data.user.telephone
						})
						wx.setStorage({
							key: 'healthCode',
							data: null
						})
						wx.switchTab({
							url: '/pages/home/home'
						})
					}
				},
				fail: function (res) {
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
	checkInput: function () {
		if (inputName == "" || inputName == null ||
			inputName == undefined) {
			this.showErrorToastUtils('请输入');
		} else if (inputPassword == "" || inputPassword == null || inputPassword == undefined) {
			this.showErrorToastUtils('请输入密码');
		} else if (inputPassword.length < 6) {
			this.showErrorToastUtils('密码至少要6位');
		}
		return true;
	},

	// 错误提示
	showErrorToastUtils: function (e) {
		wx.showModal({
			title: '提示！',
			confirmText: '确定',
			showCancel: false,
			content: e,
			success: function (res) {
				if (res.confirm) {
					console.log('用户点击确定')
				}
			}
		})
	},


})