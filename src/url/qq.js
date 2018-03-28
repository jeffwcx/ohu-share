import { concatURL } from '../utils'
import Invoker from '../invoker'
import { SUPPORT } from '../constants'

export default class QQ extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL6
  }
  preset () {
    this.completeUrl = concatURL('http://connect.qq.com/widget/shareqq/index.html', {
      title: this.shareData.title,
      url: this.shareData.link,
      pics: this.shareData.icon,
      summary: this.shareData.desc
    })
    return true
  }
  invoke () {
    return this.loader.then(() => {
      return this._openURL(this.completeUrl)
    })
  }
}
