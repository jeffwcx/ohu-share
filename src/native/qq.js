
/**
 * QQ inner browser native call
 */

import Invoker from '../invoker'
import { loadJS } from '../utils'
import { Apps } from '../constants'

export default class QQ extends Invoker {
  constructor (context) {
    super(context)
    this.preload()
  }
  static APPMAP = {
    [Apps.WECHAT]: 2,
    [Apps.MOMENTS]: 3
  }
  set actualData (app) {
    const toApp = QQ.APPMAP[app]
    if (!this._rawData) {
      this._rawData = {
        title: this.shareData.title,
        desc: this.shareData.desc,
        share_url: this.shareData.link,
        image_url: this.shareData.icon,
        share_type: toApp
      }
    } else {
      this._rawData['share_type'] = toApp
    }
  }
  get actualData () {
    return this._rawData
  }
  preload () {
    if (!window.mqq) {
      this.loader = loadJS('//open.mobile.qq.com/sdk/qqapi.js?_bid=152')
    }
  }
  preset () {
    if (window.mqq) {
      this.finallyInvoke = () => mqq.ui.shareMessage(this.actualData, function (e) {})
      return true
    }
    return false
  }
  isSupport (context, appName) {
    return QQ.APPMAP[appName] !== undefined
  }
  invoke (app) {
    this.actualData = app
    return this.loadApi.then(() => {
      return this.finallyInvoke()
    })
  }
}
