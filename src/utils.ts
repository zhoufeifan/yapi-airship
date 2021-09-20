export function fetchData(id: string) {
  return fetch(`https://yapi.hellobike.cn/api/interface/get?id=${id}`)
  .then(function(response) {
      return response.json();
  })
}
  
// 首字母转大写
export function getHeadCodeToUpperCase(codes: string) {
  return codes.replace(/(^)([a-z])/g,(code)=>{
    return code.toUpperCase()
  })
}

// 获取url上的参数
export function getApiId (url: string) {
  const result = url.match(/\/api\/(\d+)/)
  if (result) {
    return result[1]
  }
  return ''
}

