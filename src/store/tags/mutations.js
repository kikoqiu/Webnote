import types from './types'

  export const TAG_SET_ALL=(state, tags) => {
    state.tags = tags
  }

  export const TAG_SET=(state, tag) => {
    state.tag = tag
  }

  export const TAG_APPEND=(state, tag) => {
    state.tags.push(tag)
  }
  export const TAG_CHANGE=(state, tag) => {
    const el = state.tags.find(t => t.id === tag.id)
    state.tags.splice(state.tags.indexOf(el), 1, tag)
  }

  export const TAG_REMOVE=(state, id) => {
    const el = state.tags.find(tag => tag.id === id)
    state.tags.splice(state.tags.indexOf(el), 1)
  }