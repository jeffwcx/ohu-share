import { concatURL } from '../utils'

export default class Weibo {
  constructor (context) {
    this.context = context
    this.shareData = this.context.shareData
  }
  getURL () {
    this.url = concatURL('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey', {
      title: this.shareData.title,
      url: this.shareData.link,
      pics: this.shareData.icon,
      summary: this.shareData.desc,
      otype: 'share'
    })
  }
  share () {
    window.open(this.url, '_blank')
  }
}
