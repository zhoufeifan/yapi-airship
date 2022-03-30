export default {
  "__v": 0,
  "_id": 107463,
  "add_time": 1598845659,
  "catid": 24141,
  "desc": "<p>locallife.goods.new.detail.basic(新商品详情页-商品基本信息)</p>\n",
  "markdown": "locallife.goods.new.detail.basic(新商品详情页-商品基本信息)",
  "method": "POST",
  "path": "/api",
  "project_id": 3271,
  "req_body_other": "{\"type\":\"object\",\"title\":\"empty object\",\"properties\":{\"token\":{\"type\":\"string\",\"description\":\"token\"},\"action\":{\"type\":\"string\",\"description\":\"action\"},\"skuId\":{\"type\":\"string\",\"description\":\"商品skuId\"},\"spuId\":{\"type\":\"string\",\"description\":\"spuId\"},\"cityCode\":{\"type\":\"string\",\"description\":\"城市编码\"},\"referrerId\":{\"type\":\"integer\",\"description\":\"推客id\"},\"firstSkuId\":{\"type\":\"string\",\"description\":\"排序后首个商品\"},\"fromMyIntegration\":{\"type\":\"boolean\",\"description\":\"是否来自我的积分页（默认false）\"}},\"required\":[\"action\",\"cityCode\"]}",
  "req_body_type": "json",
  "res_body": "{\"type\":\"object\",\"title\":\"empty object\",\"properties\":{\"code\":{\"type\":\"string\"},\"msg\":{\"type\":\"string\"},\"data\":{\"type\":\"object\",\"properties\":{\"goodsName\":{\"type\":\"string\",\"description\":\"商品名称\"},\"goodsType\":{\"type\":\"integer\",\"description\":\"商品类型：1-普通商品 2-通兑卡\"},\"goodStatus\":{\"type\":\"integer\",\"description\":\"商品状态：1-预售 2-在售 3-售罄\"},\"extendType\":{\"type\":\"integer\",\"description\":\"推广类型：1-直购 2-分销\"},\"salePrice\":{\"type\":\"string\",\"description\":\"售价\"},\"originalPrice\":{\"type\":\"string\",\"description\":\"原价\"},\"directPrice\":{\"type\":\"string\",\"description\":\"赚取金额\"},\"couponPrice\":{\"type\":\"string\",\"description\":\"券后价\"},\"tags\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"description\":\"标签\"},\"goodsMediaList\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"mediaUrl\":{\"type\":\"string\",\"description\":\"图片URL\"},\"mediaPlace\":{\"type\":\"integer\",\"description\":\"图片展示位置 1:主图 2:详情页封面图 3:其他图\"}},\"required\":[]},\"description\":\"商品图片列表\"},\"canRefund\":{\"type\":\"boolean\",\"description\":\"是否可退款\"},\"saleInfo\":{\"type\":\"object\",\"properties\":{\"subscribeNum\":{\"type\":\"number\",\"description\":\"预售商品关注人数\"},\"payNum\":{\"type\":\"number\",\"description\":\"下单人数\"},\"refererNum\":{\"type\":\"number\",\"description\":\"推广人数\"}},\"description\":\"售卖信息（下单人数、推广人数、预约人数等）\",\"required\":[]},\"posterUrl\":{\"type\":\"string\",\"description\":\"分销海报url，非分销商品时=null\"},\"systemTime\":{\"type\":\"number\",\"description\":\"系统当前时间戳\"},\"startSaleTime\":{\"type\":\"number\",\"description\":\"开售时间\"},\"exchangeStartTime\":{\"type\":\"number\",\"description\":\"兑换开始时间\"},\"exchangeEndTime\":{\"type\":\"number\",\"description\":\"兑换结束时间\"},\"createTime\":{\"type\":\"number\",\"description\":\"项目新增时间\"},\"newUserFlag\":{\"type\":\"number\",\"description\":\"是否新人专享商品，1-是，0-否\"},\"newUserPrice\":{\"type\":\"number\",\"description\":\"新人价\"},\"effectDate\":{\"type\":\"string\",\"description\":\"有效期\"},\"times\":{\"type\":\"integer\",\"description\":\"兑换次数\"},\"waistNumber\":{\"type\":\"integer\",\"description\":\"腰封人数：第一版替换下单人数与推广人数\"},\"waistNumberType\":{\"type\":\"integer\",\"description\":\"腰封文案：1-xxx人已下单，2-xx人推广\"},\"referrerName\":{\"type\":\"string\",\"description\":\"推客昵称\"},\"referrerHeadPortrait\":{\"type\":\"string\",\"description\":\"推客头像\"},\"referrerText\":{\"type\":\"string\",\"description\":\"推客推广文案\"},\"referrerLevelEquityTips\":{\"type\":\"string\",\"description\":\"推客等级权益Tips\\t\"},\"openCityActivity\":{\"type\":\"string\",\"description\":\"开城活动\"},\"labels\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"labelName\":{\"type\":\"string\",\"description\":\"标签名称\"},\"guid\":{\"type\":\"string\",\"description\":\"标签id\"},\"picUrl\":{\"type\":\"string\",\"description\":\"图片链接\"},\"jumpUrl\":{\"type\":\"string\",\"description\":\"跳转链接\"}},\"description\":\"标签对象\",\"required\":[]},\"description\":\"特殊标签列表\"},\"sameGroupGoodsList\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"skuId\":{\"type\":\"string\",\"description\":\"商品Id\"},\"title\":{\"type\":\"string\",\"description\":\"标题\"}},\"required\":[]}},\"integralValue\":{\"type\":\"number\",\"description\":\"积分值\"},\"fromMyIntegration\":{\"type\":\"boolean\",\"description\":\"是否来自我的积分页(是-true 否-false)\"},\"promotionText\":{\"type\":\"string\",\"description\":\"优惠文案\"},\"hasCoupon\":{\"type\":\"string\",\"description\":\" 是否有优惠券\"},\"promoInfo\":{\"type\":\"object\",\"properties\":{\"activityId\":{\"type\":\"string\",\"description\":\"活动id\"},\"activityType\":{\"type\":\"number\",\"description\":\"活动类型，1-立减活动，2-一口价，3-新人活动\"},\"finalDiscountsPrice\":{\"type\":\"string\",\"description\":\"最终优惠价格(用户实际支付价格)\"},\"activityDeductionAmount\":{\"type\":\"string\",\"description\":\"活动扣减价格\"},\"couponDeductionAmount\":{\"type\":\"string\",\"description\":\"优惠券扣减价格\"},\"frontendActivityName\":{\"type\":\"string\",\"description\":\"C端活动名称\"},\"activityPictUrl\":{\"type\":\"string\",\"description\":\"活动展示图\"},\"activityIconPictUrl\":{\"type\":\"string\",\"description\":\"活动icon展示图\"},\"activityPageUrl\":{\"type\":\"string\",\"description\":\"活动落地页URL\"},\"activityFloatingLayerIconUrl\":{\"type\":\"string\",\"description\":\"活动浮层图\"},\"couponBizType\":{\"type\":\"number\",\"description\":\"1-普通优惠券，2-积分兑换优惠券\"},\"hasCoupon\":{\"type\":\"boolean\",\"description\":\"是否有券，Boolean\"},\"userGoodsLimitNum\":{\"type\":\"number\",\"description\":\"用户商品限购数量\"}},\"description\":\"优惠信息\",\"required\":[\"activityId\",\"activityType\",\"finalDiscountsPrice\",\"activityDeductionAmount\",\"frontendActivityName\",\"activityIconPictUrl\",\"hasCoupon\"]},\"finalGoodsPrice\":{\"type\":\"string\",\"description\":\"商品最终价\"},\"bannerInfo\":{\"type\":\"object\",\"properties\":{\"carouselTime\":{\"type\":\"integer\",\"description\":\"轮播时间（单位毫秒）\"},\"autoCarousel\":{\"type\":\"boolean\",\"description\":\"自动轮播\"},\"enableCarousel\":{\"type\":\"boolean\",\"description\":\"支持轮播\"},\"specialType\":{\"type\":\"integer\",\"description\":\"1: 左右 2: 上下 3: 3D1 4: 3D2\"},\"picList\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"jumpUrl\":{\"type\":\"string\",\"description\":\"跳转链接\"},\"imgUrl\":{\"type\":\"string\",\"description\":\"图片地址\"}},\"required\":[]},\"description\":\"图片\"}},\"required\":[]}},\"required\":[\"finalGoodsPrice\"]}},\"required\":[]}",
  "res_body_type": "json",
  "service": "AppLocalGoodsService",
  "title": "locallife.goods.new.detail.basic(商品基本信息-无登录态)",
  "uid": 8661,
  "up_time": 1648450846,
  "index": 0,
  "api_opened": false,
  "res_body_is_json_schema": true,
  "req_body_form": [
    
  ],
  "req_body_is_json_schema": true,
  "req_params": [
    
  ],
  "req_headers": [
    {
      "_id": "62415d1edcc61908ef41a8a0",
      "value": "application/json",
      "name": "Content-Type",
      "required": "1"
    }
  ],
  "req_query": [
    
  ],
  "query_path": {
    "path": "/api",
    "params": [
      
    ]
  },
  "type": "static",
  "status": "undone",
  "edit_uid": 0,
  "username": "闵晓龙"
}
