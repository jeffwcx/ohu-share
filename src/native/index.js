import { Browsers } from '../constants'
import UC from './uc'
import QQBrowser from './qqBrowser'
import BaiduBrowser from './baiduBrowser'
import Baidu from './baidu'
import Wechat from './wechat'
import Sogou from './sogou'

const browsers = {
  [Browsers.UC]: UC,
  [Browsers.QQBROWSER]: QQBrowser,
  [Browsers.BAIDUBROWSER]: BaiduBrowser,
  [Browsers.BAIDU]: Baidu,
  // [Browsers.QQ]: QQ, remove QQ native because its invoke method need to be verified
  [Browsers.WECHAT]: Wechat,
  [Browsers.SOGOU]: Sogou
}

export default browsers
