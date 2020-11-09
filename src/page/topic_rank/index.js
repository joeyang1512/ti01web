import './index.less';
import {
    getAllRank,
    getTodayRank,
} from '~/ajax/topic_rank'

import {
    formatDate,
    isPicEmpty
}
from '../../../public/js/filters'

let rank = [];

// 获取今日排名
function getToday() {
    getTodayRank().then(res => {
        if (res.code == '0') {
            rank = res.data.slice(0, 20);
            mapRank();
        } else {
            $('.list').append(`<div class='empty'>
                                    <p> 暂时还没有排名~ </p>
                                </div>`);
        }
    })
}
// 获取总排名
function getAll() {
    getAllRank().then(res => {
        if (res.code == '0') {
            rank = res.data.slice(0, 20);
            mapRank();
        } else {
            $('.list').append(`<div class='empty'>
                                    <p> 暂时还没有排名~ </p>
                                </div>`);
        }
    })
}
getToday();

let index = 0;
$('.tab_today').click(() => {
    if (index == 1) {
        index = 0;
        $('.list').empty();
        $('.tab_today span').addClass('active');
        $('.tab_all span').removeClass('active');
        getToday();
    }
});
$('.tab_all').click(() => {
    if (index == 0) {
        index = 1;
        $('.list').empty();
        $('.tab_all span').addClass('active');
        $('.tab_today span').removeClass('active');
        getAll();
    }
});

// 将返回的所有结果渲染到页面上
function mapRank() {
    $('.list').empty();
    for (let i = 0; i < rank.length; i++) {
        $('.list').append(`<div class="item">
            <span class="index">` + (i + 1) + `</span>
            <div class="content">
                <div class="userImg" style="background-image: url('` + isPicEmpty(rank[i].image) + `');" ></div>
                <span class="userName">` + rank[i].name + `</span>
            </div>
            <span class="time">` + rank[i].num + '道 ' + rank[i].right * 100 + '%' + `</span>
        </div>`)
    }
    $('.list').append(`<div class='empty'>
                            <p> 只能到这里了~ </p>
                        </div>`);
}


// 后退按钮
$('#backBtn').click(function () {
    console.log(1);
    window.history.back();
});