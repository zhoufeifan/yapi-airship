import { parse } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { FieldDataType, ParamsRowDataType, TypeListItem, ObjectType, EnumTypeItem } from './types';
import { renderTemplate } from './render';
// 根据数据类型
function getTSTypeByType(type: string) {
  switch (type) {
    case 'string':
      return t.tsStringKeyword();
    case 'number':
    case 'integer':
      return t.tsNumberKeyword();
    case 'boolean':
      return t.tsBooleanKeyword();
    default:
      return type ? t.tsTypeReference(t.identifier(type)) : t.tsUnknownKeyword();
  }

  // TSAnyKeyword
  // TSBigIntKeyword
  // TSBooleanKeyword
  // TSIntrinsicKeyword
  // TSLiteralType
  // TSNeverKeyword
  // TSNullKeyword
  // TSNumberKeyword
  // TSObjectKeyword
  // TSStringKeyword
  // TSSymbolKeyword
  // TSThisType
  // TSUndefinedKeyword
  // TSUnknownKeyword
  // TSVoidKeyword
}

// 构造 export Enum 的语法树

function getExportEnumDeclaration(enumItem: EnumTypeItem) {
  const { items, typeName, description } = enumItem;
  const members = items.map(enumName => {
    return t.tsEnumMember(t.identifier(enumName), t.stringLiteral(enumName));
  });
  const declaration = t.tsEnumDeclaration(t.identifier(typeName), members);
  const node = t.exportNamedDeclaration(declaration);
  description && t.addComment(node, 'leading', description, true);
  return node;
}

// 构造 export Type 的语法树
function getExportTypeDeclarationByType(typeItem: TypeListItem) {
  const { items, typeName, description } = typeItem;
  // 取得类型成员，{定义： 类型}
  const members = items.map(item => {
    // 判断是否是数组类型
    const tsTypeAnnotation = item.isArray ? t.tsArrayType(getTSTypeByType(item.type)) : getTSTypeByType(item.type);
    // 构造类型签名
    const result = t.tsPropertySignature(t.identifier(item.name), t.tsTypeAnnotation(tsTypeAnnotation));
    // 修改可选值
    item.required === false && (result.optional = true);
    // 添加属性成员的注释
    item.description && t.addComment(result, 'trailing', item.description, true);
    return result;
  });

  const typeAnnotation = t.tsTypeLiteral(members);

  // 定义类型名称，对应的类型明细
  const declaration = t.tsTypeAliasDeclaration(t.identifier(typeName), null, typeAnnotation);
  const node = t.exportNamedDeclaration(declaration);
  // 添加类型的注释
  description && t.addComment(node, 'leading', description, true);
  return node;
}

interface ApiDataType {
  actionName: string;
  requestType: any;
  typeList: TypeListItem[];
  enumTypeList: EnumTypeItem[];
  responseDataInfo: any;
  functionName: string;
  apiDesc: string;
  apiLocation: string;
}

// 构造 给业务层调用的 export 方法
function getExportFunc(apiData: ApiDataType) {
  // const { action, functionName, requestType, responseDataInfo } = apiData
  // const callExpression = t.callExpression(
  //   t.memberExpression(t.identifier('Request'), t.identifier('request')),
  //   [t.stringLiteral(action), requestType ? t.identifier('params'):t.objectExpression([]), t.booleanLiteral(isNeedToken), t.booleanLiteral(isSkipLogin)]
  // )
  // const tsType = t.tsTypeReference(t.identifier(responseDataInfo.typeName))
  // callExpression.typeParameters = t.tsTypeParameterInstantiation(
  //   [
  //     responseDataInfo.isArray ? t.tsArrayType(tsType) : tsType
  //   ]
  // )
  // const returnStatement = t.returnStatement(callExpression)
  // const args = []
  // if (requestType) {
  //   const paramsIdentifier = t.identifier('params')
  //   // 给参数定义添加ts类型约束
  //   paramsIdentifier.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier(requestType)))
  //   args.push(paramsIdentifier)
  // }
  // const functionDeclaration = t.functionDeclaration(t.identifier(functionName),args, t.blockStatement([returnStatement]) )
  // return t.exportNamedDeclaration(functionDeclaration)
  // `
  //   export function getNewcomerGoodsList (params: GetNewcomerGoodsListReq) {
  //     return Request.request<GetNewcomerGoodsListRep>(action, params, false)
  //   }
  // `
}

export default function (apiData: ApiDataType) {
  const { typeList, apiDesc, apiLocation, actionName, enumTypeList, requestType, responseDataInfo } = apiData;
  // console.log(typeList)
  // console.log(JSON.stringify(exportTypeDeclaration))
  const ast = parse(``, {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  const body = ast.program.body;
  console.warn(JSON.stringify(body));
  // 创建import语句导入请求方法
  // const functionImport = t.importDeclaration([t.importDefaultSpecifier(t.identifier('Request'))], t.stringLiteral('@/network'))
  // const apiComment = `
  //   * ${apiDesc}
  //   * yapi: ${apiLocation}
  //   * actionName: ${actionName}
  // `
  // t.addComment(functionImport, 'leading', apiComment, false);
  // body.push(functionImport);
  // 遍历枚举类列表，创建枚举类代码
  enumTypeList.forEach(item => {
    const exportEnumDeclaration = getExportEnumDeclaration(item);
    body.push(exportEnumDeclaration);
  });
  // 遍历类型列表，创建依赖的类型，并以模块形式导出
  typeList.forEach(item => {
    const exportTypeDeclaration = getExportTypeDeclarationByType(item);
    body.push(exportTypeDeclaration);
  });
  // 创建入口函数并导出
  // const exportFunc = getExportFunc(apiData)
  // body.push(exportFunc);
  const typeCode = generate(ast).code;
  const finalCode = renderTemplate({
    linkAddress: apiLocation,
    title: apiDesc,
    typeCode,
    actionName,
    method: 'post',
    requestTypeName: requestType,
    responseTypeName: responseDataInfo.typeName,
  });
  console.warn(finalCode);
  return finalCode;
  // 构造请求方法调用代码
}
