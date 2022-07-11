// pages/register/register.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    licImgURL: undefined as string | undefined
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
})