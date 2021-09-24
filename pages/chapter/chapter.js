// pages/chapter/chapter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    pid: '',
    le: 0,
    isNone: false,
    bs: '35rpx',
    chapter: [],
    sizeValue: 35 ,
    show: false,
    show1: false,
    radio: '1',
    styleBack:{
      background:'bisque',
      color: '#000'
    },
    backTop: 0,
  },
  onChangeBack(event) {
    let obj = {}
    this.setData({
      radio: event.detail,
    });
    if(event.detail==1){
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项
        backgroundColor: '#000', // 传递的颜色值
      })
       obj = {
        background: 'bisque',
        color: '#000',
        topBack:"#000",
        radio: '1'
      }
      this.setData({
        styleBack:{
          background: 'bisque',
          color: '#000'
        }
      })
    }else if(event.detail==2) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项
        backgroundColor: '#37904c', // 传递的颜色值
      })
       obj = {
        background: '#49C266FF',
        color: '#000',
        topBack:"#37904c",
        radio: '2'
      }
      this.setData({
        styleBack: {
          background: '#49C266FF',
          color: '#000'
        }
      })
    }else if(event.detail==3) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项
        backgroundColor: '#505050', // 传递的颜色值
      })
       obj = {
        background: '#505050',
        color: '#000',
        topBack:"#505050",
        radio: '3'
      }
      this.setData({
        styleBack: {
          background: '#505050',
          color: '#000'
        }
      })
    }else if(event.detail==4) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项
        backgroundColor: '#000', // 传递的颜色值
      })
       obj = {
        background: '#000',
        color: '#fff',
        topBack:"#000",
        radio: '4'
      }
      this.setData({
        styleBack: {
          background: '#000',
          color: '#fff'
        }
      })
    }
    wx.setStorage({
      key:"color",
      data:obj,
    })
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前字体大小：${event.detail}`,
    });
    let obj = {
      stylesize: event.detail + 'rpx',
      valuesize: event.detail
    }
    wx.setStorage({
      key: 'sizeValue',
      data: obj
    })
    this.setData({
      bs:event.detail+'rpx'
    })
  },
  onClose() {
    this.setData({
      show1: false
    })
  },
  setStyle() {
    this.setData({
      show1: true
    })
  },
  // 下一章
  nextTo () {
    this.setData({
      show1: false
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getChapter(this.data.id,++this.data.pid)
    this.setData({
      pid: this.data.pid
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration:false
    })
  },
  upTo() {
    this.setData({
      show1: false
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration:false
    })
    this.getChapter(this.data.id,--this.data.pid)
    this.setData({
      pid: this.data.pid
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      pid: options.pid,
      le: options.le
    })
   
    let styleBack = wx.getStorageSync("color");
    let styleSize = wx.getStorageSync("sizeValue")
    if(styleSize) {
      this.setData({
        bs: styleSize.stylesize,
        sizeValue:styleSize.valuesize
      })
    }
    if(styleBack) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项
        backgroundColor: styleBack.topBack, // 传递的颜色值
      })
      this.setData({
        styleBack:styleBack,
        radio: styleBack.radio
      })
    }
    wx.showLoading({
      title: '加载中...',
    })
    this.getChapter(options.id,options.pid);
    
  },
  getChapter(id,pid) {
    let page = wx.getStorageSync('pageNow');
    let arr = []
    if(page) {
       arr = page
    }else {
       arr = [
        {chapterid:id,pid:pid}
      ]
    }
   let a;
    if(arr) {
       a = arr.findIndex(item => {
        return item.chapterid == id
      })
      if(a==-1){
        arr.push({chapterid:id,pid:pid})
      }else {
        arr[a].pid = pid
      }
    }
    wx.setStorage({
      key:"pageNow",
      data: arr
    });
    wx.request({
      url: `https://www.yucloud.website/login/${id}/${id}?pid=${pid}`,
      success: res => {
        this.setData({
          chapter: res.data.data[0]
        })
        this.setData({
          isNone: true
        })
        wx.hideLoading()
        wx.setNavigationBarTitle({title: res.data.data[0].title })
      }
    })
  },
  catalogue() {
    this.setData({
      show: true
    })
    this.selectComponent(".catalogue2").getlist()
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