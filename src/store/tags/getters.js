

  export const getTags= (state) => state.tags;

  export const getTagById= (state, getters) => (id) => getters.getTags.filter(tag => tag.id === id);
