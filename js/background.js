var post = function (url, body) {
  var http = new XMLHttpRequest();

  return new Promise(function (resolve, reject) {
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/json');
    http.setRequestHeader('charset', 'utf-8');

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        resolve(JSON.parse(http.responseText));
      }
    }
    http.send(JSON.stringify(body));
  });
};

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有yapi才显示工具
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'yapi.hellobike.cn'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});
