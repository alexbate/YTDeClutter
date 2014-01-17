var urlSplit = ["a"];

function showPageAction(tabId, changeInfo, tab) {
	urlSplit = tab.url.split("/");
	if (urlSplit[2] == "www.youtube.com" && urlSplit[3].substring(0,5) == "watch") {
		chrome.pageAction.show(tabId);
	}
	
chrome.tabs.onUpdated.addListener(showPageAction);

function redirectFromPlaylist(tab) {
	var newURL = urlSplit[0] + "//" + urlSplit[2];
	var pageFromParams = urlSplit[urlSplit.length-1].split("?");
	newURL = newURL + pageFromParams[0] + "?";
	var params = pageFromParams[1].split("&");
	
	for (var i=0; i< params.length; i++) {
		var keyAndData = params[i].split("=");
		if (keyAndData[0] == "v") {
			newURL = newURL + params[i];
		}
	}
	
	chrome.tabs.update(tab.tabId, {url: newURL});
}
	