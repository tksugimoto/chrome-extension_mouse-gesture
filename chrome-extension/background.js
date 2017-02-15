"use strict";

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.method == "closeTab") {
        chrome.tabs.remove(sender.tab.id);
    }
});
