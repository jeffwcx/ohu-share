
import Browser from '../browser'
class UC extends Browser {
  constructor (context) {
    super(context)
  }

  transformShareData () {
    const shareData = this.context.shareInfo
    this._shareInfo = [
      shareData.title,
      shareData.summary,
      shareData.link
    ]
  }

  shareTo () {}
}