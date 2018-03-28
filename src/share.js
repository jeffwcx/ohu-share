
import Detector from 'ohu-detect'
import Context from './context'
import Strategy from './strategy'
import { SUPPORT } from './constants'
import { isFunction } from './utils'

export default class Share {
  constructor (shareData) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareData, browserInfo)
    this.dataset = 'share'
    this.strategy = new Strategy(this.context)
    this.promise = Promise.resolve()
    this.mountPromise = Promise.resolve()
    this.nativeInstance = this.strategy.exec(Strategy.NATIVE) // only native method can be preset
  }
  _formatDataset (dataset) {
    let str = dataset.toLowerCase()
    return str.replace(/(data-)?(.*)/, function (match, g1, g2) {
      return g2.replace(/-(\w)/g, function (m, g) { return g.toUpperCase() })
    })
  }
  on (event, success, error) {
    if (event === 'share') {
      if (isFunction(success)) {
        this.success = success
      } else {
        throw Error('success should be function')
      }
      if (isFunction(error)) {
        this.error = error
      } else {
        throw Error('error should be function')
      }
    }
  }
  mount ({ el = null, dataset } = { el: null }) {
    if (dataset) {
      this.dataset = this._formatDataset(dataset)
    }
    const els = document.querySelectorAll(`[${dataset
      ? dataset.indexOf('data-') > -1
        ? dataset
        : 'data-' + dataset
      : 'data-' + this.dataset}]`, el)
    els.forEach((el) => {
      const whichApp = el.dataset[this.dataset]
      el.addEventListener('click', () => {
        this.to(whichApp).then((support) => {
          this.success && this.success({ support, app: whichApp })
          return support
        }).catch((err) => {
          this.error && this.error(err)
        })
      }, false)
    })
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
