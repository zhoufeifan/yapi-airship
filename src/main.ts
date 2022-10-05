import { fetchData, getHeadCodeToUpperCase, getApiId, getApiBasicInfo } from './utils';
import { transformStringToData, getTypeModalByData } from './data2type';
import { mockData1, mockData2 } from './mockData';
import { FieldDataType, ParamsRowDataType, TypeListItem, ObjectType, EnumTypeItem } from './types';
import transform2code from './transform2code';
import { insertGenerateButton, insertSetParamsButton } from './element';

let pageData: any = null;
let typeList: TypeListItem[] = [];
let enumTypeList: EnumTypeItem[] = [];

// 获取入参信息
function getRequestType(actionName: string): string {
  const { properties, required: requiredList } = JSON.parse(pageData.req_body_other) as ParamsRowDataType;
  const items: any = [];

  Object.entries(properties).forEach(([key, data]) => {
    const item = getTypeItem(data, key, requiredList);
    items.push(item);
  });
  console.warn(JSON.stringify(items));
  if (!items.length) return '';
  const typeName = `${getHeadCodeToUpperCase(actionName)}ParamsType`;
  typeList.push({
    typeName,
    items,
  });
  return typeName;
}

function getArrayType(items: ParamsRowDataType, keyName: string, description = '') {
  if (items.type === 'array') {
    // 暂不处理二维数组的情况
    return '';
  } else if (items.type === 'object') {
    return getObjectType(items.properties, keyName, items.required, description);
  } else {
    return items.type;
  }
}

function getObjectType(data: ObjectType, keyName: string, requiredList = [''], description = '') {
  // 处理复杂数据，生成类型项，push到typeList
  const items = Object.entries(data).map(([keyName, data]) => {
    return getTypeItem(data, keyName, requiredList);
  });
  const typeName = `${getHeadCodeToUpperCase(keyName)}Type`;
  // 生成类型列表项
  // todo 重名处理
  typeList.push({
    typeName,
    items,
    description,
  });
  return typeName;
}

// 获取字段类型属性
function getTypeItem(data: ParamsRowDataType, keyName: string, requiredList = ['']): FieldDataType {
  let type = '';
  let isArray = false;
  if (data.type === 'object') {
    type = getObjectType(data.properties, keyName, data.required, data.description);
  } else if (data.type === 'array') {
    type = getArrayType(data.items, keyName, data.description);
    isArray = true;
  } else {
    type = data.type;
  }
  const result: FieldDataType = {
    name: keyName,
    description: data.description?.replace(/\t|\n|\s/g, ''),
    type,
    isArray,
    required: requiredList.includes(keyName),
  };
  if (type === 'string' && data.enum && data.enum.length) {
    // result.enum = data.enum
    // result.type = 'enum'
    const enumType = `${getHeadCodeToUpperCase(keyName)}EnumType`;
    // 生成类型列表项
    enumTypeList.push({
      typeName: enumType,
      items: data.enum,
      description: `${result.description}枚举类`,
    });
    result.type = enumType;
  }
  return result;
}

// 获取返回值的数据类型信息
function getResponseDataInfo(actionName: string) {
  let typeName = '';
  let isArray = false;
  const keyName = `${getHeadCodeToUpperCase(actionName)}ResponseType`;
  // json 格式的字符串
  try {
    const { properties } = JSON.parse(pageData.res_body);
    const data = properties.data as ParamsRowDataType;
    console.warn(data);
    const result = getTypeItem(data, keyName, data.required);
    typeName = result.type;
    isArray = result.isArray;
  } catch (e) {
    // 解析非json 格式的字符串
    const formData = transformStringToData(pageData.res_body);
    const result = getTypeModalByData(formData.data || formData, keyName, typeList);
    typeName = result.type;
    isArray = result.isArray;
    typeList = result.typeList;
  }

  return {
    typeName,
    isArray,
  };
}

// 根据数据生成相应的ts代码
function generateCode() {
  const { actionName, apiDesc, method } = getApiBasicInfo(pageData);
  const requestType = getRequestType(actionName);
  const resultData = {
    actionName,
    apiDesc,
    apiLocation: window.location.href,
    functionName: `${actionName}API`,
    requestType,
    responseDataInfo: getResponseDataInfo(actionName),
    typeList,
    method,
    enumTypeList,
  };
  console.warn(resultData);
  const code = lintCode(transform2code(resultData));
  return code;
}

function lintCode(code: string) {
  return code.replace(/(?<=[^:]\/\/)(.+)/g, (_, res) => {
    return ` ${res}`;
  });
}

function doWork(data: any) {
  pageData = data;
  typeList = [];
  enumTypeList = [];
  const code = generateCode();
  navigator.clipboard
    .writeText(code)
    .then(() => {
      alert('代码已经复制到粘贴板上');
    })
    .catch(e => {
      alert(e);
    });
}

// todo 页面挂载后再执行,尝试在onload里

setTimeout(() => {
  const generateButton = insertGenerateButton();
  generateButton.addEventListener('click', () => {
    doWork(mockData1);
    // 从url上拿取apiId
    // const apiId = getApiId(window.location.href);
    // apiId &&
    //   fetchData(apiId)
    //     .then(({ errcode, errmsg, data }) => {
    //       if (errcode !== 0) throw errmsg;
    //       doWork(data);
    //     })
    //     .catch(msg => {
    //       alert(msg);
    //     });
  });
}, 1000);
