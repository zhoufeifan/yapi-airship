import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { FieldDataType, ParamsRowDataType, TypeListItem, ObjectType } from './types'

// 根据数据类型
function getTSTypeByType(type: string) {
  switch(type) {
    case 'string':
      return t.tsStringKeyword()
    case 'number':
    case 'integer':
      return t.tsNumberKeyword()
    case 'boolean': 
      return t.tsBooleanKeyword()
    default: 
      return type ? t.tsTypeReference(t.identifier(type)) : t.tsUnknownKeyword()
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

// 构造 export Type 的语法树
function getExportDefaultDeclarationByType(typeItem: TypeListItem) {
  const {items, typeName, description } = typeItem;
  // 取得类型成员，{定义： 类型}
  const members = items.map(item => {
    // 判断是否是数组类型
    const tsTypeAnnotation = item.isArray ? t.tsArrayType(getTSTypeByType(item.type)) : getTSTypeByType(item.type)
    // 构造类型签名
    const result = t.tsPropertySignature(
      t.identifier(item.name), 
      t.tsTypeAnnotation(tsTypeAnnotation),
    )
    // 修改可选值
    item.required === false && (result.optional = true);
    item.description && t.addComment(result, 'trailing', item.description, true);
    return result;
  })
    
  const typeAnnotation = t.tsTypeLiteral(members)

  // 定义类型名称，对应的类型明细
  const declaration = t.tsTypeAliasDeclaration(t.identifier(typeName),null,typeAnnotation)
  const node = t.exportNamedDeclaration(declaration);
  // 添加相应的注释
  description && t.addComment(node, 'leading', description, true);
  return node;
}

interface ApiDataType {
  action: string,
  requestType: any,
  typeList: TypeListItem[],
  responseDataInfo: any,
  functionName: string,
}

// 构造 给业务层调用的 export 方法
function getExportFunc(apiData: ApiDataType) {
  const { action, functionName, requestType, responseDataInfo } = apiData
  const callExpression = t.callExpression(
    t.memberExpression(t.identifier('Request'), t.identifier('request')),
    [t.stringLiteral(action), t.identifier('params'), t.booleanLiteral(false)]
  )
  const tsType = t.tsTypeReference(t.identifier(responseDataInfo.typeName))

  callExpression.typeParameters = t.tsTypeParameterInstantiation(
    [
      responseDataInfo.isArray ? t.tsArrayType(tsType) : tsType
    ]
  )
  const returnStatement = t.returnStatement(callExpression)

  const paramsIdentifier = t.identifier('params')
  // 给参数定义添加ts类型约束
  paramsIdentifier.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier(requestType)))
  
  const functionDelaration = t.functionDeclaration(t.identifier(functionName),[paramsIdentifier], t.blockStatement([returnStatement]) )
  return t.exportNamedDeclaration(functionDelaration)
  // `
  //   export function getNewcomerGoodsList (params: GetNewcomerGoodsListReq) {
  //     return Request.request<AA>(action, params, false)
  //   }
  // `
}


export default function(apiData: ApiDataType) {
  const { typeList } = apiData
  const code = `
  export function getNewcomerGoodsList (params: GetNewcomerGoodsListReq) {
    return Request.request<AA>('action', params, false)
   }
  `;
  // console.log(typeList)
  // console.log(JSON.stringify(exportTypeDeclaration))
  const ast = parse(code, {
    sourceType: "module",
    plugins: [
      "typescript",
    ],
  });
  const body = ast.program.body;
  // 创建import语句导入请求方法
  const functionImport = t.importDeclaration([t.importDefaultSpecifier(t.identifier('Request'))], t.stringLiteral('@/network'))
  body.push(functionImport);
  // 遍历类型列表，创建依赖的类型，并以模块形式导出
  // typeList.forEach(item => {
  //   const exportDefaultDeclaration =  getExportDefaultDeclarationByType(item)
  //   body.push(exportDefaultDeclaration);
  // })
  // 创建入口函数并导出给
  const exportFunc = getExportFunc(apiData)
  body.push(exportFunc);
  console.warn(JSON.stringify(ast.program.body))
  const output = generate(
    ast
  );
  return output.code
  // console.warn(output)
  // 构造请求方法调用代码
}
