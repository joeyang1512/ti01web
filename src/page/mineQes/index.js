import './index.less';
import {
    getQesByUser,
    getQesByTime,
    getQesByShore
} from '~/ajax/mineQes';

import {
    isPicEmpty,
    setNum,
    getQueryVariable
}
from '../../../public/js/filters';

// 今日0点时间戳
const uptime = new Date(new Date().toLocaleDateString()).getTime();
// 根据id进行匹配
let id = getQueryVariable('id');
let resArr = []; // 问题结果数组
getResQes();
// 将返回的所有结果渲染到页面上
function mapALLquestion() {
    for (let i = 0; i < resArr.length; i++) {
        $('#all_list').append(`<div class="list-item"> 
                                    <div class="item-head">
                                        <div class="info">
                                            <div class="userImg" style="background-image: url('` + isPicEmpty(resArr[i].image) + `');" ></div>
                                            <span class="userName">` + resArr[i].name + `</span>
                                            <span class="type">` + resArr[i].type + `</span>
                                        </div>
                                    </div> 
                                    <div class="item-content">
                                        <p>` + resArr[i].word + `</p>
                                        <div class="qimg" style="display:` + (resArr[i].qimage ? 'block' : 'none') + `
                                        ;background-image:url('` + resArr[i].qimage + `');"></div>
                                    </div>
                                    <div class="item-foot">
                                        <span class="like">` + setNum(resArr[i].gnum) + ` 点赞</span>
                                        <span class="count">·</span>
                                        <span class="comment">` + setNum(resArr[i].cnum) + ` 评论</span>
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
            window.location.href = '/page/forum_detail/index.html?id=' + resArr[j].id;
        }
    }
}

// 搜索结果
function getResQes() {
    if (id == 1) {
        $('.header .title').text('我的收藏')
        // 我的收藏
        getQesByShore().then(res => {
            if (res.code == 0) {
                resArr = res.data;
                mapALLquestion();
            } else {
                $('#all_list').append(`<div class='empty'>
                                            <img class='empty_img' src='/public/img/empty.png'></img>
                                            <p> 暂时还没有问题哦~ <br> 赶紧去收藏一个问题吧 </p>
                                        </div>`);
                $('#inter-footer').append(`<p><a href="http://www.since88.cn">森思公司</a></p>
                                                <p>Copyright &copy; 2014
                                                -
                                                ` + new Date().getFullYear() + `
                                            </p>`);
            }
        })
    } else if (id == 2) {
        $('.header .title').text('我的问答')
        // 我的问答
        getQesByUser().then(res => {
            console.log(res);
            if (res.code == 0) {
                resArr = res.data;
                mapALLquestion();
            } else {
                $('#all_list').append(`<div class='empty'>
                                            <img class='empty_img' src='/public/img/empty.png'></img>
                                            <p> 暂时还没有问题哦~ <br> 赶紧去添加一个问题吧 </p>
                                        </div>`)
                $('#inter-footer').append(`<p><a href="http://www.since88.cn">森思公司</a></p>
                                                <p>Copyright &copy; 2014
                                                -
                                                ` + new Date().getFullYear() + `
                                            </p>`);
            }
        })
    } else {
        $('.header .title').text('今日问答')
        // 今日问答
        getQesByTime(uptime).then(res => {
            console.log(res);
            if (res.code == 0) {
                resArr = res.data;
                mapALLquestion();
            } else {
                $('#all_list').append(`<div class='empty'>
                                            <img class='empty_img' src='/public/img/empty.png'></img>
                                            <p> 暂时还没有问题哦~ <br> 赶紧去添加一个问题吧 </p>
                                        </div>`);
                $('#inter-footer').append(`<p><a href="http://www.since88.cn">森思公司</a></p>
                                                <p>Copyright &copy; 2014
                                                -
                                                ` + new Date().getFullYear() + `
                                            </p>`);
            }
        })

    }
}
// 后退按钮
$('#backBtn').click(function () {
    window.history.back();
});
