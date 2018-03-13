import { Browsers, Apps } from './constants'
const defaultShareInfo = {
  title: document.title,
  summary: '',
  img: '',
  link: window.location.href,
  appName: document.title
}

const defaultConfig = {
  from: [],
  to: []
}

export default class Context {
  constructor (shareInfo, config, browserInfo) {
    this.shareInfo = Object.assign(shareInfo || {}, defaultShareInfo)
    this.config = Object.assign(defaultConfig || {}, defaultConfig)
    this.browserInfo = browserInfo
  }
}