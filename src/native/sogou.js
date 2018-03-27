
/**
 * Sogou support
 */
import { Apps } from '../constants'
import Invoker from '../invoker'

export default class Sogou extends Invoker {
  constructor (context) {
    super(context)
    this._rawData = {
      shareTitle: this.shareData.title,
      shareContent: this.shareData.desc,
      shareImageUrl: this.shareData.icon,
      shareUrl: this.shareData.link
    }
  }
  static APPMAP = {
    [Apps.WECHAT]: true,
    [Apps.MOMENTS]: true
  }
  get actualData () {
    return this._rawData
  }
  preset () {
    window.shareInfo = this.actualData
    this.finallyInvoke = () => {
      SogouMse.Utility.shareWithInfo(this.actualData)
    }
    return true
  }
  isSupport (app) {
    return Sogou.APPMAP[app]
  }
  invoke (app) {
    return this.loader.then(() => {
      return this.finallyInvoke()
    })
  }
}
