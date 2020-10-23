import './index.less';
import { addQuestion } from '~/ajax/issueQ.js'
let next = document.querySelector('.next'), // 发布
    type1 = document.querySelector('.weui-select'), // 所选科目
    body = document.querySelector('.weui-textarea'), // 问题内容
    toast = document.getElementById('toast'), // 提示框
    uploaderInput = document.getElementById('uploaderInput'), // 上传按键
    uploaderInputMParent = document.querySelector('.weui-uploader__bd'), // uploaderInputMParent的爷爷
    uploaderInputParent = document.querySelector('.weui-uploader__input-box'), // uploaderInputMParent的父亲
    file = null; // 存储图片对象

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

// 点击发布
next.onclick = function () {
    if (!type1.value || !(body.value || uploaderInput.files[0])) {
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 1000);
        return;
    }
    let type = type1.value,
        word = body.value;
    addQuestion({ word, file, type }).then(res => {
        console.log(res);
    })

}
