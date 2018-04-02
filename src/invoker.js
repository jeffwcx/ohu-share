import { openByScheme } from './utils'
import { SUPPORT } from './constants'

export default class Invoker {
  constructor (context) {
    this.context = context
    this.shareData = this.context.shareData
    this.loader = Promise.resolve()
    this.supportType = SUPPORT.LEVEL7
    this.finallyInvoke = function () {}
  }
  resetConfig () {}
  /**
   * when you invoke native method
   * you may need to load JSBridge
   */
  preload () {}
  /**
   * when you share something
   * you may need to set config before invoke
   */
  preset () { return false }
  isSupport (app) { return false }
  invoke () {}
  _openScheme (scheme) {
    openByScheme(scheme)
  }
  _openURL (url) {
    window.open(url, '_blank')
  }
}
