
import Invoker from '../invoker'
import { OS, SUPPORT } from '../constants'
import { getQQOrQzoneQueryData, concatURL } from '../utils'

export default class QQ extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL5
  }
  static strategy = {
    [OS.IOS]: {
      scheme: 'mqqapi://share/to_fri',
      query: {
        'src_type': 'web',
        'version': 1,
        'file_type': 'news'
      }
    },
    [OS.ANDROID]: {
      scheme: 'mqqapi://share/to_fri',
      query: {
        'src_type': 'isqqBrowser',
        'version': 1,
        'file_type': 'news'
      }
    }
  }
  preset () {
    if (QQ.strategy[this.context.osName] !== undefined) {
      this.strategy = QQ.strategy[this.context.osName]
      if (this.strategy) {
        const completeUrl = concatURL(this.strategy.scheme,
          Object.assign({},
            this.strategy.query,
            getQQOrQzoneQueryData(this.context.shareData)
          )
        )
        this.completeUrl = completeUrl
      }
      return true
    }
    return false
  }
  isSupport (app) {
    return true
  }
  invoke () {
    return this.loader.then(() => {
      return this._openScheme(this.completeUrl)
    })
  }
}
