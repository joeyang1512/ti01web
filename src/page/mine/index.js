import './index.less';
import { sinceListener } from '~/util/sinceui';
import { forumUrl, mineUrl, topicsUrl } from '~/util/jumpTo';
import { findLoginUser } from '~/ajax/user';
import { getShoreup } from '~/ajax/shoreup';
import { getUserQues } from '~/ajax/question';
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
    document.getElementById('level').innerHTML = _data.level;
    getShoreup().then((res) => {
        console.log(res);
        if (res.code == '0') {
            // console.log(res.data.size());
            document.getElementById('shoreup').innerHTML = res.data.size();
        } 
    });
    getUserQues().then((res) => {
        console.log(res);
        if (res.code == '0') {
            // console.log(res.data.size());
            document.getElementById('question').innerHTML = res.data.size();
        } 
    });
  }
}
