import './index.less';

let tabList = document.getElementsByClassName('tab');
for (let i = 0; i < tabList.length; i++) {
    tabList[i].index = i;
    tabList[i].onclick = function () {
        for (let i = 0; i < tabList.length; i++) {
            tabList[i].className = 'tab';
        }
        this.className = 'tab active'
    }
}
