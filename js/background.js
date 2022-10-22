chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // 只有yapi才显示工具
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'api.weizhipin.com', schemes: ['https'] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
