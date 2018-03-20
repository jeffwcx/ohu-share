/**
 * url module
 */

import { Apps } from '../constants'
import QZone from './qzone'
import Weibo from './weibo'
import QQ from './qq'
const urls = {
  [Apps.QZONE]: QZone,
  [Apps.WEIBO]: Weibo,
  [Apps.QQ]: QQ
}

export default urls
