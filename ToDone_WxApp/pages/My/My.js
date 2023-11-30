Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    changePopup:false,
    name:'',
    motto:''
  },


  IntoChangeInfoPage(){
    wx.navigateTo({
      url: '/pages/ChangeInfo/ChangeInfo',
    })
  },

  IntoEditLablePage(){
    wx.navigateTo({
      url: '/pages/EditLable/EditLable',
    })
  },

  onLoad() {
    let that = this
    try {
      var avatar = wx.getStorageSync('avatar')
      console.log(avatar)
      that.setData({
        ['userInfo.avatarUrl']: wx.getStorageSync('avatar'),
        ['userInfo.name']: wx.getStorageSync('name')
      })
      console.log('成功？')
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },


})