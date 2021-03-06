// index.ts
// 获取应用实例
//const app = getApp<IAppOption>()
import { routing } from "../../utils/routing"
import { userInfoKey } from "../../utils/wxapi"

Page({
  showMoveCar: false,
  data: {
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: false,
      subKey: '',
      layerStyle: 1,
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
        width: 20,
        height: 20
        },
    ],
    hasUserInfo: false,
    avatarURL: '',
  },
  onLoad(){
    this.setData({
      avatarURL: wx.getStorageSync(userInfoKey).avatarUrl || '',
      hasUserInfo: wx.getStorageSync(userInfoKey).avatarUrl? true: false,
    })
    console.log(this.data.avatarURL)
  },
  onShow(){
    this.showMoveCar = true
  },
  onHide(){
    this.showMoveCar = false
  },
  onMyLocationTap(){
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请前往设置页授权'
        })
      }
    })
  },
  dest: {
    latitude: 23.099994,
    longitude: 113.324520,
  },
  moveCars(){
    const map = wx.createMapContext("map")
    const moveCar = () =>{
      this.dest.latitude += 0.1
      this.dest.longitude += 0.1
      map.translateMarker({
        destination: {
          latitude: this.dest.latitude,
          longitude: this.dest.longitude,
        },
        markerId: 0,
        autoRotate: false,
        rotate: 0,
        duration: 5000,
        animationEnd: () => {
          if(this.showMoveCar){
            moveCar()
          }
        },
      })
    }
    moveCar()
  },
  onScanTap(){
    wx.scanCode({
      success: () =>{
        const car_id = 'car123'
        const redirectUrl = routing.lock({
          car_id: car_id
        })
        wx.navigateTo({
          url: routing.register({
            redirectURL: redirectUrl
          })
        })
      },
      fail: console.error,
    })
  },
  onMyTripsTap(){
    wx.navigateTo({
      url: routing.mytrips()
    })
  }
})
