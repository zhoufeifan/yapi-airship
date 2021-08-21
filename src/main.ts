import { parse } from "@babel/parser";
import { fetchData, getHeadCodeToUpperCase } from './utils'
import { mockData } from './mockData'
import { FieldDataType, RequestParamsRowDataType, TypeListItem, ResponseParamsRowDataType, ObjectType } from './types'

let pageData: any = null;

/*
typeList: [{
  typeName: 'DetailType',
  items: [{
    name: 'name',
    desc: '名字',
    type: string, 
    required: true
  }]
}]
*/

const typeList: TypeListItem[] = [];

// 获取action
function getAction() {
  return pageData.title.replace(/(^[a-z.]+)(.+)/g, '$1')
}

// 获取入参信息
function getRequestDataInfo(actionName: string): { typeName: string, paramsList: FieldDataType[] } {
  // properties:
    // action: {type: "string", description: "action"}
    // cityCode: {type: "string", description: "展示城市code"}
    // options: {type: "array", items: {…}, description: "二级导航tab对象集合"}
    // tabId: {type: "string", description: "一级导航id，一级导航接口返回透传"}
    // token: {type: "string", description: "登录时传"}
  // required: (3) ["action", "cityCode", "tabId"]
  
  // todo 兼容params 有包含对象的场景
  const { properties, required } = JSON.parse(pageData.req_body_other) as RequestParamsRowDataType
  const paramsList: any = [];
  Object.entries(properties).map(([key, data])=>{
    //过滤掉 token 和 action, 后面可以考虑走配置
    if(key !== 'action' && key !== 'token') {
      paramsList.push({
        name: key,
        ...data,
        required: required.includes(key)
      })
    }
  })
  return {
    typeName: `${actionName}Req`,
    paramsList,
  }
}



function getArrayType(items: ResponseParamsRowDataType, keyName: string) {
  if (items.type === 'array') {
    // 暂不处理二维数组的情况
    return ''
  } else if(items.type === 'object') {
    const type = getObjectType(items.properties, keyName, items.required);
    console.warn(type);
    return type
  } else {
    return items.type
  }
}

function getObjectType(data: ObjectType, keyName: string, requiedList = ['']) {
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
    }
  );
  return typeName
}


// 获取字段属性
function getTypeItem(data: ResponseParamsRowDataType, keyName: string, requiredList = ['']): FieldDataType{
  let type = ''
  let isArray = false
  if(data.type === 'object' ) {
    type = getObjectType(data.properties, keyName, data.required);
  } else if(data.type === 'array') {
    type = getArrayType(data.items, keyName);
    isArray = true;
  }
  return {
    name: keyName,
    description: data.description,
    type,
    isArray,
    required: requiredList.includes(keyName)
  }
}


// 获取返回值的数据类型信息
function getResponseDataInfo(actionName: string) {
  // console.warn(JSON.parse(pageData.res_body))
  // const { properties: { data } } = JSON.parse(pageData.res_body);
  // console.warn(JSON.stringify(data))
  const { type, isArray } = getTypeItem(mockData, `${actionName}ResponseType`, mockData.required)
  console.warn('--------')
  console.warn(type, isArray)
  return {
    typeName: type,
    isArray,
  }
}



function sendMsg() {
  // const action = getAction();
  // const actionName = getHeadCodeToUpperCase(action);
  const actionName = 'NIMA'
  const result = {
    // action,
    // requestDataInfo: getRequestDataInfo(actionName),
    responseDataInfo: getResponseDataInfo(actionName),
  }
  console.warn(JSON.stringify(result.responseDataInfo))
  chrome.runtime.sendMessage(result);
}


chrome.runtime.onMessage.addListener((request) => {
	if(request.cmd == 'sendMsg') {
    console.log(pageData);
    // pageData && sendMsg();
  }
});
sendMsg();
console.warn(typeList)
// fetchData('56666').then(({errcode, errmsg, data}) => {
//   if(errcode !== 0) throw errmsg
//   pageData = data;
//   sendMsg();
// }).catch((msg) => {
//   alert(msg)
// })
