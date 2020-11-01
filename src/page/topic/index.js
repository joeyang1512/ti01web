import { getTopic } from '~/ajax/topic';
import './index.less';
import { singleTopic } from '../../template/singleChoice';
import { loading, toastTip } from '../../util/sinceui';
import { multipleTopic } from '../../template/multipleChoice';
let body = document.querySelector('.body');
let topics = null;

// ================存取localStorage========================
let lastIndex = 2;
// ========================================================

// ================请求数据，显示题目========================
let load = loading('加载中');
load(true);
getTopic().then(res => {
    console.log(res);
    if (res.code === '0') {
        load(false);
        topics = res.data;
        showTopic(body, topics, lastIndex);
    } else {
        let toast = toastTip(res.errMsg);
        toast(true);
        setTimeout(() => {
            toast(false);
        }, 1000);
    }

});
// 展示题目
function showTopic(element, data, index) {
    if (data[index].type === 1) {
        singleTopic(element, data, index);
    } else {
        multipleTopic(element, data, index);
    }
}
// =========================================================

// ==================上一题和下一题==========================
let last = document.getElementById('last'),
    next = document.getElementById('next');
last.onclick = function () {
    lastIndex--;
    if (lastIndex < 0) {
        let toast = toastTip('亲，这是第一题了哦！');
        toast(true);
        setTimeout(() => {
            toast(false);
        }, 1000);
        lastIndex++;
        return;
    }
    showTopic(body, topics, lastIndex);
    // 讲修改后的lastIndex存进localStorage
}
next.onclick = function () {
    lastIndex++;
    if (lastIndex >= topics.length) {
        let toast = toastTip('亲，这是最后一题了哦！');
        toast(true);
        setTimeout(() => {
            toast(false);
        }, 1000);
        lastIndex--;
        return;
    }
    showTopic(body, topics, lastIndex);
    // 讲修改后的lastIndex存进localStorage
}
// =========================================================

// ==================返回上一页==========================
let backBtn = document.getElementById('backBtn');
backBtn.onclick = function () {
    window.history.back(-1);
}
// =========================================================
