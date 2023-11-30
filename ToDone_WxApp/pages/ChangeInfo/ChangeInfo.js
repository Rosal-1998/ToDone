// pages/ChangeInfo/ChangeInfo.js
import request from '../../utils/request'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      name: '',
      motto: '',

   },


   nameOnChange(event) {
      // event.detail 为当前输入的值
      // 检测现在名字是否改变
      console.log(event.detail);
      this.setData({
         name: event.detail
      })

   },
   mottoOnChange(event) {
      // event.detail 为当前输入的值
      console.log(event.detail);
      this.setData({
         motto: event.detail
      })
   },
   changeInfo() {
      // 提交修改的资料信息
      let wxid = wx.getStorageSync('wxid')
      request('/User/changeInfo', {
         wxid: wxid,
         name: this.data.name,
         motto: this.data.motto
      }, 'GET').then(res => {
         console.log(res)

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