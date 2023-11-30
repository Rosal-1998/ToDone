// pages/TodoList/TodoList.js
// 引入消息框
import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import request from "../../utils/request";
Page({
  data: {
    time: {
      m: "",
      d: "",
      w: "",
    },
    week: ["一", "二", "三", "四", "五", "六", "日"],
    touchS: 0,
    touchE: 0,
    taskId: -1,
    value: "",
    swipeState: false,
    task: [
      {
        state: 1,
        content: "向右滑动完成任务",
      },
      {
        state: 0,
        content: "高数第二章",
      },
      {
        state: 0,
        content: "英语阅读三篇",
      },
      {
        state: 0,
        content: "专业课第五章",
      },
      {
        state: 0,
        content: "充水卡",
      },
      {
        state: 1,
        content: "政治第三章",
      },
      {
        state: 1,
        content: "给大姐买水果",
      },
    ],
    delete: true,
    avatar: "",
  },

  // 获取当前日期
  getTime() {
    var myDate = new Date();
    let that = this;
    this.setData({
      "time.m": myDate.getMonth() + 1,
      "time.d": myDate.getDate(),
      "time.w": this.data.week[myDate.getDay() - 1],
    });
    console.log(this.data.time);
  },

  // 滑动事件，将事件标记为已经完成
  touchStart: function (e) {
    let sx = e.touches[0].pageX;
    this.data.touchS = sx;
  },

  touchMove: function (e) {
    let sx = e.touches[0].pageX;
    this.data.touchE = sx;
  },

  touchEnd: function (e) {
    let start = this.data.touchS;
    let end = this.data.touchE;
    // let state = this.data.task[e.currentTarget.id].state
    let swipeState = this.data.swipeState;
    if (start < end) {
      // 右滑，对未完成任务进行完成，已完成标注未完成。
      if (swipeState) {
        this.setData({
          swipeState: false,
        });
      } else {
        request(
          "/Task/done",
          {
            taskid: e.currentTarget.id, // 任务id
          },
          "GET"
        ).then((res) => {
          this.getTask();
          Notify({
            type: "success",
            message: "任务已完成！",
          });
        });
      }
    } else if (start > end) {
      console.log("左滑");
      console.log(e.currentTarget.id)
      this.deleteTask(e);
    } else {
      console.log("静止");
    }
  },

  swipeOpen() {
    this.setData({
      swipeState: true,
    });
  },

  editTask() {
    console.log("编辑任务");
    wx.navigateTo({
      url: "/pages/EditTask/EditTask",
    });
  },
  // 进入小程序后，拉取该用户数据库中的任务表
  getTask() {
    request(
      "/Task/get",
      {
        wxid: wx.getStorageSync("wxid"),
      },
      "GET"
    ).then((res) => {
      console.log(res);
      this.setData({
        task: res,
      });
    });
  },

  // 添加任务
  addTask(event) {
    // 发送数据给数据库
    request(
      "/Task/add",
      {
        content: event.detail,
        taskid: Date.parse(new Date()),
        wxid: wx.getStorageSync("wxid"),
      },
      "GET"
    ).then((res) => {
      console.log(res);
      if (res == "added") {
        Notify({
          type: "success",
          message: "添加任务成功！",
        });
        this.getTask();
      }
    });
    this.setData({
      value: "", // 清空任务输入框
    });
  },

  // 删除任务
  deleteTask(e) {
    console.log(e);
    console.log("删除任务");
    Dialog.confirm({
      message: "确认删除该事件",
    })
      .then(() => {
        request(
          "/Task/delete",
          {
            taskid: e.currentTarget.id, // 任务id
          },
          "GET"
        ).then((res) => {
          console.log(res);
          if (res == "deleted") {
            this.getTask();
            Notify({
              type: "success",
              message: "删除任务成功！",
            });
          }
        });
      })
      .catch(() => {
        // on cancel
      });
  },

  // 注册新用户
  registUser(wxid) {
    Dialog.confirm({
      message: "一键使用微信账号注册会员",
    })
      .then(() => {
        wx.getUserProfile({
          desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res.userInfo);
            request(
              "/User/regist",
              {
                wxid: wxid,
                avatar: res.userInfo.avatarUrl,
                flower: 0,
              },
              "GET"
            ).then((res) => {
              console.log(res);
              try {
                wx.setStorageSync("name", res);
              } catch (e) {}
              try {
                wx.setStorageSync("wxid", wxid);
              } catch (e) {}
            });
            console.log(res.userInfo.avatarUrl);
            try {
              wx.setStorageSync("avatar", res.userInfo.avatarUrl);
            } catch (e) {}
          },
        });
      })
      .catch(() => {
        // on cancel
      });
  },

  // 检查是否是已经注册的用户，已注册则使用小程序，未注册则注册。
  checkRegist(openID) {
    let that = this;
    request(
      "/User/check",
      {
        wxid: openID,
      },
      "GET"
    ).then((res) => {
      console.log(res);
      if (res == "NotRegist") {
        this.registUser(openID);
      }
    });
  },

  onLoad: function (options) {
    this.getTime(); // 获取当前日期
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              appid: "wxf528fdc54cee85b2",
              secret: "d620b50bcb3bae8b32c0f902d9c77a48",
              js_code: res.code,
              grant_type: "authorization_code",
            },
            success(res) {
              console.log(res.data);
              that.checkRegist(res.data.openid);
            },
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
    this.getTask();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
