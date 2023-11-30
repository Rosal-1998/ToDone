
// 获取小程序当前版本信息 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html
// 自动根据版本切换接口请求地址
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();
let url = '';
switch (envVersion) {
    case 'develop':
        url = `http://127.0.0.1:5000`;
        break;
    case 'trial':
        url = `http://127.0.0.1:5000`;
        break;
    // case 'release':
    //     url = `https://www.cookiew.xyz:1717`;
    //     break;
    default:
        url = `http://127.0.0.1:5000`;
        break;
}

export const config = {
    url,
    method: 'GET'
}