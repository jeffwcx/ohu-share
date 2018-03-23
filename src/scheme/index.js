import Qzone from './qzone'
import QQ from './qq'
import { Apps } from '../constants'
// how to judge whether a browser support URL scheme?
const schemes = {
  [Apps.QQ]: QQ,
  [Apps.QZONE]: Qzone
}

export default schemes
