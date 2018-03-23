
import Detector from 'ohu-detect'
import Context from './context'
import urlList from './url'
import nativeList from './native'
import schemeList from './scheme'
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

let TargetClass = null

let SHARE_STRATEGY = [function getNativeShare (context, appName) {
  if (context.browserName !== undefined &&
    nativeList[context.browserName]) {
    const ShareClass = nativeList[context.browserName]
    if (ShareClass.isSupport(context, appName)) {
      TargetClass = ShareClass
      return true
    }
  }
  return false
}, function getSchemeShare (context, appName) {
  const ShareClass = schemeList[appName]
  if (ShareClass &&
    ShareClass.isSupport(context, appName)) {
    TargetClass = ShareClass
    return true
  }
  return false
}, function getURLShare (context, appName) {
  if (urlList[appName]) {
    TargetClass = urlList[appName]
    return true
  }
  return false
}]

export default class Share {
  constructor (shareData) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareData, browserInfo)
    this.instance = null
  }

  to (appName, callback) {
    let noneSupport = false
    const result = SHARE_STRATEGY.some((execStrategy) => {
      return execStrategy(this.context, appName)
    })

    if (result && TargetClass) this.instance = new TargetClass(this.context)
    else noneSupport = true

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
