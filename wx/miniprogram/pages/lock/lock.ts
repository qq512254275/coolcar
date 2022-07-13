Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarURL: '',
    hasUserInfo: false,
  },
  onload() {
    // const userInfo = await getApp<IAppOption>().globalData.userInfo
    // this.setData({
    //   avatarURL: userInfo?.avatarUrl,
    // })
    
    getApp<IAppOption>().globalData.userInfo.then(userInfo => {
      this.setData({
        avatarURL: userInfo.avatarUrl,
        hasUserInfo: true,
      })
    })
  },
  onGetUserInfo(e: any){
    // const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    // getApp<IAppOption>().resolveUserInfo(userInfo)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    let app = getApp<IAppOption>()
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          avatarURL: res.userInfo.avatarUrl,
          hasUserInfo: true
        })
      }
    })
  }
})