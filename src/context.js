import { Browsers, Apps } from './constants'
const defaultShareData = {
  title: document.title,
  desc: '',
  img: '',
  link: window.location.href,
  appName: document.title
}

const defaultConfig = {
  from: [Object.values(Browsers)],
  to: [Object.values(Apps)]
}

export default class Context {
  constructor (shareData, config, browserInfo) {
    this.shareData = Object.assign(shareData || {}, defaultShareData)
    this.config = Object.assign(defaultConfig || {}, defaultConfig)
    Object.assign(this, {
      browserName: browserInfo.browser.name,
      browserVersion: browserInfo.browser.version,
      osName: browserInfo.os.name
    })
  }
}
