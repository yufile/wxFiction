// pages/bookpage/bookpage.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    pagedata: [],
    show: false,
    sectionid: "",
    addBook: false,
    stop:true,
    comment: [
      {name: '南长',remark:'追了那么长时间了感觉后面的剧情没有之前好了都不想看了。'},
      {name: '小七',remark:'很喜欢看小说，基本上每本小说都会看完，这部小说也不会例外。'},
      {name: '凶',remark:'这本小说的情节真的是爱了呀。'},
      {name: '侦查员',remark:'这本小说的情节真的绝了啊，一天就看了两百章真的好好看。'},
      {name: '我是小优',remark:'写个评论真难啊我又没看过。'},
      {name: '默默',remark:'又默默的为自己捏了一把汗。'},
    ]
  },
  // 图片加载失败调用
  geterr(e) {
    let arr = this.data.pagedata;
    for(let i in arr ) {
      arr[i].img = '../../public/img/my.jpg'
    }
    this.setData({
      pagedata: arr
    })
  },
  promptly() {
    let id = this.data.sectionid;
    let pid = 0
    let page = wx.getStorageSync('pageNow');
    if(page){
      let a = page.findIndex(item => {
        return item.chapterid == id
      })
      if(a != -1) {
        pid = page[a].pid
      }
    }
    wx.navigateTo({
      url: `/pages/chapter/chapter?id=${id}&pid=${pid}`,
    })
  },
  add() {
    let data = this.data.pagedata;
    let code = wx.getStorageSync('userinfo').code
    data.code = code
    data = JSON.stringify(data);
    wx.request({
      url: `https://www.yucloud.website/userinfo/wxbookrack?query=${data}`,
      success: res => {
        this.setData({
          addBook: true
        })
      }
    })
  },
  onClick() {
    this.setData({
      show: true
    })
    this.selectComponent("#catalogue").getlist()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.item).item;
    let code = wx.getStorageSync('userinfo').code
    if(code == undefined){
      this.setData({
        stop: true
      })
    }else {
      this.setData({
        stop: false
      })
    }
    this.setData({
      pagedata: data,
      sectionid: data.id
    });
   wx.request({
     url: `https://www.yucloud.website/userinfo/getwxbookrack?code=${code}`,
     success: res => {
       let isActive = res.data.data.findIndex(item => {
         return item.id == data.id
       })
       let sy = isActive == -1 ? false : true
       this.setData({
         addBook: sy
       })
     }
   })
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