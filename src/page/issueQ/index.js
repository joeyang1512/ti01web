import './index.less';
import { addQuestion, searchQustion, answerQustion, answer, ask } from '~/ajax/issueQ.js';
import { getQueryVariable } from '../../../public/js/filters';
import { loading, toastTip } from '../../util/sinceui'


let pinglun = document.getElementById('pinglun');// 评论模块
let kemu = document.querySelector('.weui-cells');// 选择科目模块
let id = decodeURI(getQueryVariable('id'));// 接受url传来的id
let next = document.querySelector('.next'), // 发布
    type1 = document.querySelector('.weui-select'), // 所选科目
    body = document.querySelector('.weui-textarea'), // 问题内容
    uploaderInput = document.getElementById('uploaderInput'), // 上传按键
    uploaderInputMParent = document.querySelector('.weui-uploader__bd'), // uploaderInputMParent的爷爷
    uploaderInputParent = document.querySelector('.weui-uploader__input-box'), // uploaderInputMParent的父亲
    words = document.getElementById('words'),
    cancel = document.querySelector('.cancel'),
    file = null,
    flag = true; // 存储图片对象
let title = document.querySelector('.weui-media-box__title'),
    desc = document.querySelector('.weui-media-box__desc'),
    img = document.querySelector('.weui-media-box__thumb'),
    issueTitle = document.querySelector('.issue');// 评论内容

let load = loading('上传中');

// 监听输入字数
body.oninput = function () {
    words.innerText = body.value.length;
}

// 取消返回原本页面
cancel.onclick = function () {
    
    // load(false);// 隐藏加载loading
    window.history.back(-1);
}

// 上传图片
uploaderInput.onchange = function () {
    let img = document.createElement('img');
    let fileReader = new FileReader();
    let li = document.querySelector('.weui-uploader__file');

    file = uploaderInput.files[0];
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
        img.style.width = '96px';
        img.style.height = '96px';
        img.src = fileReader.result;
        img.style.display = 'block';
    }
    li.appendChild(img);
    // 把上传图片按钮删除
    uploaderInputMParent.removeChild(uploaderInputParent);
}

// id = 33;
// 通过是否有id来判断是发布评论还是发布问题
if (id === 'false') {// 问题
    kemu.style.display = 'block';


    // 点击发布问题

    next.onclick = function () {
        // 判断内容是否为空
        if (!type1.value || !(body.value || uploaderInput.files[0])) {
            let toast = toastTip('科目问题不能为空');
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 1000);
            return;
        }

        load(true);// 显示加载loading

        if (flag) {
            let type = type1.value,
                word = body.value;
            addQuestion({ word, file, type }).then(res => {
                // console.log(res);
                if (res.code === '0') {
                    ask().then(res => {
                        console.log(res);
                    })
                    load(false);// 隐藏加载loading
                    window.history.back(-1);
                } else {
                    toastTip(true, res.errMsg);
                    setTimeout(() => {
                        toastTip(false);
                    }, 1000);
                    return;
                }
            })
        }
        flag = false;
    }


} else {// 评论
    pinglun.style.display = 'block';
    issueTitle.innerText = '评论';
    searchQustion(id).then(res => {
        // console.log(res);
        title.innerText = res.data.question.name;
        desc.innerText = res.data.question.word;
        img.src = res.data.question.qimage;
    });
    // 点击发布评论
    next.onclick = function () {

        if (!body.value && !uploaderInput.files[0]) {
            let toast = toastTip('评论内容不能为空');
            toast(true);
            setTimeout(() => {
                toast(false);
            }, 1000);
            return;
        }

        load(true);// 显示加载loading

        if (flag) {
            let word = body.value;
            // console.log(word, id, file);
            answerQustion(word, id, file).then(res => {
                console.log(res);
                if (res.code === '0') {
                    answer().then(res => {// 发送回答加经验
                        console.log(res);
                    })
                    load(false);// 隐藏加载loading
                    window.history.back(-1);
                } else {
                    toastTip(true, res.errMsg);
                    setTimeout(() => {
                        toastTip(false);
                    }, 1000);
                    return;
                }
            })
        }
        flag = false;
    }
}


