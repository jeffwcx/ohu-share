import urlList from './url'
import nativeList from './native'
import schemeList from './scheme'

export default class Strategy {
  static NATIVE = 'native'
  static SCHEME = 'scheme'
  static URL = 'url'
  static STATEGYMAP = {
    [Strategy.NATIVE]: function getNativeShare (context) {
      if (context.browserName !== undefined &&
        nativeList[context.browserName]) {
        const ShareClass = nativeList[context.browserName]
        const instance = new ShareClass(context)
        return instance.loader.then(() => {
          return {
            isSupport: instance.preset(),
            instance: instance
          }
        })
      }
      return null
    },
    [Strategy.SCHEME]: function getSchemeShare (context, app) {
      const ShareClass = schemeList[app]
      if (ShareClass) {
        const instance = new ShareClass(context)
        if (instance.preset()) {
          return instance
        }
      }
      return null
    },
    [Strategy.URL]: function getURLShare (context, app) {
      const ShareClass = urlList[app]
      if (ShareClass) {
        const instance = new ShareClass(context)
        if (instance.preset()) {
          return instance
        }
      }
      return null
    }
  }
  constructor (context) {
    this.context = context
    this.order = [Strategy.SCHEME, Strategy.URL]
  }
  /**
   * Exec one stategy
   * @param {String} strategy
   * @param {String} app
   * @return {Invoker}
   * @example
   * strategy.exec(Strategy.NATIVE, Apps.QQ)
   */
  exec (strategy, app) {
    const execStategy = Strategy.STATEGYMAP[strategy]
    let result = null
    if (execStategy) {
      result = execStategy(this.context, app)
    }
    return result
  }
  /**
   * exec scheme and url strategy
   * @param {String} app
   * @return {Invoker}
   * @example
   * strategy.execByApp(Apps.QQ)
   */
  execByApp (app) {
    let result = null
    for (let i = 0; i < this.order.length; i += 1) {
      const execStategy = Strategy.STATEGYMAP[this.order[i]]
      const instance = execStategy(this.context, app)
      if (instance !== null) {
        result = instance
        break
      }
    }
    return result
  }
}
