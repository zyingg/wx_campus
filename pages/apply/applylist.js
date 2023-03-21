Page({
  data: {
    List:'',
    replay: [],
  },
  onLoad: function (options) {
  },

  onReady: function () {
  },
  doReplay: function (e) {
    this.setData({
      replay: e.detail.value
    })
  },
  agree:function (event) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/apply/apply',
      data: {
        id:event.target.dataset.id,
        replay:event.target.dataset.replay,
        reasonId: 99
      },
      success: function (d) {
        if(d.data.msg == "成功"){
          that.onshow();
        }
      }
    })
	},


	
//请求路径apply
  disagree:function (event) {
    var that = this
    wx.showActionSheet({
      itemList: ['格式错误','出行地点不允许','时间填写错误'],
      success:function (res) {
        if(!res.cancel){
          wx.request({
            url: 'http://127.0.0.1:8080/apply/apply',
            data: {
              id:event.target.dataset.id,
              replay:event.target.dataset.replay,
              reasonId:res.tapIndex,
            },
            success: function (d) {
              if(d.data.msg == "成功"){
                that.onShow();
              }
            }
          })
        }
      }
    })
	},

	

 //请求路径applylist
  onShow: function () {
    var that = this;
    wx.request({
			url: 'http://127.0.0.1:8080/apply/applylist',
      data:{id:wx.getStorageSync('id')},
      success: function (d) {
        that.setData({
          List: d.data.data
        })
      }
    })
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})