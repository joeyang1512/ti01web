import './index.less';
import { toastTip } from '../../util/sinceui';
import { single } from '../../template/singleChoice';
import { multiple } from '../../template/multipleChoice'
let body = document.querySelector('.weui-panel__bd');
let starTopic = JSON.parse(localStorage.getItem('starTopic'));
let data = Object.values(starTopic);
let backBtn = document.getElementById('backBtn');
let topicBody = document.querySelector('body');
let flag = true;// 标识是否进入题目详情
let star = document.getElementById('lesson');// 收藏按钮
let id;// 当前进入题目的id
// console.log(starTopic);
let toast = toastTip('暂无收藏');
if (!starTopic) {
    toast(true);
    setTimeout(() => {
        toast(false);
    }, 1500);
} else {
    changePage(data);
}
// 展示收藏的题目
function changePage(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        let flag = Boolean(data[i].img),
            imgSrc = flag ? 'src=' + data[i].img : null;
        str += `<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg listOfTi" tiId=${data[i].id}>
  
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
    
    let target = e.target;
    // console.log(target.tagName);
    // console.log(e);

    while (target.tagName !== 'A') {
        if (target.tagName === 'BODY') return;
        target = target.parentElement;
        // console.log(target);
    }
    flag = false;
    star.style.display = 'inline';
    id = target.getAttribute('tiId');
    let data = starTopic[id];
    if (data.type == '1') {
        single(body, data);
    } else {
        multiple(body, data);
    }
}

// 返回上一页
backBtn.addEventListener('click', backBtnFn, false);
function backBtnFn() {
    if (flag) {
        window.history.back(-1);
        return;
    }
    flag = true;
    star.style.display = 'none';
    data = Object.values(starTopic);
    changePage(data);
}
// 取消收藏
star.addEventListener('click', starFn, false);
function starFn() {
    star.className = 'iconcollection';
    delete starTopic[id];
    localStorage.setItem('starTopic', JSON.stringify(starTopic));
}