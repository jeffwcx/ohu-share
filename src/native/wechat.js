
/**
 * wechat inner browser native call
 */

import Native from './native'
import { loadJS } from '../utils'
import { Apps } from '../constants'

export default class WeChat extends Native {
  constructor (context) {
    super(context)
    const wechatConfig = this.context.shareData.wechat
    if (wechatConfig && !this.loadApi) {
      // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
      this.loadApi = loadJS('//res.wx.qq.com/open/js/jweixin-1.2.0.js').then(() => {
        wx.config({
          debug: wechatConfig.debug || false,
          appId: wechatConfig.appId,
          timestamp: wechatConfig.timestamp,
          nonceStr: wechatConfig.nonceStr,
          signature: wechatConfig.signature,
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
        wx.error((res) => {})
        return true
      })
    }
  }
  static isSupport (context, appName) {
    return appName !== Apps.WEIBO
  }
  share (appName) {}
}
