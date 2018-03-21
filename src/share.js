
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
    this.instance = null
  }

  to (appName, callback) {
    let supportNative = false
    let BrowserShareClass
    if (this.context.browserName !== undefined &&
      nativeList[this.context.browserName]) {
      BrowserShareClass = nativeList[this.context.browserName]
      if (BrowserShareClass.appMap[appName]) {
        supportNative = true
      }
    }

    let noneSupport = false
    if (supportNative) {
      this.instance = new BrowserShareClass(this.context)
    } else {
      const UrlShareClass = urlList[appName]
      if (UrlShareClass) {
        this.instance = new UrlShareClass(this.context)
      } else {
        noneSupport = true
      }
    }

    if (!noneSupport) {
      try {
        this.instance.share(appName)
      } catch (error) {
        console.warn(error)
        noneSupport = true
      }
    }

    if (noneSupport) {
      callback && callback()
    }
  }
}
