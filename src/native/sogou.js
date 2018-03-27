
/**
 * Sogou support
 */
import Native from './native'
import { Apps } from '../constants'

export default class Sogou extends Native {
  constructor (context) {
    super(context)
  }
  static appMap = {
    [Apps.WECHAT]: 2,
    [Apps.MOMENTS]: 4
  }
  static isSupport (context, appName) {
    return undefined !== Sogou.appMap[appName]
  }
  share (appName) {
    const dataSogouNeed = {
      shareTitle: this.shareData.title,
      shareContent: this.shareData.desc,
      shareImageUrl: this.shareData.icon,
      shareUrl: this.shareData.link
    }
    window.shareInfo = dataSogouNeed
    SogouMse.Utility.shareWithInfo(dataSogouNeed)
  }
}
