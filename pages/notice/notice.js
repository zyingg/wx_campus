Page({
    data: {
        // 3:需在data中声明一个接收数据的变量。
        list: [],
        username: 'admin'
    },
    onLoad: function (options) {
        wx.request({
            // url: 'https://unidemo.dcloud.net.cn/api/news',
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
})