import { Browsers } from '../constants'
import UC from './uc'
import QQBrowser from './qqBrowser'

const browsers = {
  [Browsers.UC]: UC,
  [Browsers.QQBROWSER]: QQBrowser
}

export default browsers
