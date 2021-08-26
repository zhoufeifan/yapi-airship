import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";

// 根据数据类型
function getTSTypeByType(type) {
  switch(type) {
    case 'string':
      return t.tsStringKeyword()
    case 'number':
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
function getExportDefaultDeclarationByType(typeItem) {
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
  description && t.addComment(node, 'leading', description, true);
  return node;
}


export default function(apiData: any) {
  const { action, requestType, responseDataInfo, typeList } = apiData
  const code = ``;
  // console.log(typeList)
  // console.log(JSON.stringify(exportTypeDeclaration))
  const ast = parse(code, {
    sourceType: "module",
    plugins: [
      "typescript",
    ],
  });
  const body = ast.program.body;
  // 遍历类型列表，创建依赖的类型，并以模块形式导出
  typeList.forEach(item => {
    const exportDefaultDeclaration =  getExportDefaultDeclarationByType(item)
    body.push(exportDefaultDeclaration);
  })
  const output = generate(
    ast
  );
  console.warn(output)
  // 构造请求方法调用代码
}
