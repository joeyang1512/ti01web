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
        dom.style.backgroundColor = '#eee';
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
    <div class="weui-toast" style="height: 60px;width: 120px;">
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
