import { userInfoKey, shareLocationKey } from "../../utils/wxapi"
import { routing } from "../../utils/routing"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareLocation: false,
    avatarURL: '',
    hasUserInfo: true,
  },
  async onLoad(opt: Record<'car_id', string>) {
    const o: routing.LockOpts = opt
    console.log('opt.car_id = ', o.car_id)
    // const userInfo = await getApp<IAppOption>().globalData.userInfo
    // this.setData({
    //   avatarURL: userInfo.avatarUrl,
    //   shareLocation: wx.getStorageSync(shareLocationKey) || false,
    // })
    this.setData({
         avatarURL: wx.getStorageSync(userInfoKey).avatarUrl || '',
         hasUserInfo: wx.getStorageSync(userInfoKey)? true : false,
         shareLocation: wx.getStorageSync(shareLocationKey) || false,
    })
  },
  onGetUserInfo(){
    // const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    // getApp<IAppOption>().resolveUserInfo(userInfo)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync(userInfoKey, res.userInfo)
        this.setData({
          avatarURL: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
      }
    })
  },
  onShareLocation(e: any){
    const shareLocation = e.detail.value
    wx.setStorageSync(shareLocationKey, shareLocation)
  },
  onUnlockTap(){
    wx.getLocation({
      type: 'gcj02',
      success: loc => {
        console.log('starting a trip', {
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
          avatarURL: this.data.avatarURL ? this.data.avatarURL : '',
        })
        wx.showLoading({
          title: '开锁中',
          mask: true,
        })
        const trip_id = 'trip456'
        setTimeout(() => {
          wx.redirectTo({
            url: routing.driving({
              trip_id: trip_id
            }),
            complete: () => {
              wx.hideLoading()
            }
          })
        }, 3000)
      },
      fail: ()=>{
        wx.showToast({
          icon: 'none',
          title: '请前往设置页授权位置信息',
        })
      }
    })
    
  }
})