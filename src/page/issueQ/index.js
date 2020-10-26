import './index.less';
import { addQuestion, searchQustion, answerQustion } from '~/ajax/issueQ.js';
import { getQueryVariable } from '../../../public/js/filters';
let pinglun = document.getElementById('pinglun');// 评论模块
let kemu = document.querySelector('.weui-cells');// 选择科目模块
let id = decodeURI(getQueryVariable('id'));// 接受url传来的id
let next = document.querySelector('.next'), // 发布
    type1 = document.querySelector('.weui-select'), // 所选科目
    body = document.querySelector('.weui-textarea'), // 问题内容
    toast = document.getElementById('toast'), // 提示框
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
    toastContent = document.querySelector('.weui-toast__content'),
    issueTitle = document.querySelector('.issue');// 评论内容

// 监听输入字数
body.oninput = function () {
    words.innerText = body.value.length;
}

// 取消返回原本页面
cancel.onclick = function () {
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
    pinglun.style.display = 'none';


    // 点击发布问题

    next.onclick = function () {

        if (!type1.value || !(body.value || uploaderInput.files[0])) {
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 1000);
            return;
        }
        if (flag) {
            let type = type1.value,
                word = body.value;
            addQuestion({ word, file, type }).then(res => {
                if (res.code === '0') {
                    window.history.back(-1);
                } else {
                    toastContent.innerText = '发布失败原因待查🤔';
                    toast.style.display = 'block';
                    setTimeout(() => {
                        toast.style.display = 'none';
                    }, 1000);
                    return;
                }
            })
        }
        flag = false;
    }


} else {// 评论
    kemu.style.display = 'none';
    issueTitle.innerText = '评论';
    searchQustion(id).then(res => {
        title.innerText = res.data.type;
        desc.innerText = res.data.word;
        img.src = res.data.qimage;
    });
    // 点击发布评论
    next.onclick = function () {

        if (!body.value && !uploaderInput.files[0]) {
            toastContent.innerText = '评论不能为空';
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 1000);
            return;
        }
        if (flag) {
            let aword = body.value;
            answerQustion(aword, id, file).then(res => {
                if (res.code === '0') {
                    window.history.back(-1);
                } else {
                    toastContent.innerText = '发布失败原因待查🤔';
                    toast.style.display = 'block';
                    setTimeout(() => {
                        toast.style.display = 'none';
                    }, 1000);
                    return;
                }
            })
        }
        flag = false;
    }
}


