import './index.less';
import { sinceListener } from '~/util/sinceui';
import { forumUrl, mineUrl, topicsUrl } from '~/util/jumpTo';
import { findLoginUser } from '~/ajax/user';
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl)
sinceListener('mine', mineUrl);
sinceListener('report');
sinceListener('rank');
sinceListener('about');
sinceListener('shoreup');
sinceListener('answer');
sinceListener('gain');
sinceListener('qesBank', '/page/topics/index.html');
sinceListener('forum', '/page/forum/index.html');

findLoginUser().then((res) => {
    if (res.code == '0') {
        setUserInfo(res.data);
    }
});
function setUserInfo(_data) {
  if (_data != null) {
    document.getElementById('userInfo').innerHTML = `
    <br><br>
          <i>我</i><br>
          <img class="headImage" src="${_data.image}">
          <h4>${_data.name}</h4> <br>
    `;
  }
}
