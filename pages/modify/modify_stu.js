 //czy 修改密码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPass:'',
    newPass:'',
		rePass:'',
  },
  oldPass: function (e) {
    this.setData({
      oldPass: e.detail.value
    })
  },
  newPass: function (e) {
    this.setData({
      newPass: e.detail.value
    })
  },
  rePass: function (e) {
    this.setData({
      rePass: e.detail.value
    })
  },

  submit: function () {
		var data = this.data
    if( data.oldPass == null && data.rePass == null && data.newPass == null){
      wx.showModal({
        title: '请输入完整',
        icon: 'error',
        duration: 2000
			})
		}else if(data.oldPass != wx.getStorageSync('password')){
			wx.showToast({
        title: '原密码错误',
        icon: 'error',
        duration: 2000
      })
		}else if (data.newPass != data.rePass){
			wx.showToast({
				title:'新密码不一致',
				icon:'error',
				duration: 2000
			})
		}else{
			var data = this.data;
			console.log(data)
      wx.request({
        url: 'http://localhost:8080/user/password',
        data: {
          userId: wx.getStorageSync('userid'),
          oldPass: data.oldPass,
					newPass: data.newPass,
					rePass: data.rePass
				},
				method: 'POST',
				success: (result) => {
					wx.hideLoading({
						success: (result) => {},
					})
					wx.clearStorageSync()
					wx.showToast({
						title: '更改成功',
						icon:'success',
						duration: 2000,
						success:function () {
							setTimeout(function(){
								wx.reLaunch({
									url: '../login/login',
								})
							}, 2000);
						}
					})
				},
				fail: () => {
					wx.hideLoading({
						success: (res) => {},
					})
					wx.showToast({
						title: '更改失败',
						icon:'error',
						duration:2000
					})
				}
      })
    }
    
  },
})