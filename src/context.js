const defaultShareData = {
  title: document.title,
  desc: '',
  icon: '',
  link: window.location.href,
  from: document.title
}

export default class Context {
  constructor (shareData, browserInfo) {
    this.shareData = Object.assign({}, defaultShareData, shareData || {})
    Object.assign(this, {
      browserName: browserInfo.browser.name,
      browserVersion: browserInfo.browser.version,
      osName: browserInfo.os.name
    })
  }
}
