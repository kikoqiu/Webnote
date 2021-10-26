
export function getTreeChildren (children) {
  const folders = children
  const myFolders = []
  for (const folder in folders) {
    const myFolder = {
      id: folders[folder].id,
      label: folders[folder].title
    }
    if (folders[folder].children !== undefined) {
      myFolder.children = getTreeChildren(folders[folder].children)
    }
    myFolders.push(myFolder)
  }
  return myFolders
}


export const getNote= (state) => state.note;
export const getNotes= (state) => state.notes;

export function getFolders2 (state, getters, rootState, rootGetters) {
  return rootGetters['folders/getFolders']
}
export function getTreeFolders (state, getters, rootState, rootGetters) {
  const folders = getters.getFolders2
  const myFolders = []
  for (const folder in folders) {
    const myFolder = {
      id: folders[folder].id,
      label: folders[folder].title
    }
    if (folders[folder].children !== undefined) {
      myFolder.children = getTreeChildren(folders[folder].children)
    }
    myFolders.push(myFolder)
  }
  return myFolders
}
export function getTags2 (state, getters, rootState, rootGetters) {
  return rootGetters['tags/getTags']
}
export function getTreeTags (state, getters, rootState, rootGetters) {
  const tags = getters.getTags2
  const myTags = []
  for (const tag in tags) {
    const myTag = {
      id: tags[tag].id,
      label: tags[tag].title
    }
    myTags.push(myTag)
  }
  return myTags
}
