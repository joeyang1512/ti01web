import './index.less';
let backBtn = document.getElementById('backBtn');
backBtn.onclick = function () {
    if (!flag) {
        topic.click();
        return;
    }
    window.history.back(-1);
}
