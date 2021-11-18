/* global chrome*/
const $ = require('jquery');

$.expr[":"].contains = $.expr.createPseudo(function (arg)
{
	return function (elem)
	{
		return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
	};
});

function checkAndRemove(element, list)
{
	for (const word of list)
	{
		console.log(word);
		$(element).find(`#video-title:contains('${word}')`).each(function ()
		{
			$(element).remove();
		});
	}
}

const run = () =>
{
	chrome.storage.local.get(['youtube_muted_words'], ({youtube_muted_words: list}) =>
	{
		list = JSON.parse(list);
		$('ytd-video-renderer').each(function ()
		{
			checkAndRemove(this, list);
		});
	});
};

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse)
	{
		// listen for messages sent from background.js
		if (request.message === 'check')
		{
			run();
			$(document).bind('DOMSubtreeModified', function () {
				if ($('.validation_errors').length) {
					run();
				}
			});
		}
	}
);