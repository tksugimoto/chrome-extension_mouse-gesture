const Buttons = {
    Right: 2
};
let rightButtonPressing = false;
let gestureStartPosition = {
    x: 0,
    y: 0
};

const thresholdX = 50; // [px] 

document.addEventListener("mousedown", evt => {
    if (evt.button === Buttons.Right) {
        rightButtonPressing = true;
        gestureStartPosition.x = evt.clientX;
        gestureStartPosition.y = evt.clientY;
    } else {
        rightButtonPressing = false;
    }
    
});

document.addEventListener("contextmenu", evt => {
    if (rightButtonPressing) {
        const diffX = evt.clientX - gestureStartPosition.x;
        if (diffX < -thresholdX) {
            // 左方向へ移動：戻る
            evt.preventDefault();
            window.history.back();
        } else if (thresholdX < diffX) {
            // 右方向へ移動：進む
            evt.preventDefault();
            window.history.forward();
        }
    }
});
