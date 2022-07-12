// pages/register/register.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genders: ['未知','男','女','其他'],
    genderIndex: 0,
    date: '1990-01-01',
    licNo: '',
    name: '',
    licImgURL: '',
    state: 'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',
  },
  onUploadLic(){
    wx.chooseMedia({
      success: res => {
        if(res.tempFiles[0].tempFilePath.length > 0){
          this.setData({
            licImgURL: res.tempFiles[0].tempFilePath
          })
          setTimeout(()=>{
            this.setData({
              licNo: '1345967498',
              name: '张三',
              date: '1989-03-15',
              genderIndex: 1,
            })
          }, 1000)
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
  },
  onSubmit(){
    this.setData({
      state: 'PENDING'
    }),
    setTimeout(() =>{
      this.onLicVerified()
    }, 3000)
  },
  onReSubmit(){
    this.setData({
      state: 'UNSUBMITTED',
      licImgURL: '',
    })
  },
  onLicVerified(){
    this.setData({
      state: 'VERIFIED',
    }),
    wx.redirectTo({
      url: '/page/lock/lock',
    })
  }
})