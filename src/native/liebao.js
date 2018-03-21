
import Native from './native'
import { Apps } from '../constants'
import { openBySchema } from '../utils'

export default class LieBao extends Native {
  constructor (context) {
    super(context)
  }
  static appMap = {
    [Apps.QQ]: true,
    [Apps.QZONE]: true
  }
  share (appName) {
    if (LieBao.appMap[appName]) {
      openBySchema()
    }
  }
}
