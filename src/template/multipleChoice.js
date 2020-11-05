
function multiple(Element, data, index) {
  if (!index) {
    data[index] = data;
  }
  // console.log(typeof data[index].choice);
  // data[index].choice = JSON.parse(data[index].choice);
  if (typeof data[index].choice === 'string') {
    data[index].choice = data[index].choice.match(/(?:\')(.*?)(?:\')/g).join('~~~').replace(/\'/g, '').split('~~~');
  }
  let arr = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
  let src = data[index].image ? `src=${data[index].image}` : '';
  for (let i = 0; i < data[index].answer.length; i++) {
    arr[data[index].answer[i]] = 'checked';
  }

  let items = [`<label class="weui-cell weui-cells_checkbox" for="x11">
    <div class="weui-cell__bd">
      <p>A. ${data[index].choice[0]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[1] === 'none' ? 'none' : 'x11'}" ${arr[1]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x12">
    <div class="weui-cell__bd">
      <p>B. ${data[index].choice[1]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[2] === 'none' ? 'none' : 'x12'}" ${arr[2]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x13">
    <div class="weui-cell__bd">
      <p>C. ${data[index].choice[2]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[3] === 'none' ? 'none' : 'x13'}" ${arr[3]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x14">
    <div class="weui-cell__bd">
      <p>D. ${data[index].choice[3]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[4] === 'none' ? 'none' : 'x14'}" ${arr[4]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x15">
    <div class="weui-cell__bd">
      <p>E. ${data[index].choice[4]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[5] === 'none' ? 'none' : 'x15'}" ${arr[5]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x16">
    <div class="weui-cell__bd">
      <p>F. ${data[index].choice[5]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[6] === 'none' ? 'none' : 'x16'}" ${arr[6]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`,
  `<label class="weui-cell weui-check__label" for="x17">
    <div class="weui-cell__bd">
      <p>G. ${data[index].choice[6]}</p>
    </div>
    <div class="weui-cell__ft" >
      <input type="checkbox" class="weui-check" name="radio1" id="${arr[7] === 'none' ? 'none' : 'x17'}" ${arr[7]} >
      <span class="weui-icon-checked" ></span>
    </div>
  </label>`
  ];
  let str = `<div class="weui-cells__title">${data[index].title.replace(/\\n/g, '<br/>')}</div>
    <div class="weui-cells weui-cells_radio" style="backgroudColor:#fff;margin-bottom:9vh;">
    ${items.slice(0, data[index].choice.length).join('')}
    <img ${src} alt="" class="img" style="margin:0 3vw; padding-right: 50px;width: 93vw;">
    </div>`
  Element.innerHTML = str;
};
function multipleTopic(Element, data, index, flag) {
  // console.log(typeof data[index].choice);
  // data[index].choice = JSON.parse(data[index].choice);
  if (typeof data[index].choice === 'string') {
    data[index].choice = data[index].choice.match(/(?:\')(.*?)(?:\')/g).join('~~~').replace(/\'/g, '').split('~~~');
  }
  let arr = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
  let src = data[index].image ? `src=${data[index].image}` : '';
  if (flag) {
    for (let i = 0; i < data[index].answer.length; i++) {
      arr[data[index].answer[i]] = 'checked';
    }
  }

  console.log(arr);
  let items = [`<label class="weui-cell weui-cells_checkbox" for="x11" select="1">
  <div class="weui-cell__bd">
    <p>A. ${data[index].choice[0]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[1] === 'none' ? 'none' : 'x11'}" ${arr[1]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`,
  `<label class="weui-cell weui-check__label" for="x12" select="2">
  <div class="weui-cell__bd">
    <p>B. ${data[index].choice[1]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[2] === 'none' ? 'none' : 'x12'}" ${arr[2]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`,
  `<label class="weui-cell weui-check__label" for="x13" select="3">
  <div class="weui-cell__bd">
    <p>C. ${data[index].choice[2]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[3] === 'none' ? 'none' : 'x13'}" ${arr[3]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`,
  `<label class="weui-cell weui-check__label" for="x14" select="4">
  <div class="weui-cell__bd">
    <p>D. ${data[index].choice[3]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[4] === 'none' ? 'none' : 'x14'}" ${arr[4]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`,
  `<label class="weui-cell weui-check__label" for="x15" select="5">
  <div class="weui-cell__bd">
    <p>E. ${data[index].choice[4]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[5] === 'none' ? 'none' : 'x15'}" ${arr[5]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`,
  `<label class="weui-cell weui-check__label" for="x16" select="6">
  <div class="weui-cell__bd">
    <p>F. ${data[index].choice[5]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[6] === 'none' ? 'none' : 'x16'}" ${arr[6]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`,
  `<label class="weui-cell weui-check__label" for="x17" select="7">
  <div class="weui-cell__bd">
    <p>G. ${data[index].choice[6]}</p>
  </div>
  <div class="weui-cell__ft" >
    <input type="checkbox" class="weui-check" name="radio1" id="${arr[7] === 'none' ? 'none' : 'x17'}" ${arr[7]} >
    <span class="weui-icon-checked" ></span>
  </div>
</label>`
  ];
  let str = `<div class="weui-cells__title">${index + 1}.(多选)${data[index].title.replace(/\\n/g, '<br/>')}</div>
  <div class="weui-cells weui-cells_radio xuanxiang" flag="lableFather" style="backgroudColor:#fff;margin-bottom:9vh;">
  ${items.slice(0, data[index].choice.length).join('')}
  <img ${src} alt="" class="img"  style="margin:0 3vw; padding-right: 50px;width: 93vw;">
  </div>`
  Element.innerHTML = str;
};
export { multiple, multipleTopic };
