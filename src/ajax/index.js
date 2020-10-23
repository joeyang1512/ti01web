import {
  get,
  post,
  ajax,
} from './ajax_axios';

export const getIndex = (userName, password) => {
    return get('http://localhost:8081/page/index/index.html', { userName, password } );
}

export const doLogin = (userName, password) => {
  return post('./login', { userName, password } );
}


