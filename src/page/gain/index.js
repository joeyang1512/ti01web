import './index.less';
import { userGain } from '~/ajax/gain';
import { formatDate } from '../../../public/js/filters';
let backBtn = document.getElementById('backBtn');
backBtn.onclick = () => {
    window.history.back(-1);
}
userGain().then((res) => {
    console.log(res);
    if (res.code == '0') {
       showData(res.data)
    } 
});

function showData(_data) {
  let htmlTemple = '';
  for (let i in _data) {
    if (_data[i].type == '提问') {
      htmlTemple = htmlTemple + reporth(_data[i].uptime, 2); 
    } else if (_data[i].type == '回答') {
      htmlTemple = htmlTemple + reporth(_data[i].uptime, 3); 
    } else if (_data[i].type == '打卡') {
      htmlTemple = htmlTemple + reporth(_data[i].uptime, 1); 
    }
  }
  document.getElementById('resHtml').innerHTML = htmlTemple;
}

function reporth(timedata, flags) {
  // console.log(timedata);
  let datet = new Date(Number(timedata));
  let time = formatDate(datet, 'yyyy-MM-dd hh:mm');
if (flags == 1) {
  let report = `<div class="container" style="width: 100vw;height: 70px; border-bottom: 1px  #eee solid;">
<div style="float:left;width:20%;height: 70px;line-height: 70px;text-align: center;">
  <i class="paihangbang icon" style="font-size: 30px;color:rgb(113, 172, 18);"></i>
</div>
<div class="" style="float:left;width:60%; margin-top: 10px;">
  <div><span style="line-height: 30px;font-size: 15px;">今日打卡</span></div>
  <div style="margin-top: -8px;color:#666"><span style="font-size: 10px;">${time}</span></div>
</div>
<div style="float:left;width:20%; line-height: 70px;text-align: center;"">
  <span style="font-size: 20px;">+1</span>
</div>
</div>`;
return report;
} else if (flags == 2) {
let qes = `<div class="container" style="width: 100vw;height: 70px; border-bottom: 1px #eee solid;">
<div style="float:left;width:20%;height: 70px;line-height: 70px;text-align: center;">
  <i class="iconlabel icon" style="font-size: 30px;color:rgb(200, 21, 21);"></i>
</div>
<div class="" style="float:left;width:60%; margin-top: 10px;">
  <div><span style="line-height: 30px;font-size: 15px;">今日提问</span></div>
  <div style="margin-top: -8px;color:#666"><span style="font-size: 10px;">${time}</span></div>
</div>
<div style="float:left;width:20%; line-height: 70px;text-align: center;"">
  <span style="font-size: 20px;">+3</span>
</div>
</div>`;
return qes;
} else if (flags == 3) {
let answer = `<div class="container" style="width: 100vw;height: 70px; border-bottom: 1px #eee solid;">
<div style="float:left;width:20%;height: 70px;line-height: 70px;text-align: center;">
  <i class="iconmessage icon" style="font-size: 30px;color:rgb(20, 101, 221);"></i>
</div>
<div class="" style="float:left;width:60%; margin-top: 10px;">
  <div><span style="line-height: 30px;font-size: 15px;">今日回答</span></div>
  <div style="margin-top: -8px;color:#666"><span style="font-size: 10px;">${time}</span></div>
</div>
<div style="float:left;width:20%; line-height: 70px;text-align: center;"">
  <span style="font-size: 20px;">+5</span>
</div>
</div>`;
return answer;
}
}

