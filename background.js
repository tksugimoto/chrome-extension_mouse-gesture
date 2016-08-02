"use strict";

chrome.runtime.onInstalled.addListener(() => {
    // 読み込み/更新時に既存のタブで実行する
    chrome.tabs.query({
        url: [
            "file:///*",
            "*://*/*"
        ]
    }, tabs => {
        tabs.forEach(tab => {
            chrome.tabs.executeScript(tab.id, {
                file: "gesture.js",
                allFrames: true
            }, result => {
                if (typeof result === "undefined") {
                    console.info("ページが読み込まれていません", tab);
                }
            });
        });
    });
});
