export function getFolders(state) {
    return state.folders;
}

export function getFolderById(state, getters) {
    return (parentId) => getters.getFolders.filter(folder => folder.parent_id === parentId);
}