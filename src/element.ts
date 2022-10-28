export function insertGenerateButton() {
  const button = document.createElement('button');
  button.className = 'ant-btn ant-btn-primary generate-api-code-btn';
  button.innerText = '生成api代码';
  document.getElementById('yapi')?.appendChild(button);
  return button;
}

export function insertSetParamsButton() {
  const button = document.createElement('button');
  button.className = 'ant-btn set-params-btn';
  button.innerText = '设置参数';
  document.getElementById('yapi')?.appendChild(button);
  return button;
}

// export function insertForm() {
//   const formContainer = document.createElement('div');
//   formContainer.className = 'generate-form';
//   formContainer.innerHTML = `
//     <div class="form-row">
//       <label>接口名称：</label>
//       <input placeholder="请输入接口名称（英文）" type="text" class="ant-input" />
//     </div>
//     <div class="form-row">
//       <label class="ant-checkbox-wrapper">
//         <span class="ant-checkbox">
//           <input type="checkbox" class="ant-checkbox-input" value="">
//           <span class="ant-checkbox-inner"></span>
//         </span>
//         <span>Checkbox</span>
//       </label>
//     </div>
//     <div class="button-container">
//       <button class="ant-btn" id="cancelBtn">取消</button>
//       <button class="ant-btn ant-btn-primary" id="submitBtn">确认</button>
//     </div>
//   `
//   document.body.appendChild(formContainer);
//   return formContainer
// }
