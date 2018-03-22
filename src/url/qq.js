import { concatURL } from '../utils'
import URL from './url'

export default class QQ extends URL {
  constructor (context) {
    super(context)
  }
  createURL () {
    return concatURL('http://connect.qq.com/widget/shareqq/index.html', {
      title: this.shareData.title,
      url: this.shareData.link,
      pics: this.shareData.icon,
      summary: this.shareData.desc
    })
  }
}
