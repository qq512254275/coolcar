import { userInfoKey } from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    multiItemCount: 1,
    prevMargin: '',
    nextMargin: '',
    vertical: false,
    promotionItems: [
      {
        img: 'https://img1.mukewang.com/62cceaa7000172ed17920764.jpg',
        promotionID: 1,
      },
      {
        img: 'https://img2.mukewang.com/62cf8074000178fa17920764.jpg',
        promotionID: 2,
      },
      {
        img: 'https://img1.mukewang.com/62cceaa7000172ed17920764.jpg',
        promotionID: 3,
      },
      {
        img: 'https://img1.mukewang.com/62cf7fea0001d8c817920764.jpg',
        promotionID: 4,
      },
    ],
    avatarURL: '',
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      avatarURL: wx.getStorageSync(userInfoKey).avatarUrl || '',
      hasUserInfo: wx.getStorageSync(userInfoKey)? true : false,
    })
  },
  onPromotionItemTap(e: any){
    console.log(e)
    const promotionID = e.currentTarget.dataset.promotionID
    if(promotionID){

    }
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
  onRegisterTap(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})