// pages/category/category.js
import untils from '../../untils/until.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,//设置竖向滚动条位置
    shopTypeList: [],//商品种类
    productItem: [],//种类对应的商品
    curNav: 1,
    curIndex: 0,
    info: "key_1",
    imagesUrl: untils.server + "/upload/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    //获取商品类型
    untils.get('/shop/getType', {}, function (res) {
      console.info("商品种类数据：" + JSON.stringify(res.data))
      if (res.statusCode == 200){
        me.setData({
          shopTypeList: res.data
        })
        untils.get('/shop/getProductItem', {}, function (res) {
          console.info("商品类型具体信息：" + JSON.stringify(res.data))
          me.setData({
            productItem: res.data
          })
          console.info(me.data.productItem['key_1'])
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
  
  },
  //点击类型获取下级商品
  switchRightTab: function (e){
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index
    this.setData({
      curNav: id,
      curIndex: index,
      info: "key_" + (index + 1),
    })
  }
})