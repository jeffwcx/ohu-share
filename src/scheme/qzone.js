
import Scheme from './scheme'
import { OS } from '../constants'
import { getQQOrQzoneQueryData, concatURL } from '../utils'

export default class Qzone extends Scheme {
  constructor (context) {
    super(context)
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

  static isSupport (context, appName) {
    if (Qzone.strategy[context.osName] !== undefined) return true
    return false
  }
  createScheme () {
    this.strategy = Qzone.strategy[this.context.osName]
    if (this.strategy) {
      const completeUrl = concatURL(this.strategy.scheme,
        Object.assign({}, this.strategy.query, getQQOrQzoneQueryData(this.context.shareData)))
      return completeUrl
    }
  }
}
