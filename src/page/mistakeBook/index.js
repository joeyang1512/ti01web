import './index.less';
import { getMistakes } from '~/ajax/mistakeBook';
// getMistakes().then(res => {
//     console.log(res);
// });

import { toastTip } from '../../util/sinceui';
import { singleTopic } from '../../template/singleChoice';
import { multipleTopic } from '../../template/multipleChoice'
let body = document.querySelector('.weui-panel__bd');
// =========
let starTopic = localStorage.getItem('starTopic') ? JSON.parse(localStorage.getItem('starTopic')) : {};
let data = Object.values(starTopic);// 模仿请求回来的数据
// =========
let backBtn = document.getElementById('backBtn');
// let star = document.getElementById('lesson');// 删除错题按钮
let topicBody = document.querySelector('body');
let footer = document.querySelector('.footer');
let flag = true;// 标识是否进入题目详情
let id;// 当前进入题目的id
// console.log(starTopic);
function init() {
    footer.style.display = 'none';
    let toast = toastTip('暂无收藏');
    console.log(data);
    if (data.length === 0) {
        toast(true);
        setTimeout(() => {
            toast(false);
        }, 1500);
    } else {
        changePage(data);
    }
}
init();
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
    id = target.getAttribute('tiId');
    let data = starTopic[id];
    if (data.type == '1') {
        singleTopic(body, data, undefined, false);
    } else {
        multipleTopic(body, data, undefined, false);
    }
    lableClick();
}
// Lable点击事件
function lableClick() {
    let labels = document.querySelectorAll('.xuanxiang label');
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
            span.innerHTML = '<i class="iconright" id="right" style="color: rgb(100, 201, 125);font-size:25px"></i> ';
        }
        console.log(res);

    }
}
// 返回上一页
backBtn.addEventListener('click', backBtnFn, false);
function backBtnFn() {
    if (flag) {
        window.history.back(-1);
        return;
    }
    // star.className = 'iconcollection_fill';
    flag = true;
    // star.style.display = 'none';
    // data = Object.values(starTopic);
    changePage(data);
}
