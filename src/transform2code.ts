import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { FieldDataType, ParamsRowDataType, TypeListItem, ObjectType, EnumTypeItem } from './types'

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

// 构造 export Enum 的语法树

function getExportEnumDeclaration(enumItem: EnumTypeItem) {
  const {items, typeName, description } = enumItem;
  const members = items.map(enumName=>{
    return t.tsEnumMember(t.identifier(enumName), t.stringLiteral(enumName));
  })
  const declaration = t.tsEnumDeclaration(t.identifier(typeName), members)
  const node = t.exportNamedDeclaration(declaration);
  description && t.addComment(node, 'leading', description, true);
  return node
}

// 构造 export Type 的语法树
function getExportTypeDeclarationByType(typeItem: TypeListItem) {
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
    // 添加属性成员的注释
    item.description && t.addComment(result, 'trailing', item.description, true);
    return result;
  })
    
  const typeAnnotation = t.tsTypeLiteral(members)

  // 定义类型名称，对应的类型明细
  const declaration = t.tsTypeAliasDeclaration(t.identifier(typeName),null,typeAnnotation)
  const node = t.exportNamedDeclaration(declaration);
  // 添加类型的注释
  description && t.addComment(node, 'leading', description, true);
  return node;
}

interface ApiDataType {
  action: string,
  actionName: string,
  isNeedToken: boolean,
  isSkipLogin: boolean,
  requestType: any,
  typeList: TypeListItem[],
  enumTypeList: EnumTypeItem[],
  responseDataInfo: any,
  functionName: string,
  apiDesc: string,
  apiLocation: string,
}

// 构造 给业务层调用的 export 方法
function getExportFunc(apiData: ApiDataType) {
  const { action, functionName, requestType, responseDataInfo, isNeedToken, isSkipLogin } = apiData
  const callExpression = t.callExpression(
    t.memberExpression(t.identifier('Request'), t.identifier('request')),
    [t.stringLiteral(action), requestType ? t.identifier('params'):t.objectExpression([]), t.booleanLiteral(isNeedToken), t.booleanLiteral(isSkipLogin)]
  )
  const tsType = t.tsTypeReference(t.identifier(responseDataInfo.typeName))

  callExpression.typeParameters = t.tsTypeParameterInstantiation(
    [
      responseDataInfo.isArray ? t.tsArrayType(tsType) : tsType
    ]
  )
  const returnStatement = t.returnStatement(callExpression)

  const args = []
  if (requestType) {
    const paramsIdentifier = t.identifier('params')
    // 给参数定义添加ts类型约束
    paramsIdentifier.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier(requestType)))
    args.push(paramsIdentifier)
  }
  
  const functionDelaration = t.functionDeclaration(t.identifier(functionName),args, t.blockStatement([returnStatement]) )
  return t.exportNamedDeclaration(functionDelaration)
  // `
  //   export function getNewcomerGoodsList (params: GetNewcomerGoodsListReq) {
  //     return Request.request<AA>(action, params, false)
  //   }
  // `
}


export default function(apiData: ApiDataType) {
  const { typeList, apiDesc, apiLocation, actionName, enumTypeList } = apiData
  // console.log(typeList)
  // console.log(JSON.stringify(exportTypeDeclaration))
  const ast = parse(``, {
    sourceType: "module",
    plugins: [
      "typescript",
    ],
  });
  const body = ast.program.body;
  console.warn(JSON.stringify(body))
  // 创建import语句导入请求方法
  const functionImport = t.importDeclaration([t.importDefaultSpecifier(t.identifier('Request'))], t.stringLiteral('@/network'))
  const apiComment = `
    * ${apiDesc}
    * yapi: ${apiLocation}
    * actionName: ${actionName}
  `
  t.addComment(functionImport, 'leading', apiComment, false);
  body.push(functionImport);
  // 遍历枚举类列表，创建枚举类代码
  enumTypeList.forEach(item => {
    const exportEnumDeclaration = getExportEnumDeclaration(item)
    body.push(exportEnumDeclaration);
  })
  // 遍历类型列表，创建依赖的类型，并以模块形式导出
  typeList.forEach(item => {
    const exportTypeDeclaration = getExportTypeDeclarationByType(item)
    body.push(exportTypeDeclaration);
  })
  // 创建入口函数并导出
  const exportFunc = getExportFunc(apiData)
  body.push(exportFunc);
  const output = generate(
    ast
  );
  return output.code
  // console.warn(output)
  // 构造请求方法调用代码
}


/*
    * 附近门店列表
    * yapi: https://yapi.hellobike.cn/project/3271/interface/api/223297
    * actionName: BB
  */
import Request from "@/network";
export type BBReq = {
  cityCode: string; // 城市code

  lng?: string; // 经度

  lat?: string; // 纬度

  pageSize?: number; // 分页，每页条数，默认8

  pageIndex?: string; // 当前位置0开始

  pageNo?: string;
};
// 项目标签列表
export type LabelsType = {
  labelName?: string; // 标签名称

  labelId?: string; // 标签ID

};
// 扩展信息爬虫数据
export type ExtInfoType = {
  shopAvgPrice?: string; // 人均（¥333/人）

  shopRecReason?: string; // 评论

  rank?: string; // xxx排行第几名

  jumpUrl?: string; // 跳转链接

};
// 商品列表
export type ShopGoodsListType = {
  packageDesc?: string; // 套餐标题

  skuId?: string; // 产品ID

  salePrice?: string; // 售价

  discountStr?: string; // 折扣

  originalPrice?: string; // 原价

};
export type ShopListType = {
  shopId?: string; // id

  shopName?: string; // 名称

  shopPic?: string; // 图片

  shopAddress?: string; // 地址

  openTime?: string; // 营业时间

  shopType?: string; // 门店类型1:连锁店总店;2:连锁店分店;11:单店

  poiId?: string; // poi编号

  distance?: string; // 距离，单位米，

  areaName?: string; // 地理区域

  categoryName?: string; // 二级类目名称

  categoryId?: string; // 二级类目ID

  labels?: LabelsType[]; // 项目标签列表

  payers?: string; // 下单人数xx人下单0人下单显示

  extInfo?: ExtInfoType; // 扩展信息爬虫数据

  cornerMark?: string; // 门店角标

  shopGoodsList?: ShopGoodsListType[]; // 商品列表

  regionName?: string; // 商圈名称或者地区名称

};
export type BBResponseType = {
  hasEnd?: boolean; // true表示最后一页

  pageNo?: string;
  shopList?: ShopListType[];
};
export function BBAPI(params: BBReq) {
  return Request.request<BBResponseType>("home4.0.tab.near.shops", params, true, true);
}
