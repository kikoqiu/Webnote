import * as api from '../api';
export function setAuth (state,{url,token}) {
    state.url=url;
    state.token=token;
    state.show_login=false;

    api.config.url=url;
    api.config.token=token;
    localStorage.setItem('url',url);
    localStorage.setItem('token',token);
    
}

export function showlogin (state,val) {
    state.show_login=val;
    
}
