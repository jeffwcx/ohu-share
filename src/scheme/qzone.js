
import Scheme from './scheme'
import { OS } from '../constants'
import { getQQOrQzoneQueryData, concatURL } from '../utils'

export default class Qzone extends Scheme {
  constructor (context) {
    super(context)
  }
  static strategy= {
    [OS.IOS]: {
      scheme: 'mqqapi://share/to_fri',
      query: {
        'file_type': 'new',
        'src_type': 'web',
        'version': 1,
        'generalpastboard': 1,
        'shareType': 1,
        'cflag': 1,
        'objectlocation': 'pasteboard',
        'callback_type': 'scheme',
        'callback_name': 'QQ41AF4B2A'
      }
    },
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
  createScheme () {
    this.strategy = Qzone.strategy[this.context.osName]
    if (this.strategy) {
      const completeUrl = concatURL(this.strategy.scheme,
        Object.assign({}, this.strategy.query, getQQOrQzoneQueryData(this.context.shareData)))
      return completeUrl
    }
  }
}
