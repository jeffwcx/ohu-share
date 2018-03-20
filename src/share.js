
import Detector from 'ohu-detect'
import Context from './context'
import urlList from './url'
import nativeList from './native'
/**
 * import { Share, Browsers, Apps } from 'ohu-share'
 *
 * const share = new Share({
 *   title: 'title',
 *   desc: 'desc',
 *   icon: 'icon',
 *   link: 'link',
 *   from: 'from'
 * })
 *
 * share.to(App.WECHAT)
 *
 * share.mount({
 *   Apps.WECHAT: '#wechat',
 *   Apps.MOMENTS: '#moments',
 *   Apps.QQ: '#qq',
 *   Apps.QZONE: '#qzone',
 *   Apps.WEIBO: '#weibo',
 *   Apps.ALIPAY: '#alipay'
 * })
 */

export default class Share {
  constructor (shareData) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareData, browserInfo)
    this._getShareBrowser()
  }
  _getShareBrowser () {
    if (this.context.browserName !== undefined) {
      const BrowserShareClass = nativeList[this.context.browserName]
      if (BrowserShareClass) {
        this.supportNative = true
        this.instance = new BrowserShareClass(this.context)
        return
      }
    }
    this.supportNative = false
  }

  to (appName, notSupportCall) {
    if (!this.supportNative) {
      const UrlShareClass = urlList[appName]
      if (UrlShareClass) {
        this.instance = new UrlShareClass(this.context)
      } else {
        notSupportCall(this.context)
      }
    }
    try {
      this.instance.share(appName)
    } catch (error) {
      notSupportCall(this.context)
    }
  }
}
