// components/catalogue/catalogue.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type: Boolean,
      value: false
    },
    sectionid:{
      type: String,
      value: ''
    }
  },
  
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
     
    },
    hide: function () { },
    resize: function () {  },
  },
  /**
   * 组件的初始数据
   */
  data: {
    pageid: 1,
    sectiondata: [],
    OneSectionHeight: 0,
    showBottom: false,
    sectionlength: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    over() {
      this.setData({
        show: false
      })
    },
    getBookPage(id,pageid) {
      if(this.data.sectiondata.length == 0 || pageid > 1){
        if(this.data.sectiondata.length == 0) {
          wx.showLoading({
            title: '获取章节目录中...',
            mask: true
          })
        }
        wx.request({
          url: `https://www.yucloud.website/login/${id}?page=${pageid}`,
          success: res => {
            let arr = []
            if(this.data.sectiondata.length != 0)
            for(let i in this.data.sectiondata){
              arr.push({title:this.data.sectiondata[i].title,pid:this.data.sectiondata[i].pid})
            }
            for(let j in res.data.data){
              arr.push({title:res.data.data[j].title,pid:res.data.data[j].pid})
            }
            this.setData({
              sectiondata: arr,
              sectionlength: res.data.le
            })
              let query = wx.createSelectorQuery().in(this);
              //选择id
              query.select('#section').boundingClientRect()	//wsy需要获取的元素class
              query.exec(res => {
                this.setData({
                  OneSectionHeight: res[0].height * 400
                })
              })
            wx.hideLoading()
          }
        })
      }
      
    },
    getlist() {
      this.getBookPage(this.properties.sectionid,this.data.pageid); 
    },
    touchStart(e) {
      let num = (this.data.OneSectionHeight*this.data.pageid) -  e.target.offsetTop;
      if( num < 1000 && this.data.pageid < ((this.data.sectionlength / 400) ) ){
        wx.showLoading({
          title: '加载中...',
        })
        this.getBookPage(this.properties.sectionid,++this.data.pageid)
      }
      if(this.data.pageid == parseInt((this.data.sectionlength / 400)+1 )) {
        setTimeout(()=>{
          this.setData({
            showBottom: true
          })
        },300)
      
      }
    },
    onClick(e) {
      let pid = e.currentTarget.dataset.id;
      let id = this.properties.sectionid;
      let datalength = this.data.sectionlength;
      wx.redirectTo({
        url: `/pages/chapter/chapter?id=${id}&pid=${pid}&le=${datalength}`,
      })
      
    }
  }
})
