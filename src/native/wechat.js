
/**
 * wechat inner browser native call
 */

import { loadJS } from '../utils'
import { Apps, SUPPORT, OS } from '../constants'
import Invoker from '../invoker'

export default class WeChat extends Invoker {
  constructor (context) {
    super(context)
    this.wechatConfig = this.context.shareData.wechat
    this.supportType = SUPPORT.LEVEL4
    if (this.wechatConfig) {
      this.preload()
    }
  }
  preload () {
    this.loader = loadJS('//res.wx.qq.com/open/js/jweixin-1.2.0.js').then(() => {
      wx.config({
        debug: this.wechatConfig.debug || false,
        appId: this.wechatConfig.appId,
        timestamp: this.wechatConfig.timestamp,
        nonceStr: this.wechatConfig.nonceStr,
        signature: this.wechatConfig.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
      })
      const shareData = this.context.shareData
      const dataWechatNeed = {
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.icon,
        success: () => {},
        cancel: () => {}
      }
      wx.ready(() => {
        wx.onMenuShareTimeline(dataWechatNeed)
        wx.onMenuShareAppMessage(dataWechatNeed)
        wx.onMenuShareQQ(dataWechatNeed)
        wx.onMenuShareQZone(dataWechatNeed)
      })
      wx.error((res) => {
        throw new Error('wechat config error: ' + res)
      })
      return true
    })
    return this.loader
  }
  preset () {
    return true
  }
  isSupport (appName) {
    if (OS.WINDOWS === this.context.osName) {
      return Apps.MOMENTS === appName || Apps.WECHAT === appName
    }
    return Apps.WEIBO !== appName
  }
  invoke (appName) {
    return this.loader
  }
}
