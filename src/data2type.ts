import { isObject, getHeadCodeToUpperCase } from './utils';
import { TypeListItem, FieldDataType } from './types';
// 将带注释的（非标准json格式的字符串）转换为对象格式的数据
export function transformStringToData(str: string) {
  const commentMap = Object.create(null);
  const rawArray = str.split('\n');
  const pureStringArray = rawArray.map(item => {
    let commentText = '';
    item = item
      .trim()
      .replace(/\/\/.*/g, text => {
        commentText = text;
        return '';
      })
      .trim();
    if (commentText) {
      commentMap[item] = commentText;
    }
    return item;
  });
  const data = JSON.parse(pureStringArray.join(''));
  return data || {};
}

// 根据对象的数据模型，生成字段类型的数据描述字段
export function getTypeModalByData(value: any, keyName: string, typeList: TypeListItem[]) {
  let isArray = false;
  let type = '';
  // 数组类型的数据
  if (Array.isArray(value)) {
    isArray = true;
    // 取第一项数据做验证即可
    const res = getTypeModalByData(value[0], keyName, typeList);
    type = res.type;
  }
  // 对象类型
  else if (isObject(value)) {
    const items: FieldDataType[] = Object.entries(value).map(([key, value]) => {
      const res = getTypeModalByData(value, key, typeList);
      return {
        name: key,
        type: res.type,
        isArray: res.isArray,
        required: false,
      };
    });
    const typeName = `${getHeadCodeToUpperCase(keyName)}Type`;
    // 生成类型列表项
    typeList.push({
      typeName,
      items,
    });
    type = typeName;
  }
  // 普通类型
  else {
    type = typeof value;
  }
  return {
    isArray,
    type,
    typeList,
  };
}
