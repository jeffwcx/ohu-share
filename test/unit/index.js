// 导入所有
function importAll (r) {
  r.keys().forEach(r)
}

const testsContext = require.context('./specs', true, /\.test\.js$/)

importAll(testsContext)

const srcContext = require.context('../../src', true, /index\.js$/)

importAll(srcContext)
