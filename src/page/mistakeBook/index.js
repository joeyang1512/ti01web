import './index.less';
import { getMistakes, showRight } from '~/ajax/mistakeBook';


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
let footer = document.querySelector('.footerFather');
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
    footer.style.display = 'none';
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg listOfTi" tiId=${data[i].id} style="color:#06ae56;">
  
          <div class="weui-media-box__bd" >
            <h4 class="weui-media-box__title" style="color:#333;">${data[i].title.replace(/\\n/g, '')}</h4>
            <p class="weui-media-box__desc" style="color:#999;">${data[i].lesson}</p>
          </div>
          
        </a>`
    }
    body.innerHTML = str;
}
// 提示：
tishi.addEventListener('click', tishiFn, false);
// let toast = null;
function tishiFn() {
    let toast = toastTip('错题本的题目，只有在题库中再次答对才会消失哦!😂');
    toast(true);
    setTimeout(() => {
        toast(false);
    }, 2000);
    // if (!toast) {
    //     toast = toastTip('错题本里的题目，只有在题库中再次刷对才会消失哦');
    //     toast(true);
    // } else {
    //     toast(false);
    //     toast = null;
    // }
}
// 给题目注册点击事件
topicBody.addEventListener('click', topicBodyFn, true);
function topicBodyFn(e) {
    footer.style.display = 'block';
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
            span.innerHTML = '<i class="iconright"  style="color: rgba(237,27,36,0.75);font-size:25px"></i> ';
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
                label[i].querySelector('.weui-cell__ft span').innerHTML = '<i class="iconclose"  style="color: rgba(237,27,36,0.75);font-size:25px;"></i> ';
            }
        }
        if (dataItem.answer === resStr) {
            // addLog({ tlesson: dataItem.lesson, tpart: dataItem.part, tid: dataItem.id, res: '0' });
            let toast = toastTip('恭喜你，答对了！');
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 700);
        } else {
            // addLog({ tlesson: dataItem.lesson, tpart: dataItem.part, tid: dataItem.id, res: '1' });
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
backBtn.addEventListener('click', backBtnFn, true);
function backBtnFn() {
    console.log('ahhaha');
    if (flag) {
        window.location.href = '../topics/index.html';
        return;
    }
    // star.className = 'iconcollection_fill';
    
    flag = true;
    // init();
    // console.log()
    // star.style.display = 'none';
    // data = Object.values(starTopic);
    changePage(dataValue);
    footer.style.display = 'none';
}
