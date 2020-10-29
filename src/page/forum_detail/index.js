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
    likeAns,
    unlikeAns
} from '~/ajax/forum_detail'

import {
    formatDate,
    isPicEmpty,
    setNum,
    getQueryVariable,
    compareDate,
    encode
}
from '../../../public/js/filters'
let id = getQueryVariable('id');
let detail = [];
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
        'backgroundImage': 'url(' + isPicEmpty(detail.question.image) + ')'
    })


    // 添加用户名
    $('.top_box .uname').text(detail.question.name);
    if (detail.question.openid == 'oIaLN5_r8bz-guPhHQgfO3nAVQk4') {
        $('.top_box .uimg').addClass('hzhPerson');
        $('.top_box .uname').css({
            color: 'rgb(251, 114, 153)'
        })
        $('.top_box .vip').css({
            display: 'flex'
        });
        $('.top_box .udesc').text('森思内部员工');
    }

    if (detail.level == 0) {
        $('.top_box .level').addClass('lv0');
        $('.top_box .level').text('Lv0');
    } else if (detail.level < 10) {
        $('.top_box .level').addClass('lv1');
        $('.top_box .level').text('Lv1');
    } else if (detail.level < 100) {
        $('.top_box .level').addClass('lv2');
        $('.top_box .level').text('Lv2');
    } else if (detail.level < 500) {
        $('.top_box .level').addClass('lv3');
        $('.top_box .level').text('Lv3');
    } else if (detail.level < 1000) {
        $('.top_box .level').addClass('lv4');
        $('.top_box .level').text('Lv4');
    } else if (detail.level < 2000) {
        $('.top_box .level').addClass('lv5');
        $('.top_box .level').text('Lv5');
    } else {
        $('.top_box .level').addClass('lv6');
        $('.top_box .level').text('Lv6');
    }


    // 添加用户个签 // 此功能 以后再接入
    // $('.top_box .udesc').text(detail.question.desc);

    // 添加问题图片
    if (detail.question.qimage) {
        $('.content #qimage').attr('src', detail.question.qimage);
        $('.content .questionImg').css({
            display: 'flex'
        });
    }

    // 添加问题内容
    $('.content .textarea').html(encode(detail.question.word));

    // 添加时间
    $('.foot .time').text('发布于 ' + formatDate(new Date(Number(detail.question.uptime)), 'yyyy-MM-dd'));

    // 添加科目
    $('.foot .type').text(detail.question.type);

    // 点击问题图片 放大
    $('#qimage').click(function () {
        let imgsrc = $(this).attr('src');
        let opacityBottom = '<div class="opacityBottom" style = "display:none"><img class="bigImg" src="' + imgsrc + '"></div>';
        $(document.body).append(opacityBottom);
        toBigImg(); // 变大函数
    })

    $('#likeNum').text('点赞 ' + setNum(detail.question.gnum));
    $('#commentNum').text('评论 ' + setNum(detail.question.cnum));
}
let compare = compareDate;


// 添加 评论列表
function addCommentList() {
    $('.comment .list .list-item').remove();
    for (let i = 0; i < commentList.length; i++) {
        $('.comment .list').append(`<div class="list-item">
                                        <div class="replayerImg">
                                            <img src="` + isPicEmpty(commentList[i].answer.image) + `" alt="">
                                        </div>
                                        <div class="replayerInfo">
                                            <div class="replayer">
                                                <div style="display:flex;align-items:center;">
                                                    <span class="name">` + commentList[i].answer.name + `</span>
                                                    <span class="level commentLevel"></span>
                                                    <span class="vip">大会员</span>
                                                </div>
                                                <span class="time">` + (compare(Number(commentList[i].answer.uptime)) ? formatDate(new Date(Number(commentList[i].answer.uptime)), 'hh:mm') :
            Math.ceil((new Date().getTime() - commentList[i].answer.uptime) / (1000 * 60 * 60 * 24)) < 30 ? Math.ceil((new Date().getTime() - commentList[i].answer.uptime) / (1000 * 60 * 60 * 24)) + '天前' :
            Math.ceil((new Date().getTime() - commentList[i].answer.uptime) / (1000 * 60 * 60 * 24 * 30)) < 12 ? Math.ceil((new Date().getTime() - commentList[i].answer.uptime) / (1000 * 60 * 60 * 24 * 30)) + '个月前' :
            Math.ceil((new Date().getTime() - commentList[i].answer.uptime) / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前') + `</span>
                                            </div>
                                            <div class="replay">` + encode(commentList[i].answer.aword) + `</div>
                                            <div style="display:` + (commentList[i].answer.aimage ? 'block' : 'none') + `;">
                                                <img class="reImg" src="` + isPicEmpty(commentList[i].answer.aimage) + `" />
                                            </div>
                                            <div class="up">
                                                <div class='up-action'>
                                                    <i class="iconpraise icon up-icon"></i>
                                                    <span class="up-num">` + commentList[i].answer.gnum + `</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`);
    }
    let levelList = document.getElementsByClassName('commentLevel');
    for (let i = 0; i < levelList.length; i++) {
        if (commentList[i].answer.openid === 'oIaLN5_r8bz-guPhHQgfO3nAVQk4') {
            $('.replayer .name').css({
                color: 'rgb(251, 114, 153)'
            })
            $('.replayer .vip').css({
                display: 'flex'
            })
        }

        if (commentList[i].level == 0) {
            $(levelList[i]).addClass('lv0');
            $(levelList[i]).text('Lv0');
        } else if (commentList[i].level < 10) {
            $(levelList[i]).addClass('lv1');
            $(levelList[i]).text('Lv1');
        } else if (commentList[i].level < 100) {
            $(levelList[i]).addClass('lv2');
            $(levelList[i]).text('Lv2');
        } else if (commentList[i].level < 500) {
            $(levelList[i]).addClass('lv3');
            $(levelList[i]).text('Lv3');
        } else if (commentList[i].level < 1000) {
            $(levelList[i]).addClass('lv4');
            $(levelList[i]).text('Lv4');
        } else if (commentList[i].level < 2000) {
            $(levelList[i]).addClass('lv5');
            $(levelList[i]).text('Lv5');
        } else {
            $(levelList[i]).addClass('lv6');
            $(levelList[i]).text('Lv6');
        }
    }

    let list = document.getElementsByClassName('up-icon');
    let nums = document.getElementsByClassName('up-num');
    for (let j = 0; j < list.length; j++) {
        if (commentList[j].flag == -1) {
            $(list[j]).removeClass('iconpraise_fill').addClass('iconpraise');
        } else {
            $(list[j]).removeClass('iconpraise').addClass('iconpraise_fill');
        }
        list[j].onclick = function () {
            if (commentList[j].flag == -1) {
                likeAns(commentList[j].answer.id).then((res) => {
                    if (res.code == '0') {
                        commentList[j].answer.gnum++;
                        $(nums[j]).text(setNum(commentList[j].answer.gnum));
                        commentList[j].flag = 0;
                        $(this).removeClass('iconpraise').addClass('iconpraise_fill');
                    }
                })
            } else {
                unlikeAns(commentList[j].answer.id).then(res => {
                    if (res.code == '0') {
                        commentList[j].answer.gnum--;
                        $(nums[j]).text(setNum(commentList[j].answer.gnum));
                        commentList[j].flag = -1;
                        $(this).removeClass('iconpraise_fill').addClass('iconpraise');
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
            $('.footer .likeBtn').addClass('isLike'); // 添加点赞后的样式
            $('#likeNum').text('点赞 ' + setNum(detail.question.gnum));
        } else {
            isLike = false;
            $('.footer .likeBtn').removeClass('isLike'); // 删除点赞后的样式
            $('#likeNum').text('点赞 ' + setNum(detail.question.gnum));
        }

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
                detail.question.gnum--;
                getIsLikeQ();
            }
        })
    } else {
        likeQes(id).then((res) => {
            if (res.code == '0') {
                detail.question.gnum++;
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
