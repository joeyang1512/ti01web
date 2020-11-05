import { get, post } from './ajax_axios';

export const getTopicsNum = () => {
    return get('/topic/findNumByLesson')
}