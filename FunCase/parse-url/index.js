const url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

function parseParam(url) {
  const paramsArr = url.split('?')
  const params = paramsArr[1] ?? ''
  const res = {}
  if (params) {
    const singleParamsArr = params.split('&')
    for (const param of singleParamsArr) {
      const [key, val] = param.split('=').map(decodeURIComponent)
      if (res[key]) {
        // 已经出现过两次以上
        if (res[key] instanceof Array) {
          res[key].push(val)
        }
        // 第二次出现
        else {
          res[key] = [res[key], val]
        }
      } else {
        // 第一次出现
        res[key] = val ?? true
      }
    }
  }
  console.log(res)
}
