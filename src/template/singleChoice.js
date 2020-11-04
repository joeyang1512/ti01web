
function single(Element, data, index) {
  if (!index) {
    data[index] = data;
  }
  // console.log(data);
  // console.log(typeof data[index].choice);
  // console.log(data[index].choice);
  if (typeof data[index].choice === 'string') {
    // console.log(data[index].choice)
    data[index].choice = data[index].choice.match(/(?:\')(.*?)(?:\')/g).join('~~~').replace(/\'/g, '').split('~~~');
  }
  // console.log(data[index].choice);
  // data[index].choice = ['你居然会相信那个小滑头来接你', '我知道有一天它会在一个', '万众瞩目的情况下出现', '身披金甲圣衣脚踏七色云彩来娶我'];
  let arr = ['none', 'none', 'none', 'none', 'none', 'none', 'none'];
  let src = data[index].image ? `src=${data[index].image}` : '';
  arr[data[index].answer] = 'checked';
  let items = [`<label class="weui-cell weui-check__label" for="x11">
    <div class="weui-cell__bd">
      <p>A. ${data[index].choice[0]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[1] === 'none' ? 'none' : 'x11'}" ${arr[1]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x12">
    <div class="weui-cell__bd">
      <p>B. ${data[index].choice[1]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[2] === 'none' ? 'none' : 'x12'}" ${arr[2]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x13">
    <div class="weui-cell__bd">
      <p>C. ${data[index].choice[2]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[3] === 'none' ? 'none' : 'x13'}" ${arr[3]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x14">
    <div class="weui-cell__bd">
      <p>D. ${data[index].choice[3]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[4] === 'none' ? 'none' : 'x14'}" ${arr[4]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x15">
    <div class="weui-cell__bd">
      <p>E. ${data[index].choice[4]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[5] === 'none' ? 'none' : 'x15'}" ${arr[5]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x16">
    <div class="weui-cell__bd">
      <p>F. ${data[index].choice[5]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[6] === 'none' ? 'none' : 'x16'}" ${arr[6]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x17">
    <div class="weui-cell__bd">
      <p>G. ${data[index].choice[6]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[7] === 'none' ? 'none' : 'x17'}" ${arr[7]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`
  ];
  let str = `<div class="weui-cells__title">${data[index].title.replace(/\\n/g, '<br/>')}</div>
    <div class="weui-cells weui-cells_radio">
    ${items.slice(0, data[index].choice.length).join('')}
    <img ${src} alt="" class="img" style="margin:3vw; padding-right: 50px;width: 93vw;">
    </div>`
  Element.innerHTML = str;
};
function singleTopic(Element, data, index, flag) {
  // console.log(data);
  // console.log(typeof data[index].choice);
  // console.log(data[index].choice);
  if (typeof data[index].choice === 'string') {
    data[index].choice = data[index].choice.match(/\'(.*?)\'/g).join('~~~').replace(/\'/g, '').split('~~~');
  }
  // console.log(data[index].choice);
  // data[index].choice = ['你居然会相信那个小滑头来接你', '我知道有一天它会在一个', '万众瞩目的情况下出现', '身披金甲圣衣脚踏七色云彩来娶我'];
  let arr = ['none', 'none', 'none', 'none', 'none', 'none', 'none'];
  let src = data[index].image ? `src=${data[index].image}` : '';
  flag ? arr[data[index].answer] = 'checked' : 'none';
  let items = [`<label class="weui-cell weui-check__label" for="x11">
    <div class="weui-cell__bd">
      <p>A. ${data[index].choice[0]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[1] === 'none' ? 'none' : 'x11'}" ${arr[1]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x12">
    <div class="weui-cell__bd">
      <p>B. ${data[index].choice[1]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[2] === 'none' ? 'none' : 'x12'}" ${arr[2]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x13">
    <div class="weui-cell__bd">
      <p>C. ${data[index].choice[2]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[3] === 'none' ? 'none' : 'x13'}" ${arr[3]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x14">
    <div class="weui-cell__bd">
      <p>D. ${data[index].choice[3]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[4] === 'none' ? 'none' : 'x14'}" ${arr[4]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x15">
    <div class="weui-cell__bd">
      <p>E. ${data[index].choice[4]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[5] === 'none' ? 'none' : 'x15'}" ${arr[5]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x16">
    <div class="weui-cell__bd">
      <p>F. ${data[index].choice[5]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[6] === 'none' ? 'none' : 'x16'}" ${arr[6]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x17">
    <div class="weui-cell__bd">
      <p>G. ${data[index].choice[6]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="radio" class="weui-check" name="radio1" id="${arr[7] === 'none' ? 'none' : 'x17'}" ${arr[7]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`
  ];
  let str = `<div class="weui-cells__title">${index + 1}.(单选)${data[index].title.replace(/\\n/g, '<br/>')}</div>
    <div class="weui-cells weui-cells_radio xuanxiang">
    ${items.slice(0, data[index].choice.length).join('')}
    <img ${src} alt="" class="img" style="margin:3vw; padding-right: 50px;width: 93vw;">
    </div>`
  Element.innerHTML = str;
};
export { single, singleTopic };
