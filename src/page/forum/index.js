import './index.less';
import {
    getRecommend,
    getTypequestion
} from '~/ajax/forum';

import {
    isPicEmpty,
    setNum,
}
from '../../../public/js/filters';

import {
    sinceListener
} from '~/util/sinceui';
sinceListener('qesBank', '/page/topics/index.html');
sinceListener('userCenter', '/page/mine/index.html');

let arr = []; // 问题数组
getRec();

// 将返回的所有结果渲染到页面上
function mapALLquestion() {
    for (let i = 0; i < arr.length; i++) {
        $('#all_list').append(`<div class="list-item"> 
                                    <div class="item-head">
                                        <div class="info">
                                            <div class="userImg" style="background-image: url('` + isPicEmpty(arr[i].image) + `');" ></div>
                                            <span class="userName">` + arr[i].name + `</span>
                                            <span class="type">` + arr[i].type + `</span>
                                        </div>
                                    </div> 
                                    <div class="item-content">
                                        <p>` + arr[i].word + `</p>
                                        <div class="qimg" style="display:` + (arr[i].qimage ? 'block' : 'none') + `
                                        ;background-image:url('` + arr[i].qimage + `');"></div>
                                    </div>
                                    <div class="item-foot">
                                        <span class="like">` + setNum(arr[i].gnum) + ` 点赞</span>
                                        <span class="count">·</span>
                                        <span class="comment">` + setNum(arr[i].cnum) + ` 评论</span>
                                    </div>
                                </div>`);
    }
    $('#all_list').append(`<div class='empty'>
                        <img class='empty_img' src='/public/img/empty.png'></img>
                        <p> 只能到这里了~ <br> 我们以后不见不散哦 </p>
                    </div>`)
    $('#inter-footer').append(`<p><a href="http://www.since88.cn">森思公司</a></p>
                                <p>Copyright &copy; 2014
                                -
                                ` + new Date().getFullYear() + `
                            </p>`)
    let list = document.getElementsByClassName('list-item');
    for (let j = 0; j < list.length; j++) {
        list[j].onclick = function () {
            window.location.href = '/page/forum_detail/index.html?id=' + arr[j].id;
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
    $('#inter-footer').empty();
    if (type != '推荐') {
        getTypequestion(type).then((res) => {
            if (res.data != null) {
                arr = res.data;
                mapALLquestion();
            } else {
                $('#all_list').append(`<div class='empty'>
                        <img class='empty_img' src='/public/img/empty.png'></img>
                        <p> 暂时还没有问题哦~ <br> 赶紧去添加一个问题吧 </p>
                    </div>`)
            }
        })
    } else {
        getRec()
    }
}

// 获取推荐
function getRec() {
    getRecommend().then((res) => {
        if (res.code == 0) {
            arr = res.data;
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
