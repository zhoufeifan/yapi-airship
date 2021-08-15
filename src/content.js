
let pageData = null
function fetchData(id) {
  return fetch(`https://yapi.hellobike.cn/api/interface/get?id=${id}`)
  .then(function(response) {
    return response.json();
  })
}

// 首字母转大写
function getHeadCodeToUpperCase(codes) {
  return codes.replace(/(^)([a-z])/g,(code)=>{
    return code.toUpperCase()
  })
}

// 获取action
function getAction() {
  return pageData.title.replace(/(^[a-z.]+)(.+)/g, '$1')
}

// 获取入参信息
function getRequestDataInfo(actionName) {
  const { properties, required } = JSON.parse(pageData.req_body_other);
  const paramsList = [];
  Object.entries(properties).map(([key,data])=>{
    //过滤掉 token 和 action
    if(key !== 'action' && key !== 'token') {
      paramsList.push({
        name: key,
        ...data,
        required: required.includes(key)
      })
    }
  })
//   properties:
// action: {type: "string", description: "action"}
// cityCode: {type: "string", description: "展示城市code"}
// options: {type: "array", items: {…}, description: "二级导航tab对象集合"}
// tabId: {type: "string", description: "一级导航id，一级导航接口返回透传"}
// token: {type: "string", description: "登录时传"}
// __proto__: Object
// required: (3) ["action", "cityCode", "tabId"]
  return {
    typeName: `${actionName}Req`,
    paramsList,
  }
}

// data: {
//   required: ['']
//   items: []
// }

/*
items:[{
  name: 'name',
  desc: '名字',
  type: string,
}, {
  name: 'detail',
  desc: '详情'，
  type: DetailType
}]

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

const typeList = [];

function getArrayType(items, key) {
  if (items.type === 'array') {
    // 暂不处理二维数组的情况
    return ''
  } else if(items.type === 'object') {
    const type = getObjectType(items.properties, key, items.required);
    console.warn(type);
    return type
    // return ''
  } else {
    return items.type
  }
}

function getObjectType(data, keyName, requiedList) {
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
  const items = handleResopnseData(data, requiedList)
  const typeName = `${getHeadCodeToUpperCase(keyName)}Type`;
  typeList.push(
    {
      typeName,
      items,
    }
  );
  return typeName
}

// 获取所有的ts类型
function handleResopnseData(properties, requiredList) {
  const items = Object.entries(properties).map(([key, data])=> {
    if(data.type === 'object' ) {
      data.type = getObjectType(data.properties, key, data.required);
    } else if(data.type === 'array') {
      data.type = getArrayType(data.items, key);
      data.isArray = true;
    }
    return {
      name: key,
      description: data.description,
      type: data.type,
      isArray: !!data.isArray,
      required: requiredList.includes(key)
    }
  })
  return items;
}

// 获取返回值信息
function getResponseDataInfo() {
  // console.warn(JSON.parse(pageData.res_body))
  // const { properties: { data } } = JSON.parse(pageData.res_body);
  // console.warn(JSON.stringify(data))

  const data = {
    "type": "object",
    "properties": {
      "userNewId": {
        "type": "number",
        "description": "用户id"
      },
      "orderDetail": {
        "type": "object",
        "properties": {
          "aa": {
            "type": "string",
            "description": "今日必推（好物必买）111",
            "required": []
          },
          "bb": {
            "type": "string",
            "description": "今日必推（好物必买）222",
            "required": []
          },
        },
        "description": "订单详情",
        "required": [
          "aa"
        ]
      },
      "floorGoodsMap": {
        "type": "object",
        "properties": {
          "secKill": {
            "type": "object",
            "properties": {
              "floorGoodsInfoDTOList": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "goodsName": {
                      "type": "string",
                      "description": "商品名称"
                    },
                    "skuId": {
                      "type": "string",
                      "description": "skuId"
                    },
                    "spuId": {
                      "type": "string",
                      "description": "spuId"
                    },
                    "shopInfoDTO": {
                      "type": "object",
                      "properties": {
                        "shopId": {
                          "type": "string",
                          "description": "门店编号"
                        },
                        "shopName": {
                          "type": "string",
                          "description": "门店名称"
                        },
                        "adCode": {
                          "type": "string",
                          "description": "区县code"
                        },
                        "adName": {
                          "type": "string",
                          "description": "区县名称"
                        },
                        "distance": {
                          "type": "string",
                          "description": "距离"
                        }
                      },
                      "description": "门店的信息",
                      "required": [
                        "shopId"
                      ]
                    },
                    "brandName": {
                      "type": "string",
                      "description": "品牌名称"
                    },
                    "packageDesc": {
                      "type": "string",
                      "description": "套餐标题"
                    },
                    "goodsPic": {
                      "type": "string",
                      "description": "商品头图"
                    },
                    "rewardAmount": {
                      "type": "number",
                      "description": "佣金（团长有）"
                    },
                    "salePrice": {
                      "type": "number",
                      "description": "售价"
                    },
                    "originalPrice": {
                      "type": "number",
                      "description": "原价(门市价)"
                    },
                    "userNewPrice": {
                      "type": "number",
                      "description": "新人价"
                    },
                    "discount": {
                      "type": "number",
                      "description": "折扣"
                    },
                    "soldStartTime": {
                      "type": "string",
                      "description": "上架时间"
                    },
                    "soldEndTime": {
                      "type": "string",
                      "description": "下架时间"
                    },
                    "subscriptName": {
                      "type": "string",
                      "description": "角标名称"
                    },
                    "floorBuyerInfoDTOList": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "userNewId": {
                            "type": "number",
                            "description": "用户id"
                          },
                          "headImgUrl": {
                            "type": "string",
                            "description": "用户头图"
                          },
                          "nickName": {
                            "type": "string",
                            "description": "用户昵称"
                          },
                          "reward": {
                            "type": "string",
                            "description": "佣金(团长有)"
                          }
                        },
                        "description": "购买人信息对象",
                        "required": [
                          "userNewId",
                          "headImgUrl",
                          "nickName"
                        ]
                      },
                      "description": "购买人信息列表"
                    }
                  },
                  "description": "商品信息对象",
                  "required": [
                    "goodsName",
                    "packageDesc",
                    "goodsPic",
                    "salePrice",
                    "originalPrice",
                    "discount",
                    "soldStartTime",
                    "soldEndTime",
                    "subscriptName",
                    "floorBuyerInfoDTOList",
                    "brandName",
                    "skuId",
                    "spuId",
                    "shopInfoDTO"
                  ]
                },
                "description": "楼层商品列表"
              }
            },
            "description": "今日必推（好物必买）",
            "required": [
              
            ]
          },
          "newAndPresale": {
            "type": "object",
            "properties": {
              "floorGoodsInfoDTOList": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "goodsName": {
                      "type": "string",
                      "description": "商品名称"
                    },
                    "skuId": {
                      "type": "string",
                      "description": "skuId"
                    },
                    "spuId": {
                      "type": "string",
                      "description": "spuId"
                    },
                    "shopInfoDTO": {
                      "type": "object",
                      "properties": {
                        "shopId": {
                          "type": "string",
                          "description": "门店编号"
                        },
                        "shopName": {
                          "type": "string",
                          "description": "门店名称"
                        },
                        "adCode": {
                          "type": "string",
                          "description": "区县code"
                        },
                        "adName": {
                          "type": "string",
                          "description": "区县名称"
                        },
                        "distance": {
                          "type": "string",
                          "description": "区县名称"
                        }
                      },
                      "description": "门店的信息",
                      "required": [
                        "shopId"
                      ]
                    },
                    "brandName": {
                      "type": "string",
                      "description": "品牌名称"
                    },
                    "packageDesc": {
                      "type": "string",
                      "description": "套餐标题"
                    },
                    "goodsPic": {
                      "type": "string",
                      "description": "商品头图"
                    },
                    "salePrice": {
                      "type": "number",
                      "description": "售价"
                    },
                    "originalPrice": {
                      "type": "number",
                      "description": "原价(门市价)"
                    },
                    "rewardAmount": {
                      "type": "number",
                      "description": "佣金（团长有）"
                    },
                    "soldStartTime": {
                      "type": "string",
                      "description": "上架时间"
                    },
                    "soldEndTime": {
                      "type": "string",
                      "description": "下架时间"
                    },
                    "floorGoodsLabelName": {
                      "type": "number",
                      "description": "标签名称"
                    }
                  },
                  "description": "商品信息对象",
                  "required": [
                    "goodsName",
                    "packageDesc",
                    "goodsPic",
                    "salePrice",
                    "originalPrice",
                    "soldStartTime",
                    "soldEndTime",
                    "brandName",
                    "skuId",
                    "spuId",
                    "shopInfoDTO",
                    "floorGoodsLabelName"
                  ]
                },
                "description": "楼层商品列表"
              }
            },
            "description": "新品/待上架",
            "required": [
              
            ]
          },
          "aboutToOffShelf": {
            "type": "object",
            "properties": {
              "floorGoodsInfoDTOList": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "goodsName": {
                      "type": "string",
                      "description": "商品名称"
                    },
                    "skuId": {
                      "type": "string",
                      "description": "skuId"
                    },
                    "spuId": {
                      "type": "string",
                      "description": "spuId"
                    },
                    "shopInfoDTO": {
                      "type": "object",
                      "properties": {
                        "shopId": {
                          "type": "string",
                          "description": "门店编号"
                        },
                        "shopName": {
                          "type": "string",
                          "description": "门店名称"
                        },
                        "adCode": {
                          "type": "string",
                          "description": "区县code"
                        },
                        "adName": {
                          "type": "string",
                          "description": "区县名称"
                        },
                        "distance": {
                          "type": "string",
                          "description": "距离"
                        }
                      },
                      "description": "门店的信息",
                      "required": [
                        "shopId"
                      ]
                    },
                    "brandName": {
                      "type": "string",
                      "description": "品牌名称"
                    },
                    "packageDesc": {
                      "type": "string",
                      "description": "套餐标题"
                    },
                    "goodsPic": {
                      "type": "string",
                      "description": "商品头图"
                    },
                    "originalPrice": {
                      "type": "number",
                      "description": "原价(门市价)"
                    },
                    "salePrice": {
                      "type": "number",
                      "description": "售价"
                    },
                    "rewardAmount": {
                      "type": "string",
                      "description": "佣金（团长有）"
                    },
                    "soldStartTime": {
                      "type": "string",
                      "description": "上架时间"
                    },
                    "soldEndTime": {
                      "type": "string",
                      "description": "下架时间"
                    }
                  },
                  "description": "商品信息对象",
                  "required": [
                    "goodsName",
                    "packageDesc",
                    "goodsPic",
                    "originalPrice",
                    "salePrice",
                    "soldStartTime",
                    "soldEndTime",
                    "brandName",
                    "skuId",
                    "spuId",
                    "shopInfoDTO"
                  ]
                },
                "description": "楼层商品列表"
              }
            },
            "description": "即将下架",
            "required": [
              "floorGoodsInfoDTOList"
            ]
          },
          "newUser": {
            "type": "object",
            "properties": {
              "floorGoodsInfoDTOList": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "goodsName": {
                      "type": "string",
                      "description": "商品名称"
                    },
                    "skuId": {
                      "type": "string",
                      "description": "skuId"
                    },
                    "spuId": {
                      "type": "string",
                      "description": "spuId"
                    },
                    "shopInfoDTO": {
                      "type": "object",
                      "properties": {
                        "shopId": {
                          "type": "string",
                          "description": "门店编号"
                        },
                        "shopName": {
                          "type": "string",
                          "description": "门店名称"
                        },
                        "adCode": {
                          "type": "string",
                          "description": "区县code"
                        },
                        "adName": {
                          "type": "string",
                          "description": "区县名称"
                        },
                        "distance": {
                          "type": "string",
                          "description": "距离"
                        }
                      },
                      "description": "门店的信息",
                      "required": [
                        "shopId"
                      ]
                    },
                    "brandName": {
                      "type": "string",
                      "description": "品牌名称"
                    },
                    "packageDesc": {
                      "type": "string",
                      "description": "套餐标题"
                    },
                    "goodsPic": {
                      "type": "string",
                      "description": "商品头图"
                    },
                    "salePrice": {
                      "type": "number",
                      "description": "售价"
                    },
                    "originalPrice": {
                      "type": "number",
                      "description": "原价(门市价)"
                    },
                    "userNewPrice": {
                      "type": "number",
                      "description": "新人价"
                    },
                    "discount": {
                      "type": "number",
                      "description": "折扣"
                    },
                    "soldStartTime": {
                      "type": "string",
                      "description": "上架时间"
                    },
                    "soldEndTime": {
                      "type": "string",
                      "description": "下架时间"
                    },
                    "subscriptName": {
                      "type": "string",
                      "description": "角标名"
                    }
                  },
                  "description": "楼层商品列表",
                  "required": [
                    "goodsName",
                    "packageDesc",
                    "goodsPic",
                    "salePrice",
                    "originalPrice",
                    "userNewPrice",
                    "discount",
                    "soldStartTime",
                    "soldEndTime",
                    "subscriptName",
                    "brandName",
                    "skuId",
                    "spuId",
                    "shopInfoDTO"
                  ]
                },
                "description": "楼层商品列表"
              }
            },
            "description": "新人专享",
            "required": [
              "floorGoodsInfoDTOList"
            ]
          }
        },
        "description": "楼层商品map",
        "required": [
          "secKill"
        ]
      },
      "floorGoodsList" : {
        "type": "array",
        "items": {
          "properties": {
            "skuId": {
              "type": "number",
              "description": "skuId"
            },
            "spuId": {
              "type": "number",
              "description": "spuId"
            },
          },
          "required": [],
          "type": "object"
        },
        "description": "楼层商品List",
      },
      "tags": {
        "description": "商品标签列表",
        "items": {
          "description": "商品标签",
          "type": "string"
        },
        "type": "array"
      }
      // 暂不考虑数组里套数组的情况
    },
    "description": "返回数据",
    "required": [
      "userNewId",
      "userType",
      "offShelfSeconds"
    ]
  }
  const items = handleResopnseData(data.properties, data.required)
  console.warn(typeList)
  // console.warn(items)
  return {
    // type: data.type,
    typeName: 'ResponseType',
    items: items,
    typeList
  };
}

function getFunctionName() {
  return {};
}

// 获取请求方法
function getApiMethod() {
  return {}
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
    pageData && sendMsg();
  }
});
sendMsg();
// fetchData('56666').then(({errcode, errmsg, data}) => {
//   if(errcode !== 0) throw errmsg
//   pageData = data;
//   sendMsg();
// }).catch((msg) => {
//   alert(msg)
// })