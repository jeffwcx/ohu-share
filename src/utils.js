import { OS, Apps } from './constants'

export function concatURL (baseUrl, queryStrData, encode = false) {
  const queryStr = Object.keys(queryStrData).map(i => {
    const v = encode
      ? encodeURIComponent(queryStrData[i])
      : queryStrData[i]
    return `${i}=${v}`
  }).join('&')

  return baseUrl + (queryStr ? `?${queryStr}` : '')
}

export function openByScheme (scheme, data) {
  const completeSchema = data ? concatURL(scheme, data) : scheme
  window.location.href = completeSchema
  // const iframe = document.createElement('iframe')
  // iframe.style.visibility = 'hidden'
  // document.body.appendChild(iframe)
  // setTimeout(() => {
  //   iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe)
  // }, 2000)
}

const openStrategy = {
  [Apps.QQ]: {
    [OS.IOS]: {
      scheme: 'mqqapi://share/to_fri',
      query: {
        'src_type': 'web',
        'version': 1,
        'file_type': 'news'
      }
    },
    [OS.ANDROID]: {
      scheme: 'mqqapi://share/to_fri',
      query: {
        'src_type': 'isqqBrowser',
        'version': 1,
        'file_type': 'news'
      }
    }
  },
  [Apps.QZONE]: {
    [OS.IOS]: {
      scheme: 'mqqapi://share/to_fri',
      query: {
        'file_type': 'new',
        'src_type': 'web',
        'version': 1,
        'generalpastboard': 1,
        'shareType': 1,
        'cflag': 1,
        'objectlocation': 'pasteboard',
        'callback_type': 'scheme',
        'callback_name': 'QQ41AF4B2A'
      }
    },
    [OS.ANDROID]: {
      scheme: 'mqqapi://share/to_qzone',
      query: {
        'src_type': 'isqqBrowser',
        'version': 1,
        'file_type': 'news',
        'req_type': 1
      }
    }
  }
}

export function utoa (str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}

export function atou (str) {
  return decodeURIComponent(escape(window.atob(str)))
}

export function getQQOrQzoneQueryData (shareData) {
  return {
    'share_id': '924053302',
    'url': utoa(shareData.link),
    'title': utoa(shareData.title),
    'description': utoa(shareData.desc),
    'previewimageUrl': utoa(shareData.icon),
    'image_url': utoa(shareData.icon)
  }
}

export function openQQOrQzone (appName, osName, shareData) {
  let data
  if (openStrategy[appName]) {
    data = openStrategy[appName][osName]
  }
  if (data && osName && shareData) {
    openByScheme(data.scheme,
      Object.assign({},
        data.query,
        getQQOrQzoneQueryData(shareData)),
      osName)
  }
}

export function loadJS (src) {
  return Promise.resolve({
    then: (resolve, reject) => {
      const el = document.createElement('script')
      el.src = src
      document.body.appendChild(el)
      el.onload = function () {
        resolve()
      }
      el.onerror = function () {
        reject()
      }
    }
  })
}

export function isMobile (osName) {
  return osName === OS.IOS || osName === OS.ANDROID
}
