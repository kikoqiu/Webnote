import axios from 'axios';
import {sleep} from '../util'; 
export var config={
  url:null,
  token:null,
  config(other={}){
    return {
      params:{
        token:this.token,
        ...other
      }
    };
  }
}

export async function getAuthToken(URL,retries=30){
    let response= await axios.post(URL+'/auth',JSON.stringify({}))
    console.log(response.data);
    let token=response.data.auth_token;            
    for(let t=0;t<retries;++t){         
       await sleep(1000);
       response= await axios.get(URL+'/auth/check?auth_token='+token);
       console.log(response.data);
       if(response.data.status!='waiting'){
         break;
       }
    }
    if(response.data.status=='accepted'){
      return response.data.token;
    }
    return null;
 }

 export function fetchFolders () {
  return new Promise((resolve, reject) => {
    axios.get(config.url+'/folders/',config.config())
      .then((res) => { resolve(res.data.items) })
      .catch(error => { reject(error.statusText) })
  })
}

export function createFolder (folder) {
  return new Promise((resolve, reject) => {
    axios.post(config.url+'/folders/', folder,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export function updateFolder (folder) {
  return new Promise((resolve, reject) => {
    axios.put(config.url+'/folders/' + folder.id + '/', folder,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export function deleteFolder (id) {
  return new Promise((resolve, reject) => {
    axios.delete(config.url+'/folders/' + id,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}



export async function fetchapi (url,param) {
  let ret=[];
  for(let page=1;page<100;++page){
    let res=await axios.get(url,config.config({page,...param}));
    ret=ret.concat(res.data.items);
    if(!res.data.has_more)break;
  }
  return ret;
}

export async function fetchNotes (query) {
  return await fetchapi(config.url+'/notes',query);
}

export async function searchNotes (query) {
  return await fetchapi(config.url+'/search',query);
}

export async function fetchNotesByFolder (folder,query) {
  return await fetchapi(config.url+`/folders/${folder}/notes` ,query);
}





export function getNoteByID (noteid) {
  return new Promise((resolve, reject) => {
    axios.get(config.url+`/notes/${noteid}` ,config.config({
      fields:'id,parent_id,title,body,created_time,updated_time,is_conflict,latitude,longitude,altitude,author,source_url,is_todo,todo_due,todo_completed,source,source_application,application_data,order,user_created_time,user_updated_time,encryption_cipher_text,encryption_applied,markup_language,is_shared,share_id,conflict_original_id'
    }))
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export function fetchNotesByTag (tag) {
  return new Promise((resolve, reject) => {
    axios.get(config.url+`/tag/${tag}/notes`  ,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export async function createNote (note) {
  console.log(note);
  let res=await axios.post(config.url+'/notes', note, config.config());
  return res.data;
}



export async function updateNote (note) {
  console.log(note);
  let res=await axios.put(config.url+'/notes/' + note.id, note,config.config());
  return res.data;
}

export function deleteNote (id) {
  return new Promise((resolve, reject) => {
    axios.delete(config.url+'/notes/' + id,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export function fetchNoteTags (note) {
  return new Promise((resolve, reject) => {
    // this will trigger a retrieval of the tags of this note
    axios.get(config.url+'/notes/' + note.id + '/tags',config.config())
      .then((res) => { resolve(res.data.items) })
      .catch(error => { reject(error.statusText) })
  })
}




export function fetchTags () {
  return new Promise((resolve, reject) => {
    axios.get(config.url+'/tags/',config.config())
      .then((res) => { resolve(res.data.items) })
      .catch(error => { reject(error.statusText) })
  })
}

export function createTag (tag) {
  return new Promise((resolve, reject) => {
    axios.post(config.url+'/tags/', tag,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export function updateTag (tag) {
  return new Promise((resolve, reject) => {
    axios.put(config.url+'/tags/' + tag.id + '/', tag,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}

export function deleteTag (id) {
  return new Promise((resolve, reject) => {
    axios.delete(config.url+'/tags/' + id,config.config())
      .then((res) => { resolve(res.data) })
      .catch(error => { reject(error.statusText) })
  })
}
