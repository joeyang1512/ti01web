import './index.less';
import { getByFile } from '../../ajax/pictureToQ';
import { loading, toastTip } from '../../util/sinceui';
import { single } from '../../template/singleChoice';
import { multiple } from '../../template/multipleChoice'
let file = null;
let input = document.querySelector('#fileSelect');
let timus = null;
let camera = document.getElementById('camera');
let topic = document.getElementById('topic');
let body = document.querySelector('.weui-panel__bd');
let timu = document.querySelector('.body');
let str = '';
let flag = true;
input.onchange = function () {
  let toast = loading('搜索中');
  toast(true);
  console.log('onchange')
  file = input.files[0];
  console.log(file);
  getByFile(file).then(res => {
    console.log(res);
    toast(false);
    if (res.code == 0) {
      timus = res.data;
      changePage(res.data);
    } else {
      let toast = toastTip(res.errMsg);
      toast(true);
      setTimeout(() => {
        toast(false);
      }, 700);
    }

  });
};

function changePage(data) {
  for (let i = 0; i < data.length; i++) {
    let flag = Boolean(data[i].img),
      imgSrc = flag ? 'src=' + data[i].img : null;
    str += `<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg listOfTi" tiId=${data[i].id}>

        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">${data[i].title}</h4>
          <p class="weui-media-box__desc">${data[i].lesson}</p>
        </div>
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" alt="" ${imgSrc}>
        </div>
      </a>`
  }
  body.innerHTML = str;
  camera.className = 'iconcamera';
  topic.className = 'iconactivity_fill';
  topic.click();
}
camera.onclick = function () {
  body.innerHTML = `<div class="container">
    <label for="fileSelect">
      <i class="iconcamera_fill camera" style="font-size: 80px;"></i>
    </label>
  </div>`;
  camera.className = 'iconcamera_fill';
  topic.className = 'iconactivity';
}
topic.onclick = function () {
  if (!str) {
    let toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 1000);

  }
  body.innerHTML = str;
  camera.className = 'iconcamera';
  topic.className = 'iconactivity_fill';

  let listOfTi = document.querySelectorAll('.listOfTi');
  listOfTi.forEach((item, index) => {
    item.onclick = function () {
      flag = false;
      if (timus[index].type === 1) {
        single(body, timus, index);
      } else {
        multiple(body, timus, index);
      }

      /* let src = '', str = '';
      timus[index].image ? 'src=' + timus[index].image : null;
      let arr = ['none', 'none'];
      arr[timus[index].answer] = 'checked';
      str = `<div class="weui-cells__title">${timus[index].title}</div>
            <div class="weui-cells weui-cells_radio">
              <label class="weui-cell weui-check__label" for="x11">
                <div class="weui-cell__bd">
                  <p>${timus[index].choice[0]}</p>
                </div>
                <div class="weui-cell__ft" style="display:${arr[0]}">
                  <input type="radio" class="weui-check" name="radio1" id="x11" ${arr[0]} >
                  <span class="weui-icon-checked" style="display:${arr[0]}"></span>
                </div>
              </label>
              <label class="weui-cell weui-check__label" for="x12">
        
                <div class="weui-cell__bd">
                  <p>${timus[index].choice[1]}</p>
                </div>
                <div class="weui-cell__ft">
                  <input type="radio" name="radio1" class="weui-check" id="x12" ${arr[1]}>
                  <span class="weui-icon-checked"></span>
                </div>
              </label>
              <img src="../../../public/img/1.jpg" alt="" class="img">
            </div>`
      body.innerHTML = str; */
    }
  })
}

backBtn.onclick = function () {
  if (!flag) {
    topic.click();
    flag = true;
    return;
  }
  window.history.back(-1);
}
