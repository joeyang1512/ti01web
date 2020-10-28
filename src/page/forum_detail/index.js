import './index.less';
import {
    getDetail,
    likeQes,
    getComment,
    collectQes,
    getIsLike,
    getIsCollect,
    deleteLike,
    deleteCollect,
    likeAns
} from '~/ajax/forum_detail'

import {
    formatDate,
    isPicEmpty,
    setNum,
    getQueryVariable,
    compareDate
}
from '../../../public/js/filters'

let id = getQueryVariable('id');
let detail = [];
let userInfo = [];
let commentList = [];
// 获取数据
getDetail(id).then((res) => {
    if (res.code == '0') {
        detail = res.data;
        addDtailHtml();
    }
});

// 获取该问题的评论列表
function getComments() {
    $('.comment .no-comment').remove();
    getComment(id).then((res) => {
        if (res.code == '0') {
            commentList = res.data;
            addCommentList();
        } else {
            $('.comment').append(`<div class="no-comment"> 
                                    <i class="iconinteractive icon"></i>
                                    <p> 还没有回答 <br> 第一个发表评论吧 </p>
                                  </div>
                                `);
        }
    });
}
getComments();

// 添加模板
function addDtailHtml() {
    // 添加用户头像
    $('.top_box .uimg').css({
        'backgroundImage': 'url(' + isPicEmpty(detail.image) + ')'
    })

    // 添加用户名
    // oIaLN5_r8bz-guPhHQgfO3nAVQk4
    $('.top_box .uname').text(detail.name);
    if (detail.openid == 'oIaLN5_r8bz-guPhHQgfO3nAVQk4') {
        $('.top_box .level').addClass('lv9')
    } else {
        if (detail.level == 0) {
            $('.top_box .level').addClass('lv0');
        } else if (detail.level < 10) {
            $('.top_box .level').addClass('lv1');
        } else if (detail.level < 100) {
            $('.top_box .level').addClass('lv2');
        } else if (detail.level < 500) {
            $('.top_box .level').addClass('lv3');
        } else if (detail.level < 1000) {
            $('.top_box .level').addClass('lv4');
        } else if (detail.level < 2000) {
            $('.top_box .level').addClass('lv5');
        } else if (detail.level >= 2000) {
            $('.top_box .level').addClass('lv6');
        } else {
            $('.top_box .level').addClass('lv0');
        }
    }

    // 添加用户个签 // 此功能 以后再接入
    // $('.top_box .udesc').text(detail.desc);

    // 添加问题图片
    if (detail.qimage) {
        $('.content #qimage').attr('src', detail.qimage);
        $('.content .questionImg').css({
            display: 'flex'
        });
    }

    // 添加问题内容
    $('.content .textarea').html(detail.word);

    // 添加时间
    $('.foot .time').text('发布于 ' + formatDate(new Date(Number(detail.uptime)), 'yyyy-MM-dd'));

    // 添加科目
    $('.foot .type').text(detail.type);

    // 点击问题图片 放大
    $('#qimage').click(function () {
        let imgsrc = $(this).attr('src');
        let opacityBottom = '<div class="opacityBottom" style = "display:none"><img class="bigImg" src="' + imgsrc + '"></div>';
        $(document.body).append(opacityBottom);
        toBigImg(); // 变大函数
    })

    $('#likeNum').text('点赞 ' + setNum(detail.gnum));
    $('#commentNum').text('评论 ' + setNum(detail.cnum));
}
let compare = compareDate;


// 添加 评论列表
function addCommentList() {
    $('.comment .list .list-item').remove();
    for (let i = 0; i < commentList.length; i++) {
        $('.comment .list').append(`<div class="list-item">
                                        <div class="replayerImg">
                                            <img src="` + isPicEmpty(commentList[i].image) + `" alt="">
                                        </div>
                                        <div class="replayerInfo">
                                            <div class="replayer">
                                                <div style="display:flex;align-items:center;">
                                                    <span class="name">` + commentList[i].name + `</span>
                                                    <span class="level"></span>
                                                </div>
                                                <span class="time">` + (compare(Number(commentList[i].uptime)) ? formatDate(new Date(Number(commentList[i].uptime)), 'hh:mm') :
            Math.ceil((new Date().getTime() - commentList[i].uptime) / (1000 * 60 * 60 * 24)) < 30 ? Math.ceil((new Date().getTime() - commentList[i].uptime) / (1000 * 60 * 60 * 24)) + '天前' :
            Math.ceil((new Date().getTime() - commentList[i].uptime) / (1000 * 60 * 60 * 24 * 30)) < 12 ? Math.ceil((new Date().getTime() - commentList[i].uptime) / (1000 * 60 * 60 * 24 * 30)) + '个月前' :
            Math.ceil((new Date().getTime() - commentList[i].uptime) / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前') + `</span>
                                            </div>
                                            <div class="replay">` + commentList[i].aword + `</div>
                                            <div style="display:` + (commentList[i].aimage ? 'block' : 'none') + `;">
                                                <img class="reImg" src="` + isPicEmpty(commentList[i].aimage) + `" />
                                            </div>
                                            <div class="up">
                                                <div class='up-action'>
                                                    <i class="iconpraise icon up-icon"></i>
                                                    <span class="up-num">` + commentList[i].gnum + `</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`);
        if (commentList[i].openid === 'oIaLN5_r8bz-guPhHQgfO3nAVQk4') {
            $('.replayer .level').addClass('lv9');
        } else {
            if (commentList[i].level == 0) {
                $('.replayer .level').addClass('lv0');
            } else if (commentList[i].level < 10) {
                $('.replayer .level').addClass('lv1');
            } else if (commentList[i].level < 100) {
                $('.replayer .level').addClass('lv2');
            } else if (commentList[i].level < 500) {
                $('.replayer .level').addClass('lv3');
            } else if (commentList[i].level < 1000) {
                $('.replayer .level').addClass('lv4');
            } else if (commentList[i].level < 2000) {
                $('.replayer .level').addClass('lv5');
            } else if (commentList[i].level >= 2000) {
                $('.replayer .level').addClass('lv6');
            } else {
                $('.replayer .level').addClass('lv0');
            }
        }
    }
    let list = document.getElementsByClassName('up-icon');
    let nums = document.getElementsByClassName('up-num');
    for (let j = 0; j < list.length; j++) {
        commentList[j].isLike = false;
        list[j].onclick = function () {
            if (!commentList[j].isLike) {
                likeAns(commentList[j].id).then((res) => {
                    if (res.code == '0') {
                        commentList[j].gnum++;
                        $(nums[j]).text(setNum(commentList[j].gnum));
                        commentList[j].isLike = true;
                        $(this).removeClass('iconpraise').addClass('iconpraise_fill'); // 移除收藏后的样式
                    }
                })
            }
        }
    }

    // 点击评论区的图片 放大
    let imgList = document.getElementsByClassName('reImg');
    for (let i = 0; i < imgList.length; i++) {
        imgList[i].onclick = function () {
            let imgsrc = $(this).attr('src');
            let opacityBottom = '<div class="opacityBottom" style = "display:none"><img class="bigImg" src="' + imgsrc + '"></div>';
            $(document.body).append(opacityBottom);
            toBigImg(); // 变大函数
        }
    }
}


// 图片全屏变大函数
function toBigImg() {
    $('.opacityBottom').addClass('opacityBottom'); // 添加遮罩层
    $('.opacityBottom').show();
    $('html,body').addClass('none-scroll'); // 下层不可滑动
    $('.bigImg').addClass('bigImg'); // 添加图片样式
    $('.opacityBottom').click(function () { // 点击关闭
        $('html,body').removeClass('none-scroll');
        $('.opacityBottom').remove();
    });
}

// 判断当前用户是否已经点赞
let isLike = false;

function getIsLikeQ() {
    getIsLike(id).then(res => {
        if (res.code == '0') {
            isLike = true;
            $('#likeNum').text('点赞 ' + setNum(detail.gnum));
            $('.footer .likeBtn').addClass('isLike'); // 添加点赞后的样式
        } else {
            isLike = false;
            $('.footer .likeBtn').removeClass('isLike'); // 删除点赞后的样式
        }
        $('#likeNum').text('点赞 ' + setNum(detail.gnum));
    })
}

// 判断当前用户是否已经收藏
let isCollect = false;

function getIsCollectQ() {
    getIsCollect(id).then(res => {
        if (res.code == '0') {
            isCollect = true;
            $('.collectionBtn').addClass('isCollect'); // 添加收藏后的样式
        } else if (res.code == '1') {
            isCollect = false;
            $('.collectionBtn').removeClass('isCollect'); // 移除收藏后的样式
        }
    })
}
getIsLikeQ();
getIsCollectQ();
// 点赞问题
$('.footer .likeBtn').click(function () {
    if (isLike == true) {
        deleteLike(id).then(res => {
            if (res.code == '0') {
                detail.gnum--;
                getIsLikeQ();
            }
        })
    } else {
        likeQes(id).then((res) => {
            if (res.code == '0') {
                detail.gnum++;
                getIsLikeQ();
            }
        })
    }
});

// 收藏问题
$('.collectionBtn').click(function () {
    if (isCollect == true) {
        deleteCollect(id).then(res => {
            if (res.code == '0') {
                getIsCollectQ();
            }
        })
    } else {
        collectQes(id).then((res) => {
            if (res.code == '0') {
                getIsCollectQ();
            }
        })
    }
})

// 后退按钮
$('#backBtn').click(function () {
    window.location.href = '/page/forum/index.html';
});

// 点击按钮添加评论
$('.submit').click(() => {
    window.location.href = '../issueQ/index.html?id=' + id;
    console.log('submit');
});

// 点击右下角评论 滚动到讨论区
$('.commentBtn').click(() => {
    const el = document.getElementsByClassName('comment')[0];
    window.scrollTo({
        behavior: 'smooth',
        top: el.offsetTop - 50
    });
});