import { post } from './ajax_axios.js';


// 测试api接口文档的完成情况
// 1.添加一个题目

export const addTopic = (title,
    type,
    choice,
    answer,
    lesson,
    part) => {
    return get('/topic/add', {
        title,
        type,
        choice,
        answer,
        lesson,
        part,
    })
}
// 2.修改一个题目
export const modifyTopic = () => {
    return post('/topic/modify', {
        answer: '2',
        choice: ['对', '错'],
        id: 6,
        lesson: '数学',
        part: '整数加法',
        status: 1,
        title: '2+2等于5吗',
        type: 1,
    })
}
// 3.删除一个题目
export const deleteTopic = () => {
    return post('/topic/delete', { id: '14' });
}
// 4.根据类型搜索题目
export const findByType = () => {
    return post('/topic/findByType', { type: '1' });
}
// 5.搜索某个时间戳之后的题目
export const findByUptime = () => {
    return post('/topic/findByUptime', { uptime: '1600356441928' });
}
// 6.根据科目搜索题目
export const findByLesson = () => {
    return post('/topic/findByLesson', { lesson: '计算机网络' });
}
// 7.根据章节搜索题目
export const findByPart = () => {
    return post('/topic/findByPart', { lesson: '数学', part: '整数加法' });
};

// 测试
/* addTopic().then(res => {
    console.log('添加一个题目');
    console.log(res);
}) */
/* modifyTopic().then(res => {
    console.log('修改一个题目');
    console.log(res);
}) */

/* deleteTopic().then(res => {
    console.log('删除一个题目');
    console.log(res);
}) */

/* findByType().then(res => {
    console.log('根据类型搜索题目');
    console.log(res);
}) */

/* findByUptime().then(res => {
    console.log('搜索某个时间戳之后的题目');
    console.log(res);
}) */

/* findByLesson().then(res => {
    console.log('根据科目搜索题目');
    console.log(res);
}) */
/* findByPart().then(res => {
    console.log('根据章节搜索题目');
    console.log(res);
}) */

