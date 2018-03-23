
/**
 * Baidu browser native call
 */

import Native from './native'
import { OS } from '../constants'
import { openByScheme } from '../utils'
export default class Baidu extends Native {
  constructor (context) {
    super(context)
  }
  static isSupport (context, appName) {
    return true
  }
  share (appName) {
    const shareData = this.context.shareData
    const dataBaiduNeed = {
      title: shareData.title,
      context: shareData.desc,
      linkUrl: shareData.link,
      iconUrl: shareData.icon,
      mediaType: 'all',
      imageUrl: ''
    }
    const dataStr = JSON.stringify(dataBaiduNeed)
    if (this.context.osName === OS.ANDROID) {
      window.prompt(`BdboxApp:${JSON.stringify({
        obj: 'Bdbox_android_utils',
        func: 'callShare',
        args: [
          dataStr,
          '',
          ''
        ]
      })}`)
    } else if (this.context.osName === OS.IOS) {
      openByScheme('baiduboxapp://callShare', {
        'options': encodeURIComponent(dataStr)
      })
    } else {
      throw new Error('Not support!')
    }
  }
}
