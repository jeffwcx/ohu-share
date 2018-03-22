import Qzone from './qzone'
import QQ from './qq'
import { Apps } from '../constants'

const schemes = {
  [Apps.QQ]: QQ,
  [Apps.QZONE]: Qzone
}

export default schemes
