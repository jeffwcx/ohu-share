
import Detector from 'ohu-detect'
import Context from './context'
import Strategy from './strategy'
import { SUPPORT } from './constants'
import { isFunction, isPromise, formatDataset, isObject, isString } from './utils'

export default class Share {
  /**
   * init share
   * @param {Object} shareData
   * @param {Object} config
   */
  constructor (shareData, config) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareData, config, browserInfo)
    this.isSupport = this.context.config.isSupport
    this.appMap = this.context.config.appMap
    this._setDataset(this.context.config.dataset)
    this.strategy = new Strategy(this.context)

    this.nativeInstance = null
    this.instanceConfigReset = false

    this.promise = Promise.resolve()
    this.nativeInstance = this.strategy.exec(Strategy.NATIVE) // only native method can be preset
  }
  _setDataset (originDataset) {
    this._originDataset = originDataset
    this.dataset = formatDataset(originDataset)
  }
  _setTask (promise) {
    this.promise = this.promise.then(() => promise)
  }
  /**
   * set global share data synchronous or asynchronous
   * @param {Function} func can return promise
   * @return {Share} share
   * @example
   * share.setShareData(function (config) {
   *  return Promise.resolve().then((resolve, reject) => {
   *    // load config from server
   *    loadConfigFromServer((wechatConfig) => {
   *      config.wechat = wechatConfig
   *      resolve(config)
   *    }, (err) => {
   *      reject(err)
   *    })
   *  })
   * })
   */
  setShareData (func) {
    const execResult = func(this.context.shareData)
    let result = execResult
    if (!isPromise(execResult)) {
      result = Promise.resolve().then(() => execResult)
    }
    if (this.nativeInstance) {
      result = result.then(() => {
        return this.nativeInstance
      }).then((result) => {
        if (result) {
          return result.instance.resetConfig()
        }
        return false
      }).catch(err => this.error && this.error(err))
    }
    this._setTask(result)
    return this
  }
  /**
   * set support function
   * @param {Function} func judge support function
   * @return {Share} share
   */
  setSupport (func) {
    this.isSupport = func
    return this
  }
  /**
   * set App Map
   * @param {String|Object} appMap appMap or appName
   * @param {*} app default app name
   */
  setAppMap (appMap, app) {
    if (isObject(appMap)) {
      Object.assign(this.appMap, appMap)
    } else if (isString(appMap) && isString(app)) {
      this.appMap[appMap] = app
    }
    return this
  }
  /**
   * listen event, only support 'share'
   * @param {String} event listen event name
   * @param {Function} success when success
   * @param {Function} error when fail
   * @return {Share} share
   * @example
   * share.on('share', ({ support, app, context }) => {
   *  if (!support.isSupport) {
   *    // deal with lower case
   *  }
   * }, () => {
   *   // deal with error
   * })
   */
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
    return this
  }

  /**
   * mount to every element using dataset 'data-share'
   * @param {Object} mountConfig
   * @return {Share} share
   * @example
   * share.mount() // default config
   * // has config
   * share.mount({
   *   el: parentNode,
   *   dataset: 'share-to', // default is share, i.e. 'data-share'
   *   appMap: {
   *    // if you like 'data-share="wechatFriend"'
   *    // rather than 'data-share="moments"'
   *    'wechatFriend': Apps.MOMENTS
   *   }
   * })
   */
  mount ({ el = null, dataset, appMap } = { el: null }) {
    if (appMap) {
      this.setAppMap(appMap)
    }
    if (dataset) {
      this._setDataset(dataset)
    }
    const els = document.querySelectorAll(`[${formatDataset(this._originDataset, false)}]`, el)
    Array.prototype.forEach.call(els, (el) => {
      const data = el.dataset[this.dataset]
      const whichApp = this.appMap[data] !== undefined ? this.appMap[data] : data
      el.addEventListener('click', () => {
        this.to(whichApp).then((support) => {
          this.success && this.success({ support, app: whichApp, context: this.context })
          return support
        }).catch((err) => {
          this.error && this.error(err)
        })
      }, false)
    })
    return this
  }
  _getShareResult (supportType) {
    return {
      isSupport: this.isSupport(supportType),
      supportType: supportType,
      context: this.context
    }
  }
  /**
   * invoke share command for single app
   * @param {String} app app name
   * @return {Promise} you can deal with success or error by `then` and `catch`
   * @example
   * share.to(Apps.WECHAT)
   *  .then(({ isSupport, supportType, context }) => {
   *    if (!isSupport) {
   *     // deal with lower case
   *    }
   *  })
   */
  to (app) {
    let finalInstance = null
    if (this.nativeInstance) {
      this._setTask(this.nativeInstance)
    }
    return this.promise.then(result => {
      if (result) {
        const isSupport = result.isSupport
        const instance = result.instance
        if (!instance || !isSupport) {
          return null
        }
        finalInstance = instance
        return {
          instance: result.instance,
          isSupport: result.isSupport
        }
      }
      return null
    }).then((result) => {
      if (!result || (result && result.instance && !result.instance.isSupport(app))) {
        const otherInstance = this.strategy.execByApp(app) // url and scheme
        if (otherInstance) finalInstance = otherInstance
      }
      let supportType = finalInstance
        ? (finalInstance.invoke(app), finalInstance.supportType)
        : SUPPORT.LEVEL7
      return this._getShareResult(supportType)
    })
  }
}
