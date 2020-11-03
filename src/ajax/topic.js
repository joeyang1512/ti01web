import { post, get } from './ajax_axios.js';
/**
 * @param 
 * @returns {*|Promise|Promise<unknown>}
 */
export const getTopic = () => {
    return post('/topic/findAll');
}
export const addTopic = (title, type, choice, answer, lesson, part, file) => {
    return post('/topic/add', {
        title,
        type,
        choice,
        answer,
        lesson,
        part,
        file
    });
}

export const getTopicByLesson = (lesson) => {
    return get('/topic/findByLesson', { lesson });
}
// 根据科目搜索章节
export const getTopicAllPart = (lesson) => {
    return post('/types/findByLesson', { lesson });
}

