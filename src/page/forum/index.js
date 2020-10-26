import './index.less';
import {
    getAllquestion,
    getTypequestion
} from '~/ajax/forum';

import {
    isPicEmpty,
    setNum,
}
from '../../../public/js/filters';
import { sinceListener } from '~/util/sinceui';
sinceListener('community');
sinceListener('mine');
sinceListener('topic');
let allArr = []; // 问题数组
getALLQes();

// 将返回的所有结果渲染到页面上
function mapALLquestion() {
    for (let i = 0; i < allArr.length; i++) {
        $('#all_list').append(`<div class="list-item"> 
                                    <div class="item-head">
                                        <div class="info">
                                            <div class="userImg" style="background-image: url('` + isPicEmpty(allArr[i].image) + `');" ></div>
                                            <span class="userName">` + allArr[i].name + `</span>
                                            <span class="type">` + allArr[i].type + `</span>
                                        </div>
                                    </div> 
                                    <div class="item-content">
                                        <p>` + allArr[i].word + `</p>
                                        <div class="qimg" style="display:` + (allArr[i].qimage ? 'block' : 'none') + `
                                        ;background-image:url('` + allArr[i].qimage + `');"></div>
                                    </div>
                                    <div class="item-foot">
                                        <span class="like">` + setNum(allArr[i].gnum) + ` 点赞</span>
                                        <span class="count">·</span>
                                        <span class="comment">` + setNum(allArr[i].cnum) + ` 评论</span>
                                    </div>
                                </div>`);
    }
    $('#all_list').append(`<div class='empty'>
                        <img class='empty_img' src='/public/img/empty.png'></img>
                        <p> 只能到这里了~ <br> 我们以后不见不散哦 </p>
                    </div>`)
    let list = document.getElementsByClassName('list-item');
    for (let j = 0; j < list.length; j++) {
        list[j].onclick = function () {
            window.location.href = '/page/forum_detail/index.html?id=' + allArr[j].id;
        }
    }
}


let tabList = document.getElementsByClassName('tab');
for (let i = 0; i < tabList.length; i++) {
    tabList[i].index = i;
    tabList[i].onclick = function () {
        for (let i = 0; i < tabList.length; i++) {
            tabList[i].className = 'tab';
        }
        this.className = 'tab active'
        getQesByType(this.innerText);
    }
}

// 根据类型获取问题
function getQesByType(type) {
    $('#all_list').empty();
    if (type != '全部') {
        getTypequestion(type).then((res) => {
            if (res.data != null) {
                allArr = res.data;
                mapALLquestion();
            } else {
                $('#all_list').append(`<div class='empty'>
                        <img class='empty_img' src='/public/img/empty.png'></img>
                        <p> 暂时还没有问题哦~ <br> 赶紧去添加一个问题吧 </p>
                    </div>`)
            }
        })
    } else {
        getALLQes()
    }
}

// 获取所有问题
function getALLQes() {
    getAllquestion().then((res) => {
        if (res.code == 0) {
            allArr = res.data;
            mapALLquestion();
        }
    });
}

// 判断是否显示 回到顶部按钮
function scrollToTops() {
    let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    if (scrollTop > 200) {
        $('#rocket').fadeIn(100);
    } else {
        $('#rocket').fadeOut(100);
    }
}

// 节流
let thr = function (fn, time) {
    let flag = true;
    return () => {
        if (!flag) {
            return false
        }
        flag = false;
        setTimeout(() => {
            fn();
            flag = true;
        }, time)
    }
}

// 监听页面滚动
window.addEventListener('scroll', thr(scrollToTops, 500), true);

// 回到顶部
let scrollToTop = function () {
    $('body,html').animate({
            scrollTop: 0
        },
        400);
    return false;
}

$('#rocket').click(scrollToTop);

$('.iconadd').click(() => {
    window.location.href = '/page/issueQ/index.html';
});
