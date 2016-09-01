// 2回目以降の実行の場合、以前のイベントをキャンセル
// 開発用
if (window.cancelPrevious) cancelPrevious();
window.cancelPrevious = (function () {
    const Buttons = {
        Right: 2
    };
    let rightButtonPressing = false;
    let gestureStartPosition = {
        x: 0,
        y: 0
    };

    const thresholdX = 50; // [px]
    const thresholdY = 200; // [px]

    const onmousedown = evt => {
        if (evt.button === Buttons.Right) {
            rightButtonPressing = true;
            gestureStartPosition.x = evt.clientX;
            gestureStartPosition.y = evt.clientY;
        } else {
            rightButtonPressing = false;
        }
    };
    document.addEventListener("mousedown", onmousedown);

    const oncontextmenu = evt => {
        if (rightButtonPressing) {
            if (evt.clientX < 0 || evt.clientY < 0) {
                // ウィンドウ外
                return;
            }
            const diffX = evt.clientX - gestureStartPosition.x;
            const diffY = evt.clientY - gestureStartPosition.y;
            if (diffY < -thresholdY) {
                evt.preventDefault();
                chrome.runtime.sendMessage({
                    method: "closeTab"
                });
            } else if (diffX < -thresholdX) {
                // 左方向へ移動：戻る
                evt.preventDefault();
                window.history.back();
            } else if (thresholdX < diffX) {
                // 右方向へ移動：進む
                evt.preventDefault();
                window.history.forward();
            }
        }
    };
    document.addEventListener("contextmenu", oncontextmenu);

    return function () {
        document.removeEventListener("mousedown", onmousedown);
        document.removeEventListener("contextmenu", oncontextmenu);
    };
})();
