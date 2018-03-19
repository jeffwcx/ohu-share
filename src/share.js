
import Detector from 'ohu-detect/src/full'
import Context from './context'
import urlCalls from './url/index'
import nativeCalls from './native'
/**
 * import { Share, Browsers, Apps } from 'ohu-share'
 *
 * const share = new Share({
 *   title: 'title',
 *   desc: 'desc',
 *   icon: 'icon',
 *   link: 'link',
 *   from: 'from'
 * }, {
 *   from: [Browsers.QQBROWSER, Browser.UC, Browser.QQ, Browsers.WECHAT, Browsers.BAIDUBROWSER]
 *   to: [Apps.WECHAT, Apps.MOMENTS, Apps.QQ, Apps.QZONE, Apps.WEIBO, Apps.ALIPAY]
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
  constructor (shareInfo, config) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareInfo, config, browserInfo)
  }
  _getShareBrowser () {
    const browserInfo = this.context.browserInfo.browser
    if (browserInfo.name !== undefined) { // support native
      this.browserName = browserInfo.name
      this.supportNative = true
      const BrowserShareClass = nativeCalls[this.browserName]
      if (BrowserShareClass) {
        this.instance = new BrowserShareClass()
      } else {
        throw new Error('Do not support this browser')
      }
    } else {
      this.supportNative = false
    }
  }

  to (appName) {
    if (!this.supportNative) {
      const UrlShareClass = urlCalls[appName]
      if (UrlShareClass) {
        this.instance = new UrlShareClass()
      } else {
        throw new Error('Do not support to share to this app')
      }
    }
    this.instance.share(appName)
  }

  mount () {

  }
}
