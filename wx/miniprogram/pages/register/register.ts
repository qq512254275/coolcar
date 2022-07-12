// pages/register/register.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genders: ['未知','男','女','其他'],
    genderIndex: 0,
    date: '1990-01-01',
    licImgURL: '/resources/sedan.png' as string | undefined
  },
  onUploadLic(){
    wx.chooseMedia({
      success: res => {
        if(res.tempFiles[0].tempFilePath.length > 0){
          this.setData({
            licImgURL: res.tempFiles[0].tempFilePath
          })
        }
      },
    })
  },
  onGenderChange(e: any){
    this.setData({
      genderIndex: e.detail.value,
    })
  },
  onBirsdayChange(e: any){
    this.setData({
      date: e.detail.value,
    })
  }
})