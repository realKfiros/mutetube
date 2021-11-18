/* global chrome */

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		// read changeInfo data and do something with it
		// like send the new url to contentscripts.js
		if (changeInfo.status === 'complete') {
			chrome.tabs.sendMessage( tabId, {
				message: 'check',
				url: changeInfo.url
			})
		}
	}
);
