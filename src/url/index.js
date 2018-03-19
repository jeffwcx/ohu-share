/**
 * url module
 */

import { Apps } from '../constants'
import QZone from './qzone'
import Weibo from './weibo'
const urls = {
  [Apps.QZONE]: QZone,
  [Apps.WEIBO]: Weibo
}

export default urls
