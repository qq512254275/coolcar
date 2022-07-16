import { routing } from "../../utils/routing"
import { userInfoKey } from "../../utils/wxapi"

interface Trip {
  id: string
  start: string
  end: string
  duration: string
  fee: string
  sistance: string
  status: string
}

interface MainItem {
	id: string
	navId: string
	navScrollId: string
	data: Trip
}

interface NavItem {
	id: string
	mainId: string
	label: string
}

interface MainItemQuery {
	id: string
	top: number
	dataset: {
		navId: string
		navScrollId: string
	}
}

Page({
	scrollStates: {
		mainItems: [] as MainItemQuery[],
	},
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
	tripsHeight: 0,
	mainItems: [] as MainItem[],
	navItems: [] as NavItem[],
	mainScroll: '',
	navCount: 0,
	navSel: '',
	navScroll: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      avatarURL: wx.getStorageSync(userInfoKey).avatarUrl || '',
      hasUserInfo: wx.getStorageSync(userInfoKey)? true : false,
    })
	this.poplatteTrips()
  },
  onReady(){
	wx.createSelectorQuery().select('#heading').
		boundingClientRect(rect => {
			const height = wx.getSystemInfoSync().windowHeight - rect.height
			this.setData({
				tripsHeight: height,
				navCount: Math.round(height/50),
			})
		}).exec()
  },
  poplatteTrips(){
	const mainItems: MainItem[] = []
	const navItems: NavItem[] = []
	let navSel = '', prevNav = ''
	for (let i = 0; i <100; i++) {
		const mainId = 'main-' + i
		const navId = 'nav-' + i
		const tripId = (10001+i).toString()
		if(!prevNav){
			prevNav = navId
		}
		mainItems.push({
			id: mainId,
			navId: navId,
			navScrollId: prevNav,
			data:{	
				id: tripId,
				start: '东方明珠',
				end: '迪士尼',
				duration: '27.0公里',
				fee: '0时44分',
				sistance: '128.00元',
				status: '已完成'
			}
		})
		navItems.push({
			id: navId,
			mainId: mainId,
			label: tripId
		})
		if(i === 0){
			navSel = navId
		}
		prevNav = navId
	}
	this.setData({
		mainItems,
		navItems,
		navSel
	}, () => {
		this.prepareScrollStates()
	})
  },

  prepareScrollStates(){
	wx.createSelectorQuery().selectAll('.main-item').fields({
		id: true,
		dataset: true,
		rect: true,
	}).exec(res => {
		this.scrollStates.mainItems = res[0]
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
      url: routing.register()
    })
  },
  onNavItemTap(e: any){
	const mainId: string = e.currentTarget?.dataset?.mainId
	const navId: string = e.currentTarget?.dataset?.id
	if(mainId && navId){
		this.setData({
			mainScroll: mainId,
			navSel: navId
		})
	}
  },
  onMainScroll(e: any){
	const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
	if(top === undefined){
		return
	}
	const selItem = this.scrollStates.mainItems.find(
		v=> v.top >= top)
	if(!selItem){
		return
	}
	this.setData({
		navSel: selItem.dataset.navId,
		navScroll: selItem.dataset.navScrollId
	})
  }
})