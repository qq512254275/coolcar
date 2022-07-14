const centPerSec = 0.7

function formatDuration(sec: number){
  const padString = (n: number) => 
  n < 10 ? '0'+n.toFixed(0) : n.toFixed(0)
  const h = Math.floor(sec/3600)
  sec -= 3600*h
  const m = Math.floor(sec/60)
  sec -= 60 * m
  const s = Math.floor(sec)
  return `${padString(h)}:${padString(m)}:${padString(s)}`
}

function formatFee(cents: number){
  return (cents/100).toFixed(2)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      latitude: 40.92,
      longitude: 119.46,
    },
    scale: 14,
    elapsed: '00:00:00',
    fee: '0.00',
  },
  onLoad(opt){
    console.log('opt.trip_id = ', opt.trip_id)
    this.setupLocationUpdator()
    this.setupTimer()
  },
  onUnload(){
    wx.stopLocationUpdate()
  },
  setupLocationUpdator(){
    wx.startLocationUpdate({
      fail: console.error
    })
    wx.onLocationChange(loc => {
      console.log('location: ', loc)
      this.setData({
        location:{
          latitude: loc.latitude,
          longitude: loc.longitude
        }
      })
    })
  },
  setupTimer(){
    let elapsedSec = 0
    let cents = 0.00
    setInterval(()=>{
      elapsedSec++
      cents += centPerSec
      this.setData({
        elapsed: formatDuration(elapsedSec),
        fee: formatFee(cents)
      })
    },1000)
  }
})