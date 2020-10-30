import { post, get } from './ajax_axios.js';
/**
 * @param 
 * @returns {*|Promise|Promise<unknown>}
 */
export const addQuestion = (data) => {
    return post('/question/add', data);
}
// 查询一个问题
export const searchQustion = (id) => {
    return get('/question/findById', { id });
}
// 评论一个问题
export const answerQustion = (word, qid, file) => {
    return post('/answer/add', { word, qid, file });
}
// 首次提问问题
export const ask = () => {
    return post('/gain/ask');
}
// 首次回答问题
export const answer = () => {
    return post('/gain/answer');
}
