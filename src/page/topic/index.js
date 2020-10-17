import { getTopic } from '~/ajax/topic'
import { addTopic } from '~/ajax/testApi'
const titles = document.querySelector('.yx-header-title');
let lastChecked = document.querySelectorAll('.checkedTitle')[0];

titles.addEventListener('click', tapFn, false); // 头部选项卡

// 获取数据
getTopic().then((res) => {
    console.log(res);
})


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
let title = 'TCP协议属于网络层',
    type = 1,
    choice = ['对', '错'],
    answer = '1',
    lesson = '计算机网络',
    part = '传输层';
// 测试
addTopic(title,
    type,
    choice,
    answer,
    lesson,
    part).then(res => {
    console.log('添加一个题目');
    console.log(res);
})

getTopic().then((res) => {
    console.log(res);
})

