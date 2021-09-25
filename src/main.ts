import { fetchData, getHeadCodeToUpperCase, getApiId } from './utils'
// import { responseParmasData, requestParmasData } from './mockData'
import { FieldDataType, ParamsRowDataType, TypeListItem, ObjectType } from './types'
import transform2code from './transform2code';
import { insertGenerateButton, insertSetParamsButton } from './element';

let pageData: any = null;
let isNeedToken = false;
let actionName = ''
let isSkipLogin = false;
/*
typeList: [{
  typeName: 'DetailType',
  items: [{
    name: 'name',
    description: '名字',
    type: string, 
    required: true
  }]
}]
*/

const typeList: TypeListItem[] = [];

// 获取action
function getAction() {
  return pageData.title.replace(/(^[a-z.0-9]+)(.+)/g, '$1')
}

// 获取入参信息
function getRequestType(actionName: string): string {
  // properties:
    // action: {type: "string", description: "action"}
    // cityCode: {type: "string", description: "展示城市code"}
    // options: {type: "array", items: {…}, description: "二级导航tab对象集合"}
    // tabId: {type: "string", description: "一级导航id，一级导航接口返回透传"}
    // token: {type: "string", description: "登录时传"}
  // required: (3) ["action", "cityCode", "tabId"]
  
  // todo 兼容params 有包含对象的场景

  const { properties, required: requiredList } = JSON.parse(pageData.req_body_other) as ParamsRowDataType
  const items: any = [];
  
  // 判断这个接口是否需要token
  isNeedToken = requiredList.includes('token');
  
  Object.entries(properties).forEach(([key, data])=>{

    //过滤掉 token 和 action, 后面可以考虑走配置
    if(key === 'action' || key === 'token') return

    const item = getTypeItem(data, key, requiredList)
    items.push(item)
  })
  const typeName = `${actionName}Req`
  typeList.push({
    typeName,
    items,
  })
  return typeName
}


function getArrayType(items: ParamsRowDataType, keyName: string, description = '') {
  if (items.type === 'array') {
    // 暂不处理二维数组的情况
    return ''
  } else if(items.type === 'object') {
    return getObjectType(items.properties, keyName, items.required, description);
  } else {
    return items.type
  }
}

function getObjectType(data: ObjectType, keyName: string, requiedList = [''], description = '') {
  // 处理复杂数据，生成类型项，push到typeList
  // {
  //   "aa": {
  //     "type": "string",
  //     "description": "今日必推（好物必买）111",
  //     "required": []
  //   },
  //   "bb": {
  //     "type": "string",
  //     "description": "今日必推（好物必买）222",
  //     "required": []
  //   },
  // }
  const items = Object.entries(data).map(([keyName, data])=>{
    return getTypeItem(data, keyName, requiedList)
  })
  const typeName = `${getHeadCodeToUpperCase(keyName)}Type`;
  // 生成类型列表项
  typeList.push(
    {
      typeName,
      items,
      description,
    }
  );
  return typeName
}


// 获取字段类型属性
function getTypeItem(data: ParamsRowDataType, keyName: string, requiredList = ['']): FieldDataType{
  let type = ''
  let isArray = false
  if(data.type === 'object') {
    type = getObjectType(data.properties, keyName, data.required, data.description);
  } else if(data.type === 'array') {
    type = getArrayType(data.items, keyName, data.description);
    isArray = true;
  } else {
    type = data.type
  }
  return {
    name: keyName,
    description: data.description?.replace(/\t|\n|\s/g, ''),
    type,
    isArray,
    required: requiredList.includes(keyName)
  }
}


// 获取返回值的数据类型信息
function getResponseDataInfo(actionName: string) {
  const { properties } = JSON.parse(pageData.res_body);
  const data = properties.data as ParamsRowDataType
  console.warn(data);
  const { type, isArray } = getTypeItem(data, `${actionName}Response`, data.required)
  return {
    typeName: type,
    isArray,
  }
}

function generateCode() {
  const action = getAction();
  // const actionName = getHeadCodeToUpperCase(action);
  // 这个两个参数需要用户输入
  // const actionName = 'AAA';
  // const isSkipLogin = false;
  const resultData = {
    action,
    isNeedToken,
    isSkipLogin,
    functionName: `${actionName}API`,
    requestType: getRequestType(actionName),
    responseDataInfo: getResponseDataInfo(actionName),
    typeList
  }
  console.warn(resultData);
  const code = transform2code(resultData);
  return code;
  // console.warn(code)
}


// 从url上拿取apiId
const apiId = getApiId(window.location.href)

apiId && fetchData(apiId).then(({errcode, errmsg, data}) => {
  if(errcode !== 0) throw errmsg
  pageData = data;

  setTimeout(()=>{
    const generateButton = insertGenerateButton();
    generateButton.addEventListener('click', ()=>{
      if (!actionName) {
        alert('请先设置参数');
        return
      }
      const code = generateCode();
      navigator.clipboard.writeText(code).then(()=>{
        alert('代码已经复制到粘贴板上')
      }).catch(e=>{
        alert(e)
      })
    });

    const setParamsButton = insertSetParamsButton();
    setParamsButton.addEventListener('click', () => {
      actionName = prompt("请输入接口名称（英文）") || '';
      isSkipLogin = !confirm("token失效是否需要跳转登录页？是，请点击确定，否则点击取消！");
      alert('参数设置成功，可以生成API代码了~')
    })
  }, 1000)

}).catch((msg) => {
  alert(msg)
})


