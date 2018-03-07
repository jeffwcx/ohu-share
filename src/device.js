
const os = [
  {
    name: 'os x',
    match: /\((\w+);.*mac os x ([0-9_]+)/i,
    order: ['device' ,'version']
  },
  {
    name: 'ios',
    match: /\((\w+);.*os ([0-9_]+) like mac os x/,
    order: ['device', 'version']
  },
  {
    name: 'linux',
    match: /linux/i,
    branches: [
      {
        name: 'android',
        match: /android ([0-9.]+)/i,
        order: ['version']
      }
    ]
  },
  {
    name: 'windows',
    match: /windows/i,
    branches: [
      {
        name: 'window xp',
        match: /windows nt 5\.[12]/i
      },
      {
        name: 'windows vista',
        match: /windows vista nt6\.0/i
      },
      {
        name: 'windows 7',
        match: /windows nt 6\.1/i
      },
      {
        name: 'windows 8',
        match: /windows nt 6\.[23]/i
      },
      {
        name: 'windows 10',
        match: /windows nt (6\.4|10)/i
      }
    ]
  }
]


const browserEngines = [
  {
    name: 'trident',
    match: /trident\/([0-9.]+)/i,
    order: ['version']
  },
  {
    name: 'gecko',
    match: /gecko\/(\d+)/i,
    order: ['version']
  },
  {
    name: 'webkit',
    match: /webkit\/([0-9.]+)/i,
    order: ['version']
  },
  {
    name: 'presto',
    match: /webkit\/([0-9.]+)/i,
    order: ['version']
  }
]

const browsers = [
  {
    name: 'firefox',
    match: /firefox\/([0-9.]+)/i,
    order: ['version']
  }, {
    name: 'ie',
    match: /msie ([0-9.]+);.*(iemobile)?/i,
    order: ['version', 'isMobile']
  }, {
    name: 'safari',
    match: /version\/([0-9.]+) (mobile.+)?safari/i,
    order: ['version', 'isMobile']
  }, {
    name: 'chrome',
    match: /chrome\/([0-9.]+) (mobile)?/i,
    order: ['version', 'isMobile'],
    branches: [
      {
        name: 'opera',
        match: /opr\/([0-9.]+)/i,
        order: ['version']
      },
      {
        name: 'uc',
        match: /ucbrowser\/([0-9.]+)/i,
        order: ['version'],
        branches: [
          {
            name: 'alipay',
            match: /alipayclient\/([0-9.]+)/i,
            order: ['version']
          }
        ]
      },
      {
        name: 'qqbrowser',
        match: /mqqbrowser\/([0-9.]+)/i,
        order: ['version'],
        branches: [
          {
            name: 'qq',
            match: /qq\/([0-9.]+)/i,
            order: ['version']
          }, {
            name: 'wechat',
            match: /micromessenger\/([0-9]+)/i,
            order: ['version']
          }
        ]
      },
      {
        name: 'liebao',
        match: /liebaofast\/([0-9]+)/i,
        order: ['version']
      }
    ]
  }, {
    name: 'opera',
    match: /opera\/([0-9.]+)/i,
    order: ['version']
  }
]

class Detector {
  constructor (ua) {
    this.ua = ua
    this.detectOS()
    this.detectBrowserEngine()
    this.detectBrowser()
  }
  detectOS () {
    this.osStr = this.ua.match(/\((.*?)\)/)[1]
    let result
    for (let osname in os) {
      if (os.hasOwnProperty(osname)) {
        const reg = os[osname]
        const arr = this.osStr.match(reg)
        if (arr !== null) {
          const version = arr[1].replace(/[\-_]/g, '.')
          result = {
            version,
            name: osname
          }
          break
        }
      }
    }
    // check linux
    if (result === undefined && /linux/i.test(this.osStr)) {
      result = {
        name: 'linux'
      }
    }
    this.os = result
  }

  detectBrowserEngine () {
    let result
    for (let engineName in browserEngines) {
      if (browserEngines.hasOwnProperty(engineName)) {
        const reg = browserEngines[engineName]
        const arr = this.ua.match(reg)
        if (arr !== null) {
          const version = arr[1]
          result = {
            version,
            name: engineName
          }
          break
        }
      }
    }
    this.browserEngine = result
  }

  detectBrowser () {
    let result
    for (let i = 0; i < browsers.length; i += 1) {
      const info = browsers[i]
      const arr = this.ua.match(info.match)
      if (arr !== null) {
        result = {
          name: info.name
        }
        info.order.forEach((item, index) => {
          const m = arr[index + 1]
          if (m) result[item] = m
        })
        break
      }
    }
    this.browser = result
  }
}