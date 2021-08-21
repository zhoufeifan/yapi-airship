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
