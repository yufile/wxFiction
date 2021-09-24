// pages/bookcase/bookcase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldatalist: [],
    isShow: true
  },
  getBookCASE() {
    let code = wx.getStorageSync('userinfo').code
    wx.request({
      url: `https://www.yucloud.website/userinfo/getwxbookrack?code=${code}`,
      success: res => {
       this.setData({
         alldatalist: res.data.data
       })
      }
    })
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
  parentComponentFunction() {
    this.onShow()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBookCASE()
    let code = wx.getStorageSync('userinfo').code
    if(code) {
      this.setData({
        isShow: false
      })
    }else {
      this.setData({
        isShow: true
      })
    }
  },
 
})