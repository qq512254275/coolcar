import { IAppOption } from "./appoption"
import { getSetting, getUserInfo } from "./utils/wxapi"

let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void
// app.ts
App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve,reject)=>{
      resolveUserInfo = resolve
      rejectUserInfo = reject
    })
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    getSetting().then(res => {
      if(res.authSetting['scope.userInfo']){
        return getUserInfo()
      }
      return undefined
    }).then(res => {
      if(!res){
        return
      }
      resolveUserInfo(res.userInfo)
    }).catch(rejectUserInfo)
    // wx.request({
    //   url: 'http://localhost:8080/trip/trip123',
    //   method: 'GET',
    //   success: res => {
    //     const getTripRes = coolcar.GetTripResponse.fromObject(
    //       camelcaseKeys(res.data as Object, {
    //         deep: true,
    //       }))
    //     console.log(getTripRes)
    //   },
    //   fail: console.error,
    // })
    //登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo){
    resolveUserInfo(userInfo)
  }
})