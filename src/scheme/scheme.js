
import { openByScheme } from '../utils'
export default class Scheme {
  constructor (context) {
    this.context = context
    this.scheme = this.createScheme()
  }
  createScheme () {
    return ''
  }
  share () {
    openByScheme(this.scheme, undefined, this.context.osName)
  }
}
