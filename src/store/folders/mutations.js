import types from './types'

  export const FOLDER_SET_ALL=(state, folders) => {
    state.folders = folders
  };

  export const FOLDER_SET=(state, folder) => {
    state.folder = folder
  };

  export const FOLDER_APPEND=(state, folder) => {
    state.folders.push(folder)
  };

  export const FOLDER_CHANGE=(state, folder) => {
    const el = state.folders.find(t => t.id === folder.id)
    state.folders.splice(state.folders.indexOf(el), 1, folder)
  };

  export const FOLDER_REMOVE=(state, id) => {
    const el = state.folders.find(folder => folder.id === id)
    state.folders.splice(state.folders.indexOf(el), 1)
  };
