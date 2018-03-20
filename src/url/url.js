export default class URL {
  constructor (context) {
    this.context = context
    this.shareData = this.context.shareData
    this.url = this.createURL()
  }
  createURL () {}
  share () {
    window.open(this.url, '_blank')
  }
}
