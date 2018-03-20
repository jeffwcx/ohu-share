
import Native from './native'
import { Apps } from '../constants'

export default class QQBrowser extends Native {
  constructor (context) {
    super(context)
  }
  static appMap = {
    [Apps.WECHAT]: 1,
    [Apps.MOMENTS]: 8,
    [Apps.QQ]: 4,
    [Apps.QZONE]: 3,
    [Apps.WEIBO]: 11
  }
  share (appName) {
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
      browser.app.share(dataQQNeed)
    } else if (typeof (window.qb) !== 'undefined' &&
      window.qb.share) {
      window.qb.share(dataQQNeed)
    } else {
      throw new Error('Not support!')
    }
  }
}
