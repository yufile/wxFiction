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
      console.log()
      wx.navigateTo({
        url: '/pages/bookpage/bookpage?item='+ JSON.stringify(item),
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
