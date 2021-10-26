import * as tagsApi from '../api'
import types from './types'

  export const TAG_FETCH_ALL=async ({ commit }) => {
    commit(types.TAG_SET_ALL, await tagsApi.fetchTags())
  }

  export const TAG_FETCH=async ({ commit }, tag) => {
    commit(types.TAG_SET, tag)
  }

  export const TAG_CREATE=async ({ commit }, tag) => {
    commit(types.TAG_APPEND, await tagsApi.createTag(tag))
  }

  export const TAG_DELETE=async ({ commit }, id) => {
    await tagsApi.deleteTag(id)
    commit(types.TAG_REMOVE, id)
  }