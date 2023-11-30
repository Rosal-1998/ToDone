// wx.request
const { config } = require('../config')

/**
**  @param {string} api     接口地址
**  @param {Object} data    请求参数
**  @param {string} method  请求方法
**/

const request = (api, data, method) => {
    return new Promise((resolve) => {
        if(!api || api == null) resolve('请求url错误')
        wx.request({
            url: config.url + api,
            data: data || {},
            method: method || config.method,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                resolve(res.data)
            },
            fail() {
                resolve("请求发生错误")
            }
        })
    })
}

module.exports = request