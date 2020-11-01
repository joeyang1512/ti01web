import { post } from './ajax_axios.js';
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

