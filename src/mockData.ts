import { ResponseParamsRowDataType, RequestParamsRowDataType } from './types'

export const responseParmasData: ResponseParamsRowDataType = {
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


export const requestParmasData: RequestParamsRowDataType = {
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "description": "action"
    },
    "token": {
      "type": "string",
      "description": "登录时传"
    },
    "cityCode": {
      "type": "string",
      "description": "展示城市code，例如：0571"
    },
    "lng": {
      "type": "number",
      "description": "经度"
    },
    "lat": {
      "type": "number",
      "description": "纬度"
    },
    "adCode": {
      "type": "string",
      "description": "地址信息，例如：330184"
    },
    "platform": {
      "type": "string"
    },
    "utmContent": {
      "type": "string"
    },
    "utmCampaign": {
      "type": "string"
    },
    "utmMedium": {
      "type": "string"
    },
    "utmSource": {
      "type": "string"
    },
    "utmTerm": {
      "type": "string"
    },
    "tabId": {
      "type": "string",
      "description": "一级导航id，一级导航接口返回透传"
    },
    "pageNo": {
      "type": "integer",
      "description": "当前页数，从1开始"
    },
    "pageSize": {
      "type": "integer",
      "description": "每页条数"
    },
    "options": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "secondTabId": {
            "type": "string",
            "description": "二级导航tab编号"
          },
          "optionIds": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "二级导航tab下排序筛选optionId集合，【全部分类】选项为类目id，【区域】选项为adCode，二级导航接口返回透传"
            }
          }
        },
        "required": [
          
        ]
      },
      "description": "二级导航tab对象集合"
    }
  },
  "required": [
    "action",
    "cityCode",
    "tabId",
    "options"
  ]
}

