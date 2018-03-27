
/**
 * Baidu browser native call
 */

import Invoker from '../invoker'
import { OS } from '../constants'
export default class Baidu extends Invoker {
  constructor (context) {
    super(context)
    const shareData = this.context.shareData
    this._rawDataObj = {
      title: shareData.title,
      context: shareData.desc,
      linkUrl: shareData.link,
      iconUrl: shareData.icon,
      mediaType: 'all',
      imageUrl: ''
    }
    const dataStr = JSON.stringify(this._rawDataObj)
    this._rawData = `BdboxApp:${JSON.stringify({
      obj: 'Bdbox_android_utils',
      func: 'callShare',
      args: [
        dataStr,
        '',
        ''
      ]
    })}`
  }
  get actualData () {
    return this._rawData
  }
  preset () {
    if (OS.ANDROID === this.context.osName) {
      this.finallyInvoke = () => window.prompt(this.actualData)
      return true
    }
    return false
  }
  isSupport (app) {
    return true
  }
  invoke (app) {
    return this.loader.then(() => {
      return this.finallyInvoke()
    })
  }
}
