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

export function openBySchema (schema, data, os) {
  const completeSchema = concatURL(schema, data)
  if (os === OS.IOS) {
    window.location.href = completeSchema
  } else {
    const iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    document.body.appendChild(iframe)
    setTimeout(() => {
      iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe)
    }, 2000)
  }
}

export function loadJS (src, callback) {
  const el = document.createElement('script')
  el.src = src
  document.body.appendChild(el)
  el.onload = callback || function () {}
}

export function isMobile (osName) {
  return osName === OS.IOS || osName === OS.ANDROID
}
