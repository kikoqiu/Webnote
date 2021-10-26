import * as notesApi from '../api'
import types from './types'

export async function NOTE_NEW({ commit,rootState }) {
  const payload = {
    title: '',
    body: '',
    parent_id: rootState.folders.folder?.id,
    is_todo: 0,
    tag: null,
  };
  commit(types.NOTE_SET,payload);
}

  export const NOTE_FETCH_PAGE=async ({ commit }, notes) => {
    commit(types.NOTE_SET_ALL, notes)
  };

export async function NOTE_FETCH_AUTO(context) {
  //console.log(context);
  let { commit, state, rootState,dispatch }=context;
  if(state.param.query){
    await commit(types.NOTE_SET_ALL, await notesApi.searchNotes(state.param));      
  }else if (rootState.folders.folder) {
    await dispatch('NOTE_FETCH_FOLDER', rootState.folders.folder);
  } else {
    await dispatch('NOTE_FETCH_ALL');
  }
}

  export const NOTE_FETCH_ALL=async ({ commit,state }) => {
    commit(types.NOTE_SET_ALL, await notesApi.fetchNotes(state.param))
  };

  export const NOTE_FETCH_TAG=async ({ commit,state }, tag) => {
    commit(types.NOTE_SET_ALL, await notesApi.fetchNotesByTag(tag.id,state.param))
  };

  export const NOTE_FETCH_FOLDER=async ({ commit,state }, folder) => {
    commit(types.NOTE_SET_ALL, await notesApi.fetchNotesByFolder(folder.id,state.param))
  };


  export const GET_NOTE=async ({ commit,dispatch }, note) => {
    commit(types.NOTE_SET, await notesApi.getNoteByID(note.id))
    await dispatch('NOTETAG_SET', note);
  };

  export const NOTE_CREATE=async ({ commit }, note) => {
    await notesApi.createNote(note)
    commit(types.NOTE_APPEND, note)
  };

  export const NOTE_CHANGE=async ({ commit }, note) => {
    if(note.id){
      await notesApi.updateNote(note)
    }else{
      await notesApi.createNote(note)
    }
    commit(types.NOTE_CHANGE, note)
  };

  export const NOTE_REMOVE=async ({ commit }, id) => {
    await notesApi.deleteNote(id)
    commit(types.NOTE_REMOVE, id)
  };

  export const NOTETAG_SET=async ({ commit }, note) => {
    commit(types.NOTETAG_SET, await notesApi.fetchNoteTags(note))
  }