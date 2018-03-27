
/**
 * UC support
 */

import { Apps, OS } from '../constants'
import Invoker from '../invoker'

export default class UC extends Invoker {
  constructor (context) {
    super(context)
  }
  static APPMAP = {
    [Apps.WECHAT]: {
      [OS.IOS]: 'kWeixin',
      [OS.ANDROID]: 'WechatFriends'
    },
    [Apps.MOMENTS]: {
      [OS.IOS]: 'kWeixinFriend',
      [OS.ANDROID]: 'WechatTimeline'
    },
    [Apps.QQ]: {
      [OS.IOS]: 'kQQ',
      [OS.ANDROID]: 'QQ'
    },
    [Apps.QZONE]: {
      [OS.IOS]: 'kQZone',
      [OS.ANDROID]: 'Qzone'
    },
    [Apps.WEIBO]: {
      [OS.IOS]: 'kSinaWeibo',
      [OS.ANDROID]: 'SinaWeibo'
    }
  }
  get actualData () {
    return this._rawData
  }
  set actualData (app) {
    const shareData = this.shareData
    const target = UC.APPMAP[app]
    const toApp = target[this.context.osName]
    if (!this._rawData) {
      this._rawData = [
        shareData.title,
        shareData.desc,
        shareData.link,
        toApp,
        '',
        `@${shareData.from}`,
        shareData.icon
      ]
    } else {
      this._rawData[3] = toApp
    }
  }
  preset () {
    if (typeof (ucweb) !== 'undefined') {
      this.finallyInvoke = () => {
        ucweb.startRequest('shell.page_share', this.actualData)
      }
      return true
    } else if (typeof (ucbrowser) !== 'undefined') {
      this.finallyInvoke = () => {
        ucbrowser.web_share(...this.actualData)
      }
      return true
    }
    return false
  }
  isSupport (app) {
    return UC.APPMAP[app] !== undefined
  }
  invoke (app) {
    this.actualData = app
    return this.loader.then(() => {
      return this.finallyInvoke()
    })
  }
}
