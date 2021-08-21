// 首字母转大写
function getHeadCodeToUpperCase(codes) {
    return codes.replace(/(^)([a-z])/g, (code) => {
        return code.toUpperCase();
    });
}

const mockData = {
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
                    "required": []
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
                    "required": []
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
        "floorGoodsList": {
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
};

let pageData = null;
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
const typeList = [];
function getArrayType(items, keyName) {
    if (items.type === 'array') {
        // 暂不处理二维数组的情况
        return '';
    }
    else if (items.type === 'object') {
        const type = getObjectType(items.properties, keyName, items.required);
        console.warn(type);
        return type;
    }
    else {
        return items.type;
    }
}
function getObjectType(data, keyName, requiedList = ['']) {
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
    const items = Object.entries(data).map(([keyName, data]) => {
        return getTypeItem(data, keyName, requiedList);
    });
    const typeName = `${getHeadCodeToUpperCase(keyName)}Type`;
    // 生成类型列表项
    typeList.push({
        typeName,
        items,
    });
    return typeName;
}
// 获取字段属性
function getTypeItem(data, keyName, requiredList = ['']) {
    let type = '';
    let isArray = false;
    if (data.type === 'object') {
        type = getObjectType(data.properties, keyName, data.required);
    }
    else if (data.type === 'array') {
        type = getArrayType(data.items, keyName);
        isArray = true;
    }
    return {
        name: keyName,
        description: data.description,
        type,
        isArray,
        required: requiredList.includes(keyName)
    };
}
// 获取返回值的数据类型信息
function getResponseDataInfo(actionName) {
    // console.warn(JSON.parse(pageData.res_body))
    // const { properties: { data } } = JSON.parse(pageData.res_body);
    // console.warn(JSON.stringify(data))
    const { type, isArray } = getTypeItem(mockData, `${actionName}ResponseType`, mockData.required);
    console.warn('--------');
    console.warn(type, isArray);
    return {
        typeName: type,
        isArray,
    };
}
function sendMsg() {
    // const action = getAction();
    // const actionName = getHeadCodeToUpperCase(action);
    const actionName = 'NIMA';
    const result = {
        // action,
        // requestDataInfo: getRequestDataInfo(actionName),
        responseDataInfo: getResponseDataInfo(actionName),
    };
    console.warn(JSON.stringify(result.responseDataInfo));
    chrome.runtime.sendMessage(result);
}
chrome.runtime.onMessage.addListener((request) => {
    if (request.cmd == 'sendMsg') {
        console.log(pageData);
        // pageData && sendMsg();
    }
});
sendMsg();
console.warn(typeList);
// fetchData('56666').then(({errcode, errmsg, data}) => {
//   if(errcode !== 0) throw errmsg
//   pageData = data;
//   sendMsg();
// }).catch((msg) => {
//   alert(msg)
// })
