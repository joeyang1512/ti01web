import axios from 'axios';
import { ajaxDebugger } from '~/util/debug';
import message from 'antd/lib/message';
import { host } from './config';

/**
 * 用来生成一个不重复的自增值
 */
const getAjaxId = (function () {
  let id = 0;
  return () => id++;
})() 

/**
 * 
 * @param {'get' | 'post'} method 
 * @param { string } url 
 * @param { any } data 
 * @param errMsg 
 */
function ajax(method, url, params, errMsg = '网络或服务器异常，请重试') {
  return new Promise((reslove, reject) => {
    let ajaxParams = {};
    let ajaxMethod = {};
    if (method === 'get') {
      ajaxMethod = axios[method];
      ajaxParams = { params };
    } else if (method === 'post') {
      ajaxMethod = axios[method];
      ajaxParams = params;
    } else {
      // 不支持的请求
      ajaxDebugger('不支持的请求');
      return;
    }
    const ajaxId = getAjaxId();
    ajaxDebugger('', `${method}(${ajaxId}) 发送请求`, url);
    console.log(ajaxParams);
    console.log(url);
    ajaxMethod(url, ajaxParams).then((res) => {
      const body = res.data;
      const { code, data, errMsg } = body;
      ajaxDebugger('', `${method}(${ajaxId}) 得到相应`, url, code, body);
      if (isGlobalErrCode(code)) {
        ajaxDebugger('glob err ajax');
        // 全局异常 直接处理了 reject
        message.error(errMsg);
        reslove(body);
      } else {
        // 请求成功或者局部异常 交给业务处理 reslove
        reslove(body);
      }
    }, (err) => {
      // 网络异常 or 服务器挂
      ajaxDebugger('', `${method}(${ajaxId}) 挂了`, url);
      ajaxDebugger(err);
      message.error(errMsg);
      reject(err);
    });
  });
}

/**
 * 判断是不是全局错误码
 * @param {*} code 
 */
function isGlobalErrCode(code) {
  // TODO 这里还需要补全一下
  return (code == 11 ) ? true : false;
}
export { ajax };
export const get = (url, params, errMsg) => {
  return ajax('get', url, params, errMsg)
};

export const post = (url, data, errMsg) => {
  return ajax('post', url, data, errMsg)
};
