export function fetchData(id: string) {
  return fetch(`${window.location.origin}/api/interface/get?id=${id}`).then(function (response) {
    return response.json();
  });
}

// 首字母转大写
export function getHeadCodeToUpperCase(codes: string) {
  return codes.replace(/(^)([a-z])/g, code => {
    return code.toUpperCase();
  });
}

// 获取url上的参数
export function getApiId(url: string) {
  const result = url.match(/\/api\/(\d+)/);
  if (result) {
    return result[1];
  }
  return '';
}

// pageData.title.replace(/(^[a-zA-Z.0-9]+)\((.+)\)/g, function (_: never, action: string, apiDesc: string) {
//   result.action = action;
//   result.apiDesc = apiDesc;
// });

function convertPathToActionName(path: string) {
  let result = path.replace(/\/([a-zA-Z.0-9])/g, (_, code, index) => {
    return index ? code.toUpperCase() : code;
  });
  return result;
}

// 获取接口请求的基础字段
export function getApiBasicInfo(pageData: any) {
  const { title, path, method = '' } = pageData;
  const result = {
    actionName: convertPathToActionName(path),
    apiDesc: title,
    method: method.toLowerCase(),
  };
  console.log(pageData);
  console.log(result);
  return result;
}
