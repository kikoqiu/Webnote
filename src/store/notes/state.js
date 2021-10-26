export default function () {
  return {
    note: {
      id: 0,
      title: '',
      body: '',
      parent: {
        id: 0,
        parent_id: 0
      },
      parent_id: undefined,
      is_todo: 0,
      todo_due: 0,
      todo_completed: 0,
      created_time: 0,
      updated_time: 0,
      source_url: '',
      author: '',
      latitude: 0,
      longitude: 0,
      altitude: 0,
      source: '',
      source_application: ''
    },
    tag: [],
    notes: [],
    param:{query:'',order_by:'updated_time',order_dir:'DESC'}
  }
}
