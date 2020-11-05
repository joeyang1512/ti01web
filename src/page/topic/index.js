import { getTopicAllPart, getTopicByLesson } from '~/ajax/topic';
import './index.less';
import { singleTopic } from '../../template/singleChoice';
import { loading, toastTip, EventUtil } from '../../util/sinceui';
import { multipleTopic } from '../../template/multipleChoice';
import { getQueryVariable } from '../../../public/js/filters';
let body = document.querySelector('.body');
let topics = null;
let topicsOfPart = [];// 存储各章节的题目
let parts = [];// 各章节目录
let lesson = decodeURI(getQueryVariable('lesson'));// 科目
let lessonSelect = document.querySelector('.lessonSelect'); // 章节选择
let lessonTitle = document.querySelector('.lessonTitle');// 题目
let collection = document.getElementById('collection');// 收藏按钮
let ABCD = [];
// ================存取localStorage========================
let lastIndex = localStorage.getItem('historyTopic') ? JSON.parse(localStorage.getItem('historyTopic'))[lesson] : 0;
let part = localStorage.getItem('part') ? localStorage.getItem('part') : '';
let starTopic = localStorage.getItem('starTopic') ? JSON.parse(localStorage.getItem('starTopic')) : {}, // 所收藏的题目集合
    topicId,
    crrentTopic;
console.log(starTopic);
let historyTopic = {
    cpu: 0,
    net: 0,
    china: 0,
    link: 0,
    os: 0,
    all: 0
};
let currentPartTopic;
// ========================================================
// ================获取所有章节=============================
let obj = { cpu: '计算机组成原理', net: '计算机网络', china: '考研政治', link: '数据结构', os: '操作系统', all: '408综合', };
getTopicAllPart(obj[lesson]).then(res => {
    console.log(res);

    for (let i = 0; i < res.data.length; i++) {
        parts.push(res.data[i].part);
    }
    topicsOfPart = new Array(parts.length);
    if (!part) {
        part = parts[0];
        lessonTitle.innerHTML = part;
    }
    lessonSelect.innerHTML = '<div>' + parts.join('</div><div>') + '</div>';
    lessonSelect.style.display = 'none';
})
// ========================================================

// ================获取是哪个科目和章节===========================
let lessonPart = document.getElementById('lesson');// 右上角章节图标
lessonPart.onclick = function () {
    lessonSelect.style.display = lessonSelect.style.display === 'none' ? 'block' : 'none';
}

lessonSelect.onclick = function (e) {// 确定是哪一个章节
    e.stopPropagation();
    e.preventDefault();
    lessonSelect.style.display = 'block';
    let target = e.target;
    if (target.className === 'lessonSelect') return;
    part = target.innerText;
    // localStorage.setItem('part', part);
    // console.log();
    lessonTitle.innerHTML = part;
    let i = parts.indexOf(part);
    lessonTitle.innerHTML = `${part}${topicsOfPart[i].length}`;
    lastIndex = 0;
    // console.log(i);
    // loadBylesson(null, part);
    // console.log(topicsOfPart[i]);
    currentPartTopic = topicsOfPart[i];
    if (part === '全部') {
        showTopic(body, topics, lastIndex);
    } else {
        showTopic(body, currentPartTopic, lastIndex);
    }
}
// 点击外部消失章节选择
document.querySelector('.weui-panel_access').addEventListener('click', bodyFn, false);
function bodyFn() {
    if (lessonSelect.style.display === 'block') {
        lessonSelect.style.display = 'none';
    }

}

console.log(lesson);
switch (lesson) {
    case 'cpu':
        lessonTitle.innerHTML = `${part}`;
        loadBylesson('计算机组成原理');
        console.log(topicsOfPart);

        break;
    case 'net':
        lessonTitle.innerHTML = `${part}`;
        loadBylesson('计算机网络');

        break;
    case 'china':
        lessonTitle.innerHTML = `${part}`;
        loadBylesson('考研政治');

        break;
    case 'link':
        lessonTitle.innerHTML = `${part}`;
        loadBylesson('数据结构');

        break;
    case 'os':
        lessonTitle.innerHTML = `${part}`;
        loadBylesson('操作系统');

        break;
    case 'all':
        lessonTitle.innerHTML = `${part}`;
        loadBylesson('408综合');

        break;
    default:
        break;
}
// =======================================================

// ================请求数据，显示题目========================
function loadBylesson(lesson) {
    let load = loading('加载中');
    load(true);

    getTopicByLesson(lesson).then(res => {
        console.log(res);
        if (res.code === '0') {
            load(false);
            topics = res.data;
            console.log(res)
            // sectionTopic = topics.map((item) => {
            //     return item.part = part;
            // });
            topicsDivideToParts(topics);
            showTopic(body, currentPartTopic, lastIndex);
        } else {
            load(false);
            let toast = toastTip(res.errMsg);
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 1000);
        }

    });
}

function topicsDivideToParts(data) {
    for (let i = 0; i < topicsOfPart.length; i++) {
        topicsOfPart[i] = data.filter(item => {
            return item.part === parts[i] ? item : false;
        });
    }

    // if (!currentPartTopic) {
    currentPartTopic = topicsOfPart[parts.indexOf(part)];
    // }
    lessonTitle.innerHTML = `${part}${topicsOfPart[0].length}`;
    console.log(topicsOfPart);
}
// 展示题目
function showTopic(element, data, index) {
    if (!data || !data.length) {
        let toast = toastTip('尚无题目');
        toast(true);
        setTimeout(() => {
            toast(false);
        }, 1500);
        element.innerHTML = '';
        return;
    }
    if (index >= data.length) {
        let toast = toastTip('亲，这是最后一题了哦');
        toast(true);
        setTimeout(() => {
            toast(false);
        }, 1000);
        return;
    }
    topicId = data[index].id;
    crrentTopic = data[index];
    // =======留白--用来判断是否已收藏============
    let starTopicKeys = Object.keys(starTopic);
    if (starTopicKeys.includes('' + data[index].id)) {
        collection.className = 'iconcollection_fill';
    } else {
        collection.className = 'iconcollection';
    }
    // =========================================
    let right = document.getElementById('right');
    if (data[index].type === 1) {
        right.style.display = 'none';
        singleTopic(element, data, index, false);
        select(1, element, data, index);
    } else {
        // let ABCDAll = [];
        right.style.display = 'block';
        multipleTopic(element, data, index, false);
        select(2, element, data, index);
        right.onclick = () => {
            let answer = data[index].answer;
            let abcd = ABCD.sort().join('');
            console.log(abcd);
            if (abcd === 'answer') {
                multipleTopic(element, data, index, true);
                ABCD = [];
            } else {
                multipleTopic(element, data, index, true);
                let lables = document.querySelectorAll('.xuanxiang label');
                // lables.forEach(item => {
                //     console.log(item);
                //     item.className = 'weui-cell weui-check__label duoxuanfalse';
                // });
                for (let i = 0; i < abcd.length; i++) {
                    lables[abcd[i] - 1].className = 'weui-cell weui-check__label duoxuanfalse';
                }
                for (let i = 0; i < answer.length; i++) {
                    if (abcd.includes(answer[i])) {
                        lables[answer[i] - 1].className = 'weui-cell weui-check__label select';
                    } else {
                        lables[answer[i] - 1].className = 'weui-cell weui-check__label duoxuanfalse';
                    }
                }
                ABCD = [];
            }

        }
    }
}
// =========================================================

// ==================上一题和下一题==========================
let last = document.getElementById('last'),
    next = document.getElementById('next');
last.onclick = toLeftTopic;
function toLeftTopic() {
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
    // localStorage.setItem('part', part);
    // historyTopic[lesson] = lastIndex;
    // localStorage.setItem('historyTopic', JSON.stringify(historyTopic));
    showTopic(body, currentPartTopic, lastIndex);
    // 讲修改后的lastIndex存进localStorage

}
next.onclick = toRightTopic;
function toRightTopic() {
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
    showTopic(body, currentPartTopic, lastIndex);
    // 讲修改后的lastIndex存进localStorage
}
// =========================================================

// ==================返回上一页==========================
let backBtn = document.getElementById('backBtn');
backBtn.onclick = function () {
    window.history.back(-1);
}
// =========================================================

// ==================点击选择==========================
function select(type, element, data, index) {
    let xuanxiang = document.querySelector('.xuanxiang');
    xuanxiang.onclick = function (e) {
        let target = e.target;
        if (target.tagName === 'IMG') return;
        while (target !== xuanxiang && target.tagName !== 'LABEL') {
            target = target.parentNode
        }
        console.log(xuanxiang.children[2] === target);
        if (type === 1) {
            let ABCD = 1;
            for (let i = 0; i < xuanxiang.children.length; i++) {
                if (target === xuanxiang.children[i]) {
                    console.log('相等')
                    break;
                }
                ABCD++;
            }
            console.log(ABCD)
            if (data[index].answer != ABCD) {
                if (target.className.indexOf('false') === -1) {
                    target.className = 'weui-cell weui-check__label false';
                } else {
                    target.className = 'weui-cell weui-check__label';
                }
            } else {
                singleTopic(element, data, index, true);
            }
        } else {
            ABCD.push(target.getAttribute('select'));
            console.log(ABCD);
            if (target.className.indexOf('select') === -1) {
                target.className = 'weui-cell weui-check__label select';
            } else {
                target.className = 'weui-cell weui-check__label';
            }
        }

    }
}

// ====================================================

// 收藏按钮
collection.addEventListener('click', collectionFn, false);
function collectionFn() {
    console.log(this);
    console.log('收藏')
    if (collection.className === 'iconcollection') {
        collection.className = 'iconcollection_fill';
        console.log(starTopic);
        starTopic[topicId] = crrentTopic;

    } else {
        collection.className = 'iconcollection';
        delete starTopic[topicId];
    }
    localStorage.setItem('starTopic', JSON.stringify(starTopic));
}

// 滑动事件监听
const htmlBoby = document.getElementsByTagName('body')[0];
EventUtil.listenTouchDirection(htmlBoby, true, false, toLeftTopic, false, toRightTopic);