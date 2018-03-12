
import Detector from 'ohu-detect'
import Context from './context'
/**
 * import { Share, Browsers, Apps } from 'ohu-share'
 * 
 * const share = new Share({
 *   title: 'title',
 *   summary: 'summary',
 *   img: 'img'
 *   link: 'link'
 * }, {
 *   from: [Browsers.QQBROWSER, Browser.UC, Browser.QQ, Browsers.WECHAT, Browsers.BAIDUBROWSER]
 *   to: [Apps.WECHAT, Apps.MOMENTS, Apps.QQ, Apps.QZONE, Apps.WEIBO, Apps.ALIPAY]
 * })
 * 
 * share.mount({
 *   Apps.WECHAT: '#wechat',
 *   Apps.MOMENTS: '#moments',
 *   Apps.QQ: '#qq',
 *   Apps.QZONE: '#qzone',
 *   Apps.WEIBO: '#weibo',
 *   Apps.ALIPAY: '#alipay'
 * })
 */

export default class Share {
  constructor (shareInfo, config) {
    const browserInfo = new Detector(navigator.userAgent)
    this.context = new Context(shareInfo, config, browserInfo)
  }
}