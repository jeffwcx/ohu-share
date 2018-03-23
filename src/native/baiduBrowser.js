
/**
 * Baidu browser native call
 */

import Native from './native'
import { OS } from '../constants'
import { openByScheme } from '../utils'

export default class BaiduBrowser extends Native {
  constructor (context) {
    super(context)
  }
  static isSupport (context, appName) {
    return true
  }
  share (appName) {
    const shareData = this.context.shareData
    const dataBaiduBrowserNeed = {
      title: shareData.title,
      context: shareData.desc,
      landurl: shareData.link,
      imageurl: shareData.icon,
      shareSource: shareData.from
    }

    if (this.context.osName === OS.IOS) {
      openByScheme('baidubrowserapp://bd_utils', {
        action: 'shareWebPage',
        params: encodeURIComponent(dataBaiduBrowserNeed)
      }, this.context.osName)
    } else {
      if (typeof (_flyflowNative) !== 'undefined') {
        _flyflowNative.exec(
          'bd_utils',
          'shareWebPage',
          JSON.stringify(dataBaiduBrowserNeed),
          ''
        )
      } else {
        throw new Error('not support!')
      }
    }
  }
}
