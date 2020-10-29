import './index.less';
import { forumUrl, mineUrl, topicsUrl, mineQesUrl } from '~/util/jumpTo';
import { sinceListener } from '~/util/sinceui';
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl);
sinceListener('mine', mineUrl);
sinceListener('net');
sinceListener('cpu');
sinceListener('link');
sinceListener('china');
sinceListener('os');
sinceListener('all');
sinceListener('todayQuestion', mineQesUrl + '?id=3');

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
// ================ 动态显示天数=================