// pages/bookstore/bookstore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alldatalist: [],
    fandatalist: [],
    citydatalist: [],
    erodatalist: [],
    dataindex: 0, // 当前是哪个数据下标
    // 页码
    allindex: 1,
    fanindex: 1,
    cityindex: 1,
    eroindex: 1,
    // 分类各个总数据
    alllength: 0,
    fanlength: 0,
    citylength: 0,
    erolength: 0
    
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/serch/serch',
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
    if(this.data.alldatalist.length == 0){
      wx.showLoading({title:'加载中',mask: true})
    }
    this.getAllDataList(this.data.allindex)
  },
  getAllDataList(id) {
    wx.request({
      url: 'https://www.yucloud.website/login/title?page='+id,
      success: res => {
        let arr = [];
        // 第一次 alldatalist空 
        for(let i in this.data.alldatalist)
        arr.push(this.data.alldatalist[i])
        for(let i in res.data.data)
        arr.push(res.data.data[i])
       this.setData({
         alldatalist: arr,
         alllength: res.data.le
       })
      //  console.log(arr)
       wx.hideLoading()
      //  console.log(res)
      }
    })
  },
  getFanDataList(id) {
    wx.request({
      url: 'https://www.yucloud.website/content/fantitle?page='+id,
      success: res => {
        let arr = [];
        for(let i in this.data.fandatalist)
        arr.push(this.data.fandatalist[i])
        for(let i in res.data.data)
        arr.push(res.data.data[i])
       this.setData({
         fandatalist: arr,
         fanlength: res.data.le
       })
       wx.hideLoading()
      }
    })
  },
  getCityDataList(id) {
    wx.request({
      url: 'https://www.yucloud.website/city/citytitle?page=1',
      success: res => {
        let arr = [];
        for(let i in this.data.citydatalist)
        arr.push(this.data.citydatalist[i])
        for(let i in res.data.data)
        arr.push(res.data.data[i])
       this.setData({
         citydatalist: arr,
         citylength: res.data.le
       })
       wx.hideLoading()
      }
    })
  },
  getEroDataList(id) {
    wx.request({
      url: 'https://www.yucloud.website/erotica/erotitle?page=1',
      success: res => {
        let arr = [];
        for(let i in this.data.erodatalist)
        arr.push(this.data.erodatalist[i])
        for(let i in res.data.data)
        arr.push(res.data.data[i])
       this.setData({
         erodatalist: arr,
         erolength: res.data.le
       })
       wx.hideLoading()
      }
    })
  },
  onChange(event) {
    if(event.detail.index == 0) {
      if(this.data.fandatalist.length == 0){
        wx.showLoading({title:'加载中',mask: true});
        this.getAllDataList(this.data.allindex);
      }
      this.setData({
        dataindex: 0,
      })
    }else if(event.detail.index == 1) {
      if(this.data.fandatalist.length == 0){
        wx.showLoading({title:'加载中',mask: true});
        this.getFanDataList(this.data.fanindex);
      }
      this.setData({
        dataindex: 1,
      })
    }else if(event.detail.index == 2) {
      if(this.data.citydatalist.length == 0){
        wx.showLoading({title:'加载中',mask: true})
        this.getCityDataList(this.data.cityindex);
      }
      this.setData({
        dataindex: 2,
      })
    }else if(event.detail.index == 3) {
      if(this.data.erodatalist.length == 0){
        wx.showLoading({title:'加载中',mask: true});
        this.getEroDataList(this.data.eroindex);
      }
      this.setData({
        dataindex: 3,
      })
    }
  },
    antiShake(fun,wait) {
      let timer = null;
      return function (){
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
              fun()
          },wait)
      }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let dataindex = this.data.dataindex;
    let data = this.data;
    if(dataindex == 0){
      // 获取总共长度数据'
      if(data.allindex < (data.alllength / 30) + 1){
        wx.showLoading({title:'加载中',mask: true});
        this.antiShake(this.getAllDataList(++this.data.allindex),300)
      }

    }else if(dataindex == 1) {
      if(data.fanindex < (data.fanlength / 30) + 1){
        wx.showLoading({title:'加载中',mask: true})
        this.antiShake(this.getFanDataList(++this.data.fanindex),300)
      }
    }else if(dataindex == 2) {
      if(data.cityindex < (data.citylength / 30) + 1){
        wx.showLoading({title:'加载中',mask: true})
        this.antiShake(this.getCityDataList(++this.data.cityindex),300)
      }
    }else if(dataindex == 3) {
      if(data.eroindex < (data.erolength / 30) + 1){
        wx.showLoading({title:'加载中',mask: true})
        this.antiShake(this.getEroDataList(++this.data.eroindex),300)
      }
    }
  },
})