import { get, post } from './ajax_axios';
// 根据图片搜索题目
export const getByFile = ( file) => {
    return post('/topic/findByFile', { file });
}
