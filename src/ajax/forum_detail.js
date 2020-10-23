import {
    get,
    post,
    ajax,
} from './ajax_axios';

// 根据id获取此问题 详细内容
export const getDetail = (id) => {
    return get('/question/findById', {
        id: id
    });
}

// 获取该问题的评论
export const getAnswer = (id) => {
    return get('/types/findByQid', {
        qid: id
    });
}

// 点赞该问题
export const likeQes = (id) => {
    return post('/question/modify', {
        id: id
    });
}

// 获取 问题的评论
export const getComment = (id) => {
    return post('/answer/findByQid', {
        qid: id
    });
}

// add 问题的评论
export const addComment = (word, id, img) => {
    return post('/answer/add', {
        aword: word,
        qid: id,
        file: img
    });
}

// 收藏该问题
export const collectQes = (id) => {
    return post('/question/snum', {
        id: id
    });
}

// 判断当前用户是否已经点赞 该问题
export const getIsLike = (id) => {
    return get('/questionh/identify', {
        qid: id
    });
}
// 判断当前用户是否已经收藏 该问题
export const getIsCollect = (id) => {
    return post('/shoreup/identify', {
        qid: id
    });
}

// 取消点赞 该问题
export const deleteLike = (id) => {
    return post('/questionh/delete', {
        qid: id
    });
}

// 取消收藏 该问题
export const deleteCollect = (id) => {
    return post('/shoreup/delete', {
        qid: id
    });
}
