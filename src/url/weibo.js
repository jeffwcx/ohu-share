import { concatURL, isMobile } from '../utils'
import Invoker from '../invoker'
import { SUPPORT } from '../constants'
export default class Weibo extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL6
  }
  preset () {
    const baseUrl = `http://service.weibo.com/share/` +
      `${isMobile(this.context.osName) ? 'mobile' : 'share'}.php`
    this.completeUrl = concatURL(baseUrl, {
      title: this.shareData.title,
      url: this.shareData.link,
      pic: this.shareData.icon,
      searchPic: false,
      style: 'simple',
      language: 'zh_cn'
    })
    return true
  }
  invoke () {
    return this.loader.then(() => {
      return this._openURL(this.completeUrl)
    })
  }
}
