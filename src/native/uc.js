import { Apps, OS } from '../constants'
import { openBySchema } from '../utils'
import Native from './native'
export default class UC extends Native {
  constructor (context) {
    super(context)
  }
  static appMap = {
    [Apps.WECHAT]: {
      [OS.IOS]: 'kWeixin',
      [OS.ANDROID]: 'WechatFriends'
    },
    [Apps.MOMENTS]: {
      [OS.IOS]: 'WechatTimeline',
      [OS.ANDROID]: 'kWeixinFriend'
    },
    [Apps.QQ]: {
      [OS.IOS]: 'kQQ',
      [OS.ANDROID]: 'QQ'
    },
    [Apps.QZONE]: {
      [OS.IOS]: 'kQZone',
      [OS.ANDROID]: 'QZone'
    },
    [Apps.WEIBO]: {
      [OS.IOS]: 'kSinaWeibo',
      [OS.ANDROID]: 'SinaWeibo'
    }
  }

  share (appName) {
    const shareData = this.context.shareData
    if (appName === Apps.QZONE) {
      openBySchema('mqqapi://share/to_qzone', {
        'src_type': 'web',
        'verison': '1',
        'file_type': 'news',
        'image_url': shareData.icon,
        'title': shareData.title,
        'description': shareData.desc,
        'url': shareData.link,
        'app_name': shareData.from
      }, this.context.osName)
    }
    const target = UC.appMap[appName]
    if (target) {
      this.toApp = target[this.context.osName] || ''
    }
    const dataUCNeed = [
      shareData.title,
      shareData.desc,
      shareData.link,
      this.toApp,
      `@${shareData.from}`,
      ''
    ]
    if (typeof (ucweb) !== 'undefined') {
      ucweb.startRequest('shell.page_share', dataUCNeed)
    } else if (typeof (ucbrowser) !== 'undefined') {
      ucbrowser.web_share(...dataUCNeed)
    } else {
      throw new Error('Not support!')
    }
  }
}
