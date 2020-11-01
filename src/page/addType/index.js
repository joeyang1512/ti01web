import { addTypes } from '~/ajax/types';
addEventListener('click', uploadType);
function gvalue(id) {
    return document.getElementById(id).value;
}
function uploadType() {
    let lesson = gvalue('lesson');
    let part = gvalue('part');
    if (lesson != '' && part != '') {
        addTypes(lesson, part).then((res) => {
            if (res.code == 0) {
                alert('上传成功');
                location.reload();
            }
        });
    }
}