
/**
 * QQBrowser native browser call
 */

import Invoker from '../invoker'
import { Apps, SUPPORT } from '../constants'
import { loadJS } from '../utils'

export default class QQBrowser extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL1
    this.preload()
  }
  static APPMAP = {
    [Apps.WECHAT]: 1,
    [Apps.MOMENTS]: 8,
    [Apps.QQ]: 4,
    [Apps.QZONE]: 3,
    [Apps.WEIBO]: 11
  }
  preload () {
    if (typeof (browser) === 'undefined') {
      this.loader = loadJS('//jsapi.qq.com/get?api=app.share')
    }
    return this.loader
  }
  set actualData (app) {
    const shareData = this.shareData
    const toApp = QQBrowser.APPMAP[app]
    if (!this._rawData) {
      this._rawData = {
        url: shareData.link,
        title: shareData.title,
        img_url: shareData.icon,
        img_title: '',
        to_app: toApp,
        cus_txt: shareData.title
      }
    } else {
      this._rawData['to_app'] = toApp
    }
  }
  get actualData () {
    return this._rawData
  }
  preset () {
    if (typeof (browser) !== 'undefined' &&
      typeof (browser.app) !== 'undefined') {
      this.finallyInvoke = () => browser.app.share(this.actualData)
      return true
    } else if (typeof (window.qb) !== 'undefined') {
      this.finallyInvoke = () => window.qb.share(this.actualData)
      return true
    }
    return false
  }
  isSupport (app) {
    return QQBrowser.APPMAP[app] !== undefined
  }
  invoke (app) {
    this.actualData = app
    return this.loader.then(() => {
      return this.finallyInvoke()
    })
  }
}
