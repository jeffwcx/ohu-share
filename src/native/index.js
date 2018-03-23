import { Browsers } from '../constants'
import UC from './uc'
import QQBrowser from './qqBrowser'
import BaiduBrowser from './baiduBrowser'
import Baidu from './baidu'

const browsers = {
  [Browsers.UC]: UC,
  [Browsers.QQBROWSER]: QQBrowser,
  [Browsers.BAIDUBROWSER]: BaiduBrowser,
  [Browsers.BAIDU]: Baidu
}

export default browsers
