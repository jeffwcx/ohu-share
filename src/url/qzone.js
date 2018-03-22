import { concatURL } from '../utils'
import URL from './url'
export default class Weibo extends URL {
  constructor (context) {
    super(context)
  }
  createURL () {
    return concatURL('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey', {
      title: this.shareData.title,
      url: this.shareData.link,
      pics: this.shareData.icon,
      summary: this.shareData.desc,
      otype: 'share'
    })
  }
}
