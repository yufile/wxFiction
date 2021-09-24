// components/alldatalist/alldatalist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    alldatalist:{
      type:Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    alldata: []
  },
  observers: {
    alldatalist (alldatalist) {
      if (!alldatalist.length) {
        return;
      }
     this.setData({
       alldata: alldatalist
     })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      let item = e.currentTarget.dataset;
      wx.navigateTo({
        url: '/pages/bookpage/bookpage?item='+ JSON.stringify(item),
      })
    },
    deleteBook(e) {
      let id = e.target.dataset.id;
      let code = wx.getStorageSync('userinfo').code
      wx.request({
        url: `https://www.yucloud.website/userinfo/deletewxbook?code=${code}&id=${id}`,
        success: res => {
          this.triggerEvent('parentComponentFunction');
        }
      })
    },
    imageError(e) {
      let id = e.currentTarget.dataset.id;
      let data = this.data.alldata
      data[id].img = '/public/img/my.jpg';
      this.setData({
        alldata: data
      })
    }
  }
})
