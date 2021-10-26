import * as api from '../api';
export async function getAuthToken ( context,url ) {
    let token=await api.getAuthToken(url);
    if(token!=null){
        context.commit('setAuth',{url,token});
    }
    
}
