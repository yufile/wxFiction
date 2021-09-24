// pages/serch/serch.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:{
      primary: true
    },
    tagvalue: [],
    alldatalist: []

  },
  onCancel() {
    this.setData({
      alldatalist: []
    })
  },
  onClose(event) {
    console.log(event)
  },
  onClose() {
    this.setData({
      tagvalue: [],
    })
  },
  onSearch(e) {
    let arr = []
    for(let i in this.data.tagvalue)
    arr.push(this.data.tagvalue[i])
    arr.push(e.detail)
    if(e.detail !=''){
      this.setData({
        tagvalue: arr
      })
    }
    
    this.getAllDataList(e.detail)
  },
  getAllDataList(value) {
    if(value != ''){
      wx.showLoading({title: '加载中'})
      wx.request({
        url: 'https://www.yucloud.website/login/title/data',
        success: res => {
          let v = new RegExp(value,'gi');
          if(value){
            let dataArr = []
            dataArr = res.data.data.filter(item => {
              return v.test(item.bigtitle)
            })
            this.setData({
              alldatalist: dataArr
            })
          }
          wx.hideLoading()
      }
    })
  }else {
    this.setData({
      alldatalist: []
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})