//index.js
//获取应用实例
const app = getApp()
import untils from '../../untils/until.js'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banners: ['../../images/banner01.jpg', '../../images/banner02.jpg', '../../images/banner03.jpg', '../../images/banner04.jpg'],
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.info(windowHeight)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
    wx.getSystemInfo({
      success: res => {
        this.setData({
          pageWidth: res.windowWidth,
          pageHeight: res.windowHeight
        })
      }
    })
    
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //swiper

  //点击精选主题跳转到分类页面
  goCategoryPage: function(){
    
  }
})
