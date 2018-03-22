
/**
 * wechat inner browser native call
 */

import Native from './native'

export default class WeChat extends Native {
  constructor (context) {
    super(context)
  }
  static appMap = {
  }
  share (appName) {}
}
