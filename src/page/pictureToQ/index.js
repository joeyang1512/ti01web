import './index.less';
import { getByFile } from '../../ajax/pictureToQ';
let file = null;
let input = document.querySelector('#fileSelect');

input.onchange = function () {
    file = input.files[0];
    console.log(file);
    getByFile(file).then(res => {
        console.log(res);
    })
};


