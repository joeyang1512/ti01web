export { sinceListener, loading, toastTip };
/* 
  给dom添加点击效果。
  id为dom id
  link为点击后跳转的页面可以为空。
  color为点击后的颜色
*/
function sinceListener(id, link, color) {
    let dom = document.getElementById(id);
    if (dom == null || dom == undefined) return;
    dom.addEventListener('click', function () {
        dom.style.backgroundColor = 'rgb(250,250,250)';
        setTimeout(() => {
            if (color == null) {
                dom.style.backgroundColor = '#fff';
            } else {
                dom.style.backgroundColor = color;
            }
            
        }, 100);
        if (link != null) {
            setTimeout(() => {
                window.location.href = link;
            }, 100);
        }
    });
}

// Loading插件 用来显示提示框 用法：
/* 
let load = loading(tip);
load(true);//显示提示框
load(false);//关闭提示框
*/
// loading插件 可直接调用使用，但要引入weui的css 
function loading(tip) {
    let dv = document.createElement('div');
    dv.innerHTML =
        `<div id="loadingToast" >
    <div class="weui-mask_transparent" style="width: 100vw;height: 100vh;position: absolute; top: 0;z-index: 999;opacity:0.5;background-color:#eee"></div>
    <div class="weui-toast" style="height:120px;">
        <i class="weui-loading weui-icon_toast" ></i>
        <p class="weui-toast__content">${tip}</p>
    </div>
  </div>`;
    return (flag) => {
        if (flag) {
            // 发送请求loading
            document.body.appendChild(dv);
        } else {
            document.body.removeChild(dv);
        }
    }
}

// Tip插件 用来显示提示框 用法：
/* 
let toast = toastTip(tip);
toast(true);//显示提示框
toast(false);//关闭提示框
*/
function toastTip(tip) {
    let str = `<div id="toast">
    <div class="weui-toast" style="height: 60px;width: 180px;">
      <p class="weui-toast__content">${tip}</p>
    </div>
  </div>`;
    let dv = document.createElement('div');
    dv.innerHTML = str;
    return (flag) => {
        if (flag) {
            document.body.appendChild(dv);
            toastTip()
        } else {
            document.body.removeChild(dv);
        }
    }
};
// 滑动事件监听
let EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent('on' + type, handler);
        else
            element['on' + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent)
            element.detachEvent('on' + type, handler);
        else
            element['on' + type] = handler;
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, 'touchstart', handleTouchEvent);
        this.addHandler(target, 'touchend', handleTouchEvent);
        this.addHandler(target, 'touchmove', handleTouchEvent);
        let startX;
        let startY;
        function handleTouchEvent(event) {
            switch (event.type) {
                case 'touchstart':
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case 'touchend':
                    let spanX = event.changedTouches[0].pageX - startX;
                    let spanY = event.changedTouches[0].pageY - startY;

                    if (Math.abs(spanX) > Math.abs(spanY) ) {// 认定为水平方向滑动
                        if (spanX > 30) {// 向右
                            if (rightCallback)
                                rightCallback();
                        } else if (spanX < -30) { // 向左
                            if (leftCallback)
                                leftCallback();
                        }
                    } else {// 认定为垂直方向滑动
                        if (spanY > 30) {// 向下
                            if (downCallback)
                                downCallback();
                        } else if (spanY < -30) {// 向上
                            if (upCallback)
                                upCallback();
                        }
                    }

                    break;
                case 'touchmove':
                    // 阻止默认行为
                    if (isPreventDefault)
                        event.preventDefault();
                    break;
            }
        }
    }
};
export { EventUtil };