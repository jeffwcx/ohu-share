import { Apps, OS } from '../constants'
import { openByScheme } from '../utils'
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
      [OS.IOS]: 'kWeixinFriend',
      [OS.ANDROID]: 'WechatTimeline'
    },
    [Apps.QQ]: {
      [OS.IOS]: 'kQQ',
      [OS.ANDROID]: 'QQ'
    },
    [Apps.QZONE]: {
      [OS.IOS]: 'kQZone',
      [OS.ANDROID]: 'Qzone'
    },
    [Apps.WEIBO]: {
      [OS.IOS]: 'kSinaWeibo',
      [OS.ANDROID]: 'SinaWeibo'
    }
  }

  share (appName) {
    const shareData = this.context.shareData
    if (appName === Apps.QZONE) {
      openByScheme('mqqapi://share/to_qzone', {
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
      '',
      `@${shareData.from}`,
      shareData.icon
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
