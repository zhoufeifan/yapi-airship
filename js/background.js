// import './hot-reload.js';

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有yapi才显示工具
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'api.weizhipin.com'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});
