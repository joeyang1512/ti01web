import { getTopic } from '~/ajax/topic'
// import { addTopic } from '~/ajax/testApi';

const titles = document.querySelector('.yx-header-title');
let lastChecked = document.querySelectorAll('.checkedTitle')[0];

titles.addEventListener('click', tapFn, false); // 头部选项卡

// 获取数据
getTopic().then((res) => {
    console.log(res);
});


function tapFn(ev) {
    let target = ev.target || window.event.target,
        tarName = target.nodeName;
    if (tarName === 'SPAN') {
        if (lastChecked !== target) {
            lastChecked.className = 'title'
            target.className = 'title checkedTitle'
            lastChecked = target;
        }
    }

}
