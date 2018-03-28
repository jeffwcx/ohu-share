const Browsers = {
  QQBROWSER: 'qqbrowser',
  UC: 'uc',
  BAIDUBROWSER: 'baidubrowser',
  BAIDU: 'baidu',
  QQ: 'qq',
  WECHAT: 'wechat',
  LIEBAO: 'liebao',
  SOGOU: 'sogou'
}

const Apps = {
  WECHAT: 'wechat',
  MOMENTS: 'moments',
  QQ: 'qq',
  QZONE: 'qzone',
  WEIBO: 'weibo'
}

const OS = {
  ANDROID: 'android',
  IOS: 'ios',
  WINDOWS: 'windows'
}

const SUPPORT = {
  /**
   * best support, support user-defined share and invoke app, such as qq browser
   */
  LEVEL1: 0,
  /**
   * support user-defined share and invoke share panel, such as baidu browser
   */
  LEVEL2: 1,
  /**
   * support invoke app, not support user-defined share, such as uc browser
   */
  LEVEL3: 2,
  /**
   * just support user-defined share, such as wechat inner browser
   */
  LEVEL4: 3,
  /**
   * support scheme
   */
  LEVEL5: 4,
  /**
   * support url
   */
  LEVEL6: 5,
  /**
   * nothing support
   */
  LEVEL7: 6
}

export { Browsers, Apps, OS, SUPPORT }
