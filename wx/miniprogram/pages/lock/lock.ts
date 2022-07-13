
const shareLocationKey = "share_location"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareLocation: false,
    avatarURL: '',
    hasUserInfo: false,
  },
  async onload() {
    const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      avatarURL: userInfo?.avatarUrl,
      shareLocation: wx.getStorageSync(shareLocationKey) || false,
    })
    
    // app.globalData.userInfo.then(userInfo => {
    //   this.setData({
    //     avatarURL: userInfo.avatarUrl,
    //     hasUserInfo: true,
    //   })
    // })
    // this.setData({
    //   shareLocation: wx.getStorageSync(shareLocationKey) || false,
    // })
  },
  onGetUserInfo(e: any){
    // const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    // getApp<IAppOption>().resolveUserInfo(userInfo)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    let app = getApp<IAppOption>()
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        app.resolveUserInfo(userInfo)
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
  }
})