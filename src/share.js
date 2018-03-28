
import Detector from 'ohu-detect'
import Context from './context'
import Strategy from './strategy'
import { SUPPORT } from './constants'

export default class Share {
  constructor (shareData) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareData, browserInfo)
    this.otherInstance = null
    this.strategy = new Strategy(this.context)
    this.promise = Promise.resolve()
    this.nativeInstance = this.strategy.exec(Strategy.NATIVE) // only native method can be preset
  }
  to (app) {
    let finalInstance = null
    return this.promise.then(() => {
      return this.nativeInstance
    }).then(({isSupport, instance}) => {
      if (!instance ||
        (instance && !isSupport) ||
        (instance && !instance.isSupport(app))) {
        const otherInstance = this.strategy.execByApp(app)
        if (otherInstance) finalInstance = otherInstance
      } else {
        finalInstance = instance
      }
      if (finalInstance) {
        finalInstance.invoke(app)
        return { isSupport: true, supportType: finalInstance.supportType }
      } else {
        return { isSupport: false, supportType: SUPPORT.LEVEL7 }
      }
    })
  }
}
