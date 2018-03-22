import { concatURL, isMobile } from '../utils'
import URL from './url'
export default class Weibo extends URL {
  constructor (context) {
    super(context)
  }
  createURL () {
    const baseUrl = `http://service.weibo.com/share/` +
      `${isMobile(this.context.osName) ? 'mobile' : 'share'}.php`
    return concatURL(baseUrl, {
      title: this.shareData.title,
      url: this.shareData.link,
      pic: this.shareData.icon,
      searchPic: false,
      style: 'simple',
      language: 'zh_cn'
    })
  }
}
