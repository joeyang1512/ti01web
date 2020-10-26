import './index.less';
import {
    getSearchResult
} from '~/ajax/search_result';

import {
    isPicEmpty,
    setNum,
    getQueryVariable
}
from '../../../public/js/filters';

let word = getQueryVariable('word');
console.log(word);
let resArr = []; // 问题搜索结果数组
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
                                    <div class="item-content">` + resArr[i].word + `</div>
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
    let list = document.getElementsByClassName('list-item');
    for (let j = 0; j < list.length; j++) {
        list[j].onclick = function () {
            window.location.href = '/page/forum_detail/index.html?id=' + resArr[j].id;
        }
    }
}

// 搜索结果
function getResQes() {
    getSearchResult(decodeURI(word)).then((res) => {
        console.log(res);
        if (res.code == 0) {
            resArr = res.data;
            mapALLquestion();
        } else {
            $('#all_list').append(`<div class='empty'>
                                        <img class='empty_img' src='/public/img/empty.png'></img>
                                        <p> 暂时还没有问题哦~ <br> 赶紧去添加一个问题吧 </p>
                                    </div>`)
        }
    });
}

// 后退按钮
$('#backBtn').click(function () {
    window.location.href = '/page/forum/index.html?';
});

$('.iconadd').click(() => {
    window.location.href = '/page/issueQ/index.html';
});

