import types from './types'


export const NOTE_SET_QUERY=(state, query) => {
  state.param.query = query;
}

export const NOTE_SET_ALL=(state, notes) => {
  state.notes = notes
}

export const NOTE_SET=(state, note) => {
  state.note = note
}

export const NOTETAG_SET=(state, tag) => {
  state.tag = tag
}

export const NOTE_APPEND=(state, note) => {
  state.notes.push(note)
}

export const NOTE_CHANGE=(state, note) => {
  const el = state.notes.find(t => t.id === note.id);
  const pos=state.notes.indexOf(el);
  console.log(`find note ${el?.id} as pos ${pos}`);
  if(pos==-1){
    state.notes.splice(0, 0, note)
  }else{
    state.notes.splice(pos, 1, note)
  }
}

export const NOTE_REMOVE=(state, id) => {
  const el = state.notes.find(note => note.id === id)
  state.notes.splice(state.notes.indexOf(el), 1)
  state.note = {
    id: 0,
    title: '',
    body: '',
    parent: {
      id: 0,
      parent_id: 0
    },
    parent_id: undefined,
    is_todo: 0
  }
}