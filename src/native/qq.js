
/**
 * QQ inner browser native call
 */

import Native from './native'
import { loadJS } from '../utils'
import { Apps } from '../constants'

export default class QQ extends Native {
  constructor (context) {
    super(context)
    if (!window.mqq) {
      this.loadApi = loadJS('//open.mobile.qq.com/sdk/qqapi.js?_bid=152')
    } else {
      this.loadApi = Promise.resolve()
    }
  }
  static appMap = {
    [Apps.WECHAT]: 2,
    [Apps.MOMENTS]: 3
  }
  static isSupport (context, appName) {
    return QQ.appMap[appName] !== undefined
  }
  share (appName) {
    const dataQQNeed = {
      title: this.shareData.title,
      desc: this.shareData.desc,
      share_url: this.shareData.link,
      image_url: this.shareData.icon,
      share_type: QQ.appMap[appName]
    }
    return this.loadApi.then(() => {
      mqq.ui.shareMessage(dataQQNeed, function (e) {})
      return true
    })
  }
}
