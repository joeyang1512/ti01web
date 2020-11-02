import './index.less';
import {
    getTodayAllRank,
    getTodayUserRank,
    getAllUserRank,
    addDaka,
    isDaka
} from '~/ajax/clockIn'

import {
    formatDate,
    isPicEmpty
}
from '../../../public/js/filters'

let rank = [];

// 获取今日排名
function getToday() {
    getTodayAllRank().then(res => {
        if (res.code == '0') {
            rank = res.data.slice(0, 20);
            mapRank();
        }
    })
}
// 获取总排名
function getAll() {
    getAllUserRank().then(res => {
        if (res.code == '0') {
            rank = res.data.slice(0, 20);
            mapRank1();
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
function mapRank1() {
    $('.list').empty();
    for (let i = 0; i < rank.length; i++) {
        $('.list').append(`<div class="item">
            <span class="index">` + (i + 1) + `</span>
            <div class="content">
                <div class="userImg" style="background-image: url('` + isPicEmpty(rank[i].image) + `');" ></div>
                <span class="userName">` + rank[i].name + `</span>
            </div>
            <span class="time">` + rank[i].num + ` 次</span>
        </div>`)
    }
    $('.list').append(`<div class='empty'>
                            <p> 只能到这里了~ </p>
                        </div>`);
}
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
            <span class="time">` + formatDate(new Date(Number(rank[i].uptime)), 'hh:mm') + `</span>
        </div>`)
    }
    $('.list').append(`<div class='empty'>
                            <p> 只能到这里了~ </p>
                        </div>`);
}


// 后退按钮
$('#backBtn').click(function () {
    window.history.back();
});

// 判断用户今日是否打卡
isDaka().then(res => {
    if (res.code == '0') {
        // 打卡按钮
        $('.dakaBtn').click(function () {
            addDaka('132', '123').then(res => {
                if (res.code == '0') {
                    $('.dakaBtn').addClass('active');
                    getToday();
                }
            })
        });
    } else {
        $('.dakaBtn').addClass('active');
    }
})