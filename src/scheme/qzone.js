
import { OS, SUPPORT } from '../constants'
import { getQQOrQzoneQueryData, concatURL, isSupportScheme } from '../utils'
import Invoker from '../invoker'

export default class Qzone extends Invoker {
  constructor (context) {
    super(context)
    this.supportType = SUPPORT.LEVEL5
  }
  static strategy = {
    [OS.ANDROID]: {
      scheme: 'mqqapi://share/to_qzone',
      query: {
        'src_type': 'isqqBrowser',
        'version': 1,
        'file_type': 'news',
        'req_type': 1
      }
    }
  }

  preset () {
    if (Qzone.strategy[this.context.osName] !== undefined &&
      isSupportScheme(this.context.browserName)) {
      this.strategy = Qzone.strategy[this.context.osName]
      if (this.strategy) {
        const completeUrl = concatURL(this.strategy.scheme,
          Object.assign({},
            this.strategy.query,
            getQQOrQzoneQueryData(this.context.shareData)
          )
        )
        this.completeUrl = completeUrl
        return true
      }
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
