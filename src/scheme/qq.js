
import Scheme from './scheme'
import { OS } from '../constants'
import { getQQOrQzoneQueryData, concatURL } from '../utils'

export default class QQ extends Scheme {
  constructor (context) {
    super(context)
  }
  static strategy= {
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
  createScheme () {
    this.strategy = QQ.strategy[this.context.osName]
    if (this.strategy) {
      const completeUrl = concatURL(this.strategy.scheme,
        Object.assign({}, this.strategy.query, getQQOrQzoneQueryData(this.context.shareData)))
      return completeUrl
    }
  }
}
