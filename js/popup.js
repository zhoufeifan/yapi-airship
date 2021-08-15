chrome.runtime.onMessage.addListener(function(request) {
    console.log(request)
	// document.getElementById('Content').innerHTML = JSON.stringify(request)
    // sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}
setTimeout(()=>{
    sendMessageToContentScript({cmd:'sendMsg'});
}, 1000)

