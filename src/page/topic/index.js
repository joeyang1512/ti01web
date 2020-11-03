import { getTopicAllPart, getTopicByLesson } from '~/ajax/topic';
import './index.less';
import { singleTopic } from '../../template/singleChoice';
import { loading, toastTip } from '../../util/sinceui';
import { multipleTopic } from '../../template/multipleChoice';
import { getQueryVariable } from '../../../public/js/filters'

// 1. 变量定义
// localStorage
let topicHistory = localStorage.getItem('topicHistory');
let topicStar = localStorage.getItem('topicStar');
// 获取科目
let lesson = decodeURI(getQueryVariable('lesson'));
// 获取科目对应的题目。
let topicAll = null;
// 将科目按章节分类
let topicByPart = {};
// 2. 获取科目，加载数据
// 获取科目
function getLesson(lesson) {
    switch (lesson) {
        case 'cpu':
            console.log('zuyuan')
            lessonTitle.innerHTML = `${part}`;
            loadTopic('计算机组成原理');
            break;
        case 'net':
            console.log('jiwang')
            lessonTitle.innerHTML = `${part}`;
            loadTopic('计算机网络');
            break;
        case 'china':
            lessonTitle.innerHTML = `${part}`;
            loadTopic('考研政治');
            break;
        case 'link':
            lessonTitle.innerHTML = `${part}`;
            loadTopic('数据结构');
            break;
        case 'os':
            lessonTitle.innerHTML = `${part}`;
            loadTopic('操作系统');
            break;
        case 'all':
            lessonTitle.innerHTML = `${part}`;
            loadTopic('408综合');
            break;
        default:
            break;
    };
}
function loadTopic(str) {
    let load = loading('加载中');
    load(true);
    getTopicByLesson(str).then(res => {
        topicAll = res.data;
        topicToPart(topicAll);
    })
};
// 将科目按章节分类
function topicToPart(topics) {
    getTopicAllPart(lesson).then(res => {
        for (let i = 0; i < res.length; i++) {
            topicByPart[res[i].part] = topicAll.filter(item => {
                return item.part === res[i].part;
            })
        }
    })
}
getLesson(lesson);