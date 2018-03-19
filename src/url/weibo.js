import { concatURL } from '../utils'

export default class Weibo {
  constructor (context) {
    this.context = context
    this.shareData = this.context.shareData
  }
  getURL () {
    this.url = concatURL('http://service.weibo.com/share/mobile.php', {
      title: this.shareData.title,
      url: this.shareData.link,
      pic: this.shareData.icon,
      searchPic: false,
      style: 'simple',
      language: 'zh_cn'
    })
  }
  share () {
    window.open(this.url, '_blank')
  }
}
