
/**
 * QQBrowser native browser call
 */
import Native from './native'
import { Apps } from '../constants'
import { loadJS } from '../utils'

export default class QQBrowser extends Native {
  constructor (context) {
    super(context)
    if (typeof (browser) === 'undefined') {
      this.loadApi = loadJS('//jsapi.qq.com/get?api=app.share')
    } else {
      this.loadApi = Promise.resolve()
    }
  }
  static appMap = {
    [Apps.WECHAT]: 1,
    [Apps.MOMENTS]: 8,
    [Apps.QQ]: 4,
    [Apps.QZONE]: 3,
    [Apps.WEIBO]: 11
  }
  static isSupport (context, appName) {
    return QQBrowser.appMap[appName] !== undefined
  }
  share (appName) {
    return this.loadApi.then(() => {
      const shareData = this.context.shareData
      const dataQQNeed = {
        url: shareData.link,
        title: shareData.title,
        img_url: shareData.icon,
        img_title: '',
        to_app: QQBrowser.appMap[appName] || '',
        cus_txt: shareData.title + `@${shareData.from}`
      }
      if (typeof (browser) !== 'undefined' &&
        typeof (browser.app) !== 'undefined' &&
        browser.app.share) {
        return browser.app.share(dataQQNeed)
      } else if (typeof (window.qb) !== 'undefined' &&
        window.qb.share) {
        return window.qb.share(dataQQNeed)
      } else {
        throw new Error('Not support!')
      }
    })
  }
}
