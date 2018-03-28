import { concatURL } from '../utils'
import Invoker from '../invoker'
import { SUPPORT } from '../constants'
export default class Weibo extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL6
  }
  preset () {
    this.completeUrl = concatURL('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey', {
      title: this.shareData.title,
      url: this.shareData.link,
      pics: this.shareData.icon,
      summary: this.shareData.desc,
      otype: 'share'
    })
    return true
  }
  invoke () {
    return this.loader.then(() => {
      return this._openURL(this.completeUrl)
    })
  }
}
