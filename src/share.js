
import Detector from 'ohu-detect'
import Context from './context'
import Strategy from './strategy'

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
    if (this.nativeInstance) {
      return this.promise.then(() => {
        return this.nativeInstance
      }).then(({isSupport, instance}) => {
        if (!isSupport) {
          const otherInstance = this.strategy.execByApp(app)
          if (otherInstance) finalInstance = otherInstance
          else return false
        } else {
          finalInstance = instance
        }
        finalInstance.invoke(app)
        return true
      })
    } else {
      return this.promise.then(() => {
        const otherInstance = this.strategy.execByApp(app)
        if (otherInstance) finalInstance = otherInstance
        else return false
        finalInstance.invoke(app)
        return true
      })
    }
  }
}
