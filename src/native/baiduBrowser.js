
/**
 * Baidu browser native call
 */

import Invoker from '../invoker'
import { OS, Apps, SUPPORT } from '../constants'
import { openByScheme } from '../utils'

export default class BaiduBrowser extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL2
  }
  get actualData () {
    return this._rawData
  }
  preset () {
    if (OS.IOS === this.context.osName) {
      if (!this._rawData) {
        const shareData = this.shareData
        this._rawData = {
          title: shareData.title,
          context: shareData.desc,
          landurl: shareData.link,
          imageurl: shareData.icon,
          mediaType: 0,
          share_type: 'webpage'
        }
      }
      this.finallyInvoke = () => openByScheme('baidubrowserapp://bd_utils', {
        action: 'shareWebPage',
        params: encodeURIComponent(JSON.stringify(this.actualData))
      })
      return true
    } else if (typeof (_flyflowNative) !== 'undefined') {
      if (!this._rawData) {
        const shareData = this.shareData
        this._rawData = {
          title: shareData.title,
          context: shareData.desc,
          landurl: shareData.link,
          imageurl: shareData.icon,
          shareSource: shareData.from
        }
      }
      this.finallyInvoke = () => _flyflowNative.exec(
        'bd_utils',
        'shareWebPage',
        JSON.stringify(this.actualData),
        ''
      )
      return true
    }
    return false
  }
  static APPMAP = {
    [Apps.QQ]: true,
    [Apps.QZONE]: true,
    [Apps.WECHAT]: true,
    [Apps.MOMENTS]: true,
    [Apps.WEIBO]: true
  }
  isSupport (app) {
    return BaiduBrowser.APPMAP[app]
  }
  invoke (app) {
    return this.loader.then(() => {
      return this.finallyInvoke()
    })
  }
}
