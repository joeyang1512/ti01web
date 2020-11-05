import { get, post } from './ajax_axios';

export const getTopicsNum = (params) => {
    return get('/topic/findByLesson')
}