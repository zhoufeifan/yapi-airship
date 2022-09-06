interface configType {
  linkAddress: string,
  title: string,
  typeCode: string,
  actionName: string,
  method: string,
  requestTypeName: string,
  responseTypeName: string,
}
export const renderTemplate = (config: configType)=>{
  const {
    linkAddress, 
    title, 
    typeCode, 
    actionName, 
    method,
    requestTypeName,
    responseTypeName,
  } = config;

  const code = `
  /**
   * 接口名称：${title}
   * yapi 地址：${linkAddress}
   */
  
  import baseRequest from "@/jsbridge/baseRequest";
  
  ${typeCode}

  export function JBG_${actionName}(params: ${requestTypeName}) {
    return baseRequest<${responseTypeName}>({
      api: "_${actionName}",
      method: "${method}",
      params,
    });
  }`
  return code;
}


