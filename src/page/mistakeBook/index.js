import './index.less';
import { getMistakes, addLog, showRight } from '~/ajax/mistakeBook';


import { toastTip } from '../../util/sinceui';
import { singleTopic } from '../../template/singleChoice';
import { multipleTopic } from '../../template/multipleChoice'
let body = document.querySelector('.weui-panel__bd');
// =========
let data = {};
let dataValue = [];
// =========
let backBtn = document.getElementById('backBtn');
// let star = document.getElementById('lesson');// 删除错题按钮
let topicBody = document.querySelector('body');
let footer = document.querySelector('.footer');
let flag = true;// 标识是否进入题目详情
let id;// 当前进入题目的id
// console.log(starTopic);
function init() {
    getMistakes().then(res => {
        if (res.code === '0') {
            for (let i = 0; i < res.data.length; i++) {
                data[res.data[i].id] = res.data[i];
            }
            let toast = toastTip('暂无收藏');
            dataValue = Object.values(data);
            if (dataValue.length === 0) {
                toast(true);
                setTimeout(() => {
                    toast(false);
                }, 1500);
            } else {
                changePage(dataValue);
            }
        } else {
            let toast = toastTip(res.errMsg);
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 1500);
        }

    });
    footer.style.display = 'none';

}
init();
// 展示正确率
function showAccracy(tid) {
    let accuracy = document.querySelector('.accuracy');
    showRight(tid).then(res => {
        accuracy.innerHTML = `正确率：${res.data}`;
    });
}
// 展示错题
function changePage(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg listOfTi" tiId=${data[i].id} style="color:#333">
  
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">${data[i].title.replace(/\\n/g, '')}</h4>
            <p class="weui-media-box__desc">${data[i].lesson}</p>
          </div>
          
        </a>`
    }
    body.innerHTML = str;
}
// 给题目注册点击事件
topicBody.addEventListener('click', topicBodyFn, false);
function topicBodyFn(e) {
    footer.style.display = 'flex';
    let target = e.target;
    // console.log(target.tagName);
    // console.log(e);

    while (target.tagName !== 'A') {
        if (target.tagName === 'BODY') return;
        target = target.parentElement;
        // console.log(target);
    }
    flag = false;
    // star.style.display = 'inline';
    let id = target.getAttribute('tiId');
    // let id = topicBody.children;
    console.log(id);
    let dataItem = data[id];
    console.log(dataItem);
    if (dataItem.type == '1') {
        singleTopic(body, dataItem, undefined, false);
    } else {
        multipleTopic(body, dataItem, undefined, false);
    }
    showAccracy(dataItem.id);
    lableClick(dataItem);
}
// Lable点击事件
function lableClick(dataItem) {
    let labels = document.querySelectorAll('.xuanxiang label');
    let footer = document.querySelector('.footer');
    let res = [];
    labels.forEach(item => {

        item.addEventListener('click', itemFn, false);
    });
    function itemFn() {
        // console.log(this.querySelector('.weui-cell__ft span'));
        let span = this.querySelector('.weui-cell__ft span');

        let select = this.getAttribute('select');
        if (span.innerHTML.includes('i')) {
            span.innerHTML = '';
            res.splice(res.indexOf(select), 1);
        } else {
            res.push(select);
            span.innerHTML = '<i class="iconright" id="right" style="color: rgba(237,27,36,0.75);font-size:25px"></i> ';
        }
        console.log(res);

    }
    footer.addEventListener('touchstart', function () {
        footer.style.backgroundColor = 'rgba(100, 201, 125, 0.5)';
        let resStr = res.sort().join('');
        // if (dataItem.answer === resStr) {
        if (dataItem.type == '1') {
            singleTopic(body, dataItem, undefined, true);
        } else {
            multipleTopic(body, dataItem, undefined, true);
        }

        let label = document.querySelectorAll('label');
        console.log(label);
        for (let i = 0; i < label.length; i++) {
            let select = label[i].getAttribute('select');
            if (!dataItem.answer.includes(select)) {
                label[i].querySelector('.weui-cell__ft span').innerHTML = '<i class="iconclose" id="right" style="color: rgba(237,27,36,0.75);font-size:25px"></i> ';
            }
        }
        if (dataItem.answer === resStr) {
            addLog({ tlesson: dataItem.lesson, tpart: dataItem.part, tid: dataItem.id, res: '0' });
            let toast = toastTip('恭喜你，答对了！');
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 700);
        } else {
            addLog({ tlesson: dataItem.lesson, tpart: dataItem.part, tid: dataItem.id, res: '1' });
            let toast = toastTip('怎么回事？又打错了！');
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 700);
        }
    }, false);
    footer.addEventListener('touchend', function () {
        footer.style.backgroundColor = '#fff';
    }, false);
}
// 返回上一页
backBtn.addEventListener('click', backBtnFn, false);
function backBtnFn() {
    if (flag) {
        window.history.back(-1);
        return;
    }
    // star.className = 'iconcollection_fill';
    // init();
    flag = true;
    // star.style.display = 'none';
    // data = Object.values(starTopic);
    changePage(dataValue);
}
