import './index.less';
import { sinceListener } from '~/util/sinceui';
import { forumUrl, mineUrl, topicsUrl, ourUrl, pictureToQUrl, mineQesUrl, clockInUrl } from '~/util/jumpTo';
import { findLoginUser } from '~/ajax/user';
import { getShoreup } from '~/ajax/shoreup';
import { getUserQues } from '~/ajax/question';
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl)
sinceListener('mine', mineUrl);
sinceListener('report', clockInUrl);
sinceListener('rank');
sinceListener('about', ourUrl);
sinceListener('shoreup', mineQesUrl + '?id=1');
sinceListener('answer', mineQesUrl + '?id=2');
sinceListener('gain');
sinceListener('pictureToQ', pictureToQUrl);

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
            document.getElementById('shoreupnum').innerHTML = res.data.length;
        } 
    });
    getUserQues().then((res) => {
        console.log(res);
        if (res.code == '0') {
            // console.log(res.data.size());
            document.getElementById('question').innerHTML = res.data.length;
        } 
    });
  }
}
