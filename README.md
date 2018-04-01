# ohu-share

跨浏览器的分享插件，可优雅降级

## 分享策略

该分享插件秉持稳定，可靠的特点，可在PC端和移动端分别进行分享，移动端如果目标分享对象支持原生调用分享，那就进行原生分享，如果不支持，使用URL分享；PC端则一贯使用URL分享。

![flowchart](./assets/flowchart.png)

**分享目标**

✅ 微信好友

✅ 微信朋友圈

✅ QQ好友

✅ QQ空间

✅ 微博

**浏览器原生支持列表**

✅ QQ浏览器 

✅ UC浏览器 

✅ 微信内置浏览器 

✅ 百度浏览器

✅ 百度APP

✅ 搜狗浏览器

❌ QQ内置浏览器（待支持）


## 引入

```
npm i -S ohu-share
```
```javascript
import { Share } from 'ohu-share'
```
or
```html
<script src="https://unpkg.com/ohu-share@1.0.1/dist/ohu-share.min.js"></script>
<script>
  var share = new ohu.Share()
</script>
```

## API

### new Share(shareData, config)

初始化分享，主要是传入分享数据配置，及插件本身的配置

```javascript
const share = new Share({
  title: '简单例子',
  desc: '简单的摘要和描述',
  icon: '',
  link: 'https://github.com/jeffwcx',
  from: 'github',
  wechat: { // option，未选定配置，通过share.setShareData可异步加载
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: ''
  }
}, {
  dataset: '', // 可查看share.mount API
  appMap: {}, // 可查看share.mount API
  isSupport: function (supportType) {} // 可查看share.setSupport API
})
```

### share.to(Apps.MOMENTS)

单独APP分享接口

```javascript
import { Apps } from 'ohu-share'

share.to(Apps.QQ)
  .then(({ isSupport, supportType, context }) => {
    // 根据以上变量自由进行降级处理
  })
  .catch((err) => {
    // 处理错误
  })
```

### share.on('share', successHandler, errorHandler)
### share.mount(), share.mount({ dataset, appMap, el})

多个元素分享

```html
<button data-share="qq">share to QQ</button>
<button data-share="qzone">share to QZone</button>
<script>
  share.on('share', function success (app, support, context) {
    // support有两个参数： isSupport, supportType
    // 可根据不同的APP分别进行处理
  }, function error (err) {
    // 处理错误
  })
  // 默认的dataset是‘data-share’
  share.mount()
  share.mount({
    el: parentNode,
    appMap: {
      // 自定义分享的APP的名字，这里我们将wechatFriend对应到Apps.MOMENTS
      // 所以我们可以通过`data-share="wechatFriend"`分享到微信朋友圈
      'wechatFriend': Apps.MOMENTS
    },
    // 更改分享的dataset属性名
    // 设置为'share-to'之后，我们可以通过`<button data-share-to="qq"></button>`分享到qq
    dataset: 'share-to'
  })
</script>
```

### share.setShareData(modifyShareDataFunc)

设置分享数据

```javascript
// 可返回Promise，可用于动态加载Share数据（例如微信）
share.setShareData(function (shareData) {
  return fetch('wechat/api')
  .then((data) => {
    return Promise.resolve({
      then: function (resolve, reject) {
        return data.json()
      }
    })
  })
  .then((data) => {
    shareData.wechat = data
  })
})

// 直接设置
share.setShareData(function (shareData) {
  shareData.wechat = {
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature
  }
  return config
})
```

### share.setSupport(func)

定制返回的结果isSupport，以下为默认函数，你可查看下文的SUPPORT常量来决定你要如何定制函数

```javascript
// 定制isSupport属性
share.setSupport(function (supportType) {
  return !(SUPPORT.LEVEL4 === supportType ||
    SUPPORT.LEVEL7 === supportType)
})
```

### share.setAppMap(appMap), share.setAppMap(newAppValue, Apps.MOMENTS)
```javascript
share.setAppMap({
  'wechatFriend': Apps.MOMENTS,
  'timeline': Apps.MOMENTS, // 可重复设置
  'webo': Apps.WEIBO
})

share.setAppMap('QQ', Apps.QQ)

```

### 常量

+ 浏览器常量

```javascript
import { Browsers } from 'ohu-share'

Browsers.UC // 'uc'
```
or

```html
<script>
  var Browsers = ohu.Browsers
  Browsers.UC // 'uc'
</script>
```

```javascript
{
  QQBROWSER: 'qqbrowser',
  UC: 'uc',
  BAIDUBROWSER: 'baidubrowser',
  BAIDU: 'baidu',
  QQ: 'qq',
  WECHAT: 'wechat',
  LIEBAO: 'liebao',
  SOGOU: 'sogou'
}
```

+ APP名称常量

```javascript
import { Apps } from 'ohu-share'

Apps.WECHAT // 'wechat'
```
or

```html
<script>
  var Apps = ohu.Apps
  Apps.WECHAT // 'wechat'
</script>
```

```javascript
{
  WECHAT: 'wechat',
  MOMENTS: 'moments',
  QQ: 'qq',
  QZONE: 'qzone',
  WEIBO: 'weibo'
}
```
+ 支持类型常量

```javascript
import { SUPPORT } from 'ohu-share'

SUPPORT.LEVEL1 // 0 支持自定义分享和单独唤起APP
```
or

```html
<script>
  var SUPPORT = ohu.SUPPORT
  SUPPORT.LEVEL1  // 0 支持自定义分享和单独唤起APP
</script>
```
各个支持等级的解释

```javascript
{
  /**
   * 最好的支持类型，支持自定义分享和单独唤起APP，例如QQ浏览器
   */
  LEVEL1: 0,
  /**
   * 支持自定义分享，但只能唤起分享面板，例如百度浏览器
   */
  LEVEL2: 1,
  /**
   * 不支持自定义分享（或者支持有残缺），支持单个唤起应用，例如UC浏览器
   */
  LEVEL3: 2,
  /**
   * 支持自定义分享，但不支持唤起，例如微信内置浏览器
   */
  LEVEL4: 3,
  /**
   * 支持scheme
   */
  LEVEL5: 4,
  /**
   * 支持url
   */
  LEVEL6: 5,
  /**
   * 不支持任何形式的分享
   */
  LEVEL7: 6
}
```
## TODO
+ 使用async/await api
+ 定制分享策略
+ vue组件

## 一些你需要了解的坑

1. UC ios浏览器上分享，其自有变量`ucbrowser`在`DOMContentLoaded`或者是`load`事件触发时为`undefined`，据我测算大概在50ms后`ucbrowser`不为`undefined`

2. 百度浏览器，百度APP，UC浏览器，微信内置浏览器均不支持启动外部协议（location.href不起作用）



