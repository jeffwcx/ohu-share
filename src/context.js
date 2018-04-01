import { SUPPORT } from './constants'

const defaultShareData = {
  title: document.title,
  desc: '',
  icon: '',
  link: window.location.href,
  from: document.title
}

const defaultConfig = {
  isSupport: function (supportType) {
    return !(SUPPORT.LEVEL4 === supportType ||
      SUPPORT.LEVEL7 === supportType)
  },
  dataset: 'share',
  appMap: {}
}

export default class Context {
  constructor (shareData, config, browserInfo) {
    this.shareData = Object.assign({}, defaultShareData, shareData || {})
    this.config = Object.assign({}, defaultConfig, config || {})
    Object.assign(this, {
      browserName: browserInfo.browser.name,
      browserVersion: browserInfo.browser.version,
      osName: browserInfo.os.name,
      osVersion: browserInfo.os.version
    })
  }
}
