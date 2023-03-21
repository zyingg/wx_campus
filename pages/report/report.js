Page({
	data: {
		index1: 0,
		index2: 0,
		index3: 0,

		option1: ['绿码', '黄码', '红码'],
		option2: ['健康', '异常'],
		option3: ['全程接种', '未全程接种', '未接种'],
		imgs: [],
		imgs2: [],
		hiddenName: false,
		hiddenName2: false,
		img1:[],
		img2:[],
	},
	goto: function () {
		wx.switchTab({
			url: '/pages/home/home',
		})
	},
	//健康码状态
	bindchange1: function (e) {
		this.setData({
			index1: e.detail.value
		})
	},
	//健康状态
	bindchange2: function (e) {
		this.setData({
			index2: e.detail.value
		})
	},
	//疫苗接种情况
	bindchange3: function (e) {
		this.setData({
			index3: e.detail.value
		})
	},
	getName: function (e) {
		this.setData({
			name: e.detail.value
		})
	},
	getStuID: function (e) {
		this.setData({
			stuID: e.detail.value
		})
	},
	getTemp: function (e) {
		this.setData({
			temperature: e.detail.value
		})
	},
	getAddress: function (e) {
		this.setData({
			address: e.detail.value
		})
	},


	chooseImg: function (e) {
		var that = this;
		var imgs = this.data.imgs;
		if (imgs.length >= 9) {
			this.setData({
				lenMore: 1
			});
			setTimeout(function () {
				that.setData({
					lenMore: 0
				});
			}, 2500);
			return false;
		}
		wx.chooseImage({
			// count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths;
				var imgs = that.data.imgs;
				
				// console.log(tempFilePaths + '----');
				for (var i = 0; i < tempFilePaths.length; i++) {
					if (imgs.length >= 9) {
						that.setData({
							imgs: imgs
						});
						return false;
					} else {
						imgs.push(tempFilePaths[i]);
					}
				}
				// console.log(imgs);
				that.setData({
					hiddenName: true,
					imgs: imgs
				});
				wx.uploadFile({
					filePath: tempFilePaths[0],
					name: 'file',
					url: 'http://localhost:8080/file/uploadFile',
					formData: {
						desc: '图片'
					},
					success: res => {
						that.setData({
							img1:JSON.parse(res.data).fileDownloadUri
						})
					}
				})
			}
		})
	},
	// 删除图片
	deleteImg: function (e) {
		var imgs = this.data.imgs;
		var index = e.currentTarget.dataset.index;
		imgs.splice(index, 1);
		this.setData({
			imgs: imgs,
			hiddenName: false
		})
	},
	// 预览图片
	previewImg: function (e) {
		//获取当前图片的下标
		var index = e.currentTarget.dataset.index;
		//所有图片
		var imgs = this.data.imgs;
		wx.previewImage({
			//当前显示图片
			current: imgs[index],
			//所有图片
			urls: imgs
		})
	},


	//行程卡
	chooseImg2: function (e) {
		var that = this;
		var imgs2 = this.data.imgs2;
		if (imgs2.length >= 9) {
			this.setData({
				lenMore: 1
			});
			setTimeout(function () {
				that.setData({
					lenMore: 0
				});
			}, 2500);
			return false;
		}
		wx.chooseImage({
			// count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				var tempFilePaths = res.tempFilePaths;
				var imgs2 = that.data.imgs2;
				// console.log(tempFilePaths + '----');
				for (var i = 0; i < tempFilePaths.length; i++) {
					if (imgs2.length >= 9) {
						that.setData({
							imgs2: imgs2
						});
						return false;
					} else {
						imgs2.push(tempFilePaths[i]);
					}
				}
				// console.log(imgs);
				that.setData({
					hiddenName2: true,
					imgs2: imgs2
				});
				wx.uploadFile({
					filePath: tempFilePaths[0],
					name: 'file',
					url: 'http://localhost:8080/file/uploadFile',
					formData: {
						desc: '图片'
					},
					success: res => {
						that.setData({
							img2:JSON.parse(res.data).fileDownloadUri
						})
					}
				})
			}
		});
	},
	// 删除图片
	deleteImg2: function (e) {
		var imgs2 = this.data.imgs2;
		var index4 = e.currentTarget.dataset.index4;
		imgs2.splice(index4, 1);
		this.setData({
			imgs2: imgs2,
			hiddenName2: false
		});
	},
	// 预览图片
	previewImg2: function (e) {
		//获取当前图片的下标
		var index4 = e.currentTarget.dataset.index4;
		//所有图片
		var imgs2 = this.data.imgs2;
		wx.previewImage({
			//当前显示图片
			current: imgs2[index4],
			//所有图片
			urls: imgs2
		})
	},


	sendHealth: function () {
		var that = this;
		if (!that.data.name || !that.data.stuID || !that.data.temperature || !that.data.address) {
			wx.showModal({
				title: '请填写完整！'
			})
			return;
		}

		wx.showLoading({
			title: '正在上传中...',
		});
		wx.request({
			url: 'http://localhost:8080/health/add',
			data: {
				'name': that.data.name,
				'userId': that.data.stuID,
				'temperature': that.data.temperature,
				'nowIn': that.data.address,
				'vaccine': that.data.index3,
				'healthCode': that.data.index1,
				'status': that.data.index2,
				'img1': that.data.img1,
				'img2':that.data.img2
			},
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			success: (result) => {
				wx.hideLoading({
					success: (result) => {},
				})
				wx.showToast({
					title: '上传成功',
					icon: 'success',
					duration: 2000,
					success: () => {
						setTimeout(() => {
							wx.navigateBack({
								delta: 0,
							})
						}, 1000);
					}
				})
				console.log(result.data)
				wx.setStorage({
					key:'healthCode',
					data:that.data.index1
				})
			},
			fail: () => {
				wx.hideLoading({
					success: (res) => {},
				})
				wx.showToast({
					title: '上传失败',
					icon: 'error',
					duration: 2000
				})
			}
		});
	},

})