# ohu-share

跨浏览器的分享插件，可优雅降级

## TODO
+ vue组件

## 分享策略

该分享插件秉持稳定，可靠的特点，可在PC端和移动端分别进行分享，移动端如果目标分享对象支持原生调用分享，那就进行原生分享，如果不支持，使用URL分享；PC端则一贯使用URL分享。

![flowchart](./assets/flowchart.png)

**分享目标**

✅ 微信好友

✅ 微信朋友圈

✅ QQ好友

✅ QQ空间

✅ 微博

**原生浏览器支持列表**

✅ QQ浏览器 

✅ UC浏览器 

✅ 微信内置浏览器 

✅ 百度浏览器

✅ 百度APP

✅ 搜狗浏览器

❌ QQ内置浏览器（待支持）

## 兼容性

浏览器： IE9 ⤴️ 及主流浏览器

系统： iOS 8+

## 引入

```
npm i -S ohu-share
```
```javascript
import { Share } from 'ohu-share'
```

## API

### new Share()
初始化
```javascript
const share = new Share({
  title: '简单例子',
  desc: '简单的摘要和描述',
  icon: '',
  link: 'https://github.com/jeffwcx',
  from: 'github',
  wechat: { // option
    appId: '',
    timestamp: '',
    nonceStr: '',
    signature: ''
  }
})
```

### share.to()

单独APP分享接口

```javascript
import { Apps } from 'ohu-share'

share.to(Apps.QQ)
  .then(({ isSupport, supportType }) => {
    // 可根据不同的支持类型进行降级处理
  })
  .catch((err) => {
    // 处理错误
  })
```

### share.on(), share.mount()

多个元素分享

```html
<button data-share="qq">share to QQ</button>
<button data-share="qzone">share to QZone</button>
<script>
  share.on('share', function success (app, { isSupport, supportType }) {
    // 可根据不同的APP分别进行处理
  }, function error (err) {
    // 处理错误
  })
  // 默认的dataset是‘data-share’
  share.mount()
</script>
```

### 常量

+ 浏览器常量
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

## 一些你需要了解的坑

1. UC ios浏览器上分享，其自有变量`ucbrowser`在`DOMContentLoaded`或者是`load`事件触发时为`undefined`，据我测算大概在50ms后`ucbrowser`不为`undefined`

2. 百度浏览器，百度APP，UC浏览器，微信内置浏览器均不支持启动外部协议（location.href不起作用）



