// name: 'name',
// desc: '名字',
// type: string,
// required: true

// 数据字段描述
export type FieldDataType = {
  name: string; // 数据字段名
  type: string; // 数据类型
  description?: string; // 数据含义
  required: boolean; // 是否必须
  isArray?: boolean; // 是否是数组
  enum?: string[]; // 枚举类信息
};

export type QueryItemType = {
  desc: string; // 字段说明
  name: string; // 字段名称
  required: '1' | '0'; // 是否必填，1-必填，0-非必填
};

export type ObjectType = {
  [index: string]: ParamsRowDataType;
};
// 返回数据 数据类型
export type ParamsRowDataType = {
  type: string; // 类型名称
  description: string; //字段描述
  properties: ObjectType; // 如果是对象类型才有该字段
  items: ParamsRowDataType; // 如果是数组类型才有该字段
  required: string[]; // 必填项列表
  enum?: string[]; // 枚举项
};

// 复杂数据格式的类型描述
export type TypeListItem = {
  typeName: string; // 类型变量名称
  items: FieldDataType[]; // 各字段的含义集合
  description?: string;
};

// 枚举类数据格式的类型描述
export type EnumTypeItem = {
  typeName: string; // 类型变量名称
  items: string[]; // 枚举的字段集合
  description?: string;
};

// name: string; description: string; type: string; isArray: boolean; required: boolean;
