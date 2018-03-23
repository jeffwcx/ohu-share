import { OS } from './constants'

export function concatURL (baseUrl, queryStrData, encode = false) {
  const queryStr = Object.keys(queryStrData).map(i => {
    const v = encode
      ? encodeURIComponent(queryStrData[i])
      : queryStrData[i]
    return `${i}=${v}`
  }).join('&')

  return baseUrl + (queryStr ? `?${queryStr}` : '')
}

export function openByScheme (scheme, data, osName) {
  const completeSchema = data ? concatURL(scheme, data) : scheme
  window.location.href = completeSchema
  // if (osName === OS.IOS) {
  //   const iframe = document.createElement('iframe')
  //   iframe.src = completeSchema
  //   iframe.style.visibility = 'hidden'
  //   document.body.appendChild(iframe)
  //   setTimeout(() => {
  //     iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe)
  //   }, 2000)
  // } else {
  //   window.location.href = completeSchema
  // }
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
