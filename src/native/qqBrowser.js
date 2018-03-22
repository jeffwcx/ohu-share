
/**
 * QQBrowser native browser call
 */
import Native from './native'
import { Apps } from '../constants'
import { loadJS } from '../utils'

export default class QQBrowser extends Native {
  constructor (context) {
    super(context)
    this.loadPromise = loadJS('//jsapi.qq.com/get?api=app.share')
  }
  static appMap = {
    [Apps.WECHAT]: 1,
    [Apps.MOMENTS]: 8,
    [Apps.QQ]: 4,
    [Apps.QZONE]: 3,
    [Apps.WEIBO]: 11
  }
  share (appName) {
    return this.loadPromise.then(() => {
      const shareData = this.context.shareData
      const dataQQNeed = {
        url: shareData.link,
        title: shareData.title,
        img_url: shareData.icon,
        img_title: '',
        to_app: QQBrowser.appMap[appName] || ''
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
