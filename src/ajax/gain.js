import {
  get,
  post,
  ajax,
} from './ajax_axios';
  
  
export const doLogin = (userName, password) => {
  return post('./login', { userName, password } );
}
  