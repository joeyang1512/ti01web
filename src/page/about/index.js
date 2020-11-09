import './index.less';
import { sinceListener } from '~/util/sinceui';
sinceListener('softInfo', '/page/softInfo/index.html');
sinceListener('our', '/page/our/index.html');
let backBtn = document.getElementById('backBtn');
backBtn.onclick = () => {
    window.history.back(-1);
}
