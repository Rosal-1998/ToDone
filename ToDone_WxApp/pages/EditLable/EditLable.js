import request from '../../utils/request'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  data: {
    show: {
      primary: true,
      success: true,
      newLabel: '',
    },
    lable: {}
  },
  onClose(event) {
    this.setData({
      [`show.${event.target.id}`]: false,
    });
  },
  addLabel() {
    console.log('添加标签')
    request('/Label/add', {
      labelmasterid: wx.getStorageSync('wxid'),
      labelcontent: this.data.newLabel
    }, 'GET').then(res => {
      console.log(res)
      this.setData({
        newLabel: '',
      })
      this.getLabel()
      Notify({
        type: 'success',
        message: '添加标签成功！'
      });
    })
  },
  getLabel() {
    // 获取用户标签
    request('/Label/get', {
      labelmasterid: wx.getStorageSync('wxid')
    }, 'GET').then(res => {
      console.log(res)
      this.setData({
        label: res
      })
    })
  },
  labelOnChange(event) {
    console.log(event.detail)
    this.setData({
      newLabel: event.detail
    })
  },
  onClose(event) {
    console.log('删除标签')
    console.log()
    request('/Label/delete', {
      labelid: event.currentTarget.id
    }, 'GET').then(res => {
      console.log(res)
      this.getLabel()
    })
  },
  onLoad: function (options) {
    this.getLabel();

  },
});