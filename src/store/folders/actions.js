import * as foldersApi from '../api'
import types from './types'

export async function   FOLDER_FETCH_ALL ({ commit })  {
  commit(types.FOLDER_SET_ALL, await foldersApi.fetchFolders());
};

  export async function FOLDER_FETCH({ commit }, folder) {
  commit(types.FOLDER_SET, folder);
}

  export async function FOLDER_CREATE({ commit }, folder) {
  commit(types.FOLDER_APPEND, await foldersApi.createFolder(folder));
}

  export async function FOLDER_DELETE({ commit }, id) {
  await foldersApi.deleteFolder(id);
  commit(types.FOLDER_REMOVE, id);
}