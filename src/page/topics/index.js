import './index.less';
import { forumUrl, mineUrl, topicsUrl, mineQesUrl } from '~/util/jumpTo';
import { sinceListener } from '~/util/sinceui';
import { getQesByTime } from '~/ajax/mineQes';
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl);
sinceListener('mine', mineUrl);
sinceListener('net');
sinceListener('cpu');
sinceListener('link');
sinceListener('china');
sinceListener('os');
sinceListener('all');
sinceListener('todayQuestion', mineQesUrl + '?id=3', 'rgb(255, 245, 245)');

// ================ 动态显示天数=================
let baiwei = document.querySelector('.item0'),
    shiwei = document.querySelector('.item1'),
    gewei = document.querySelector('.item2');

let today = new Date(),
    future = new Date(2020, 11, 26);

// 获取两个日期之间相差的天数
function getDays(today, futrue) {
    return parseInt((futrue.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
}

// 动态修改剩余天数
function changeDays() {
    let str = '' + getDays(today, future);
    str = str.length > 2 ? str : '0' + str;
    baiwei.innerText = str[0];
    shiwei.innerText = str[1];
    gewei.innerText = str[2];
}
changeDays();

// ===========================================

// ================ 动态显示日期=================
function myFunction() {
    let d = new Date();
    let weekday = new Array(7),
        Month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        day = ['', '一日', '二日', '三日', '四日', '五日', '六日', '七日', '八日', '九日', '十日', '十一日', '十二日', '十三日', '十四日', '十五日', '十六日', '十七日', '十八日', '十九日', '二十日', '二十一日', '二十二日', '二十三日', '二十四日', '二十五日', '二十六日', '二十七日', '二十八日', '二十九日', '三十日', '三十一日'];
    weekday[0] = '周日';
    weekday[1] = '周一';
    weekday[2] = '周二';
    weekday[3] = '周三';
    weekday[4] = '周四';
    weekday[5] = '周五';
    weekday[6] = '周六';
    let x = document.querySelector('.subjectiveb');
    x.innerHTML = `${Month[d.getMonth()]}${day[d.getDate()]}·${weekday[d.getDay()]}`;
}
myFunction();
// ===============================================

// ================ 从localStorage取刷题记录=================
function getLocalData() {

}
// =========================================================

// ================给科目注册跳转链接=================
function register() {
    let lessonAll = document.querySelector('.lessonAll');
    lessonAll.onclick = function (e) {
        let target = e.target || window.event.srcElement,
            parentNode = target.parentNode;// 'DIV'
        target = target.tagName === 'DIV' ? target : parentNode;
        switch (target.id) {
            case 'cpu':
                window.location.href = '../topic/index.html?lesson=cpu'
                break;
            case 'link':
                window.location.href = '../topic/index.html?lesson=link'
                break;
            case 'china':
                window.location.href = '../topic/index.html?lesson=china'
                break;
            case 'os':
                window.location.href = '../topic/index.html?lesson=os'
                break;
            case 'all':
                window.location.href = '../topic/index.html?lesson=all'
                break;
            case 'net':
                window.location.href = '../topic/index.html?lesson=net'
                break;
            default:
                break;
        }
    }
}
register();
// ===================================================


