// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: false,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      latitude: 23.099994,
      longitude: 113.324520,
    },
    scale: 10,
    markers: [
      {
      iconPath: "/resources/car.jpeg",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20
      },
      {
        iconPath: "/resources/car.jpeg",
        id: 1,
        latitude: 23.099994,
        longitude: 114.324520,
        width: 50,
        height: 50
        },
    ],
  },
  // 事件处理函数
  bindViewTap() {
    wx.redirectTo({
      url: '../logs/logs?color=blue'
    })
  },
  onLoad() {
    console.log('livesycle: index onLoad')
  },
  onShow(){
    console.log('livesycle: index onShow')
  },
  onHide(){
    console.log('livesycle: index onHide')
  },
  onReady(){
    console.log('livesycle: index onReady')
  },
  onUnload(){
    console.log('livesycle: index onUnload')
  },
  
  onBtnTap(){
    this.setData({
      motto: "button change"
    })
  }
})
