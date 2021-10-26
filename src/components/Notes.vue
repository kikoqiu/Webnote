<template>
  <div class="fit" style="background-color:#f5f5f5; margin:0px 3px;">
    <q-list dense >
      <q-item clickable v-ripple>
          <q-item-section>
            <q-input v-model="filter" placeholder="Search All" debounce="500" @update:model-value="onSearch">
              <template v-slot:append>
                <q-btn color="primary" @click="newNote" dense icon="assignment">
                </q-btn>
              </template>
            </q-input>
          </q-item-section>
      </q-item>
      <template v-for="no in this.notes" :key="no.id">
        <q-item clickable v-ripple @click="editNote(no);this.current=no;"  :active="current?.id === no?.id" active-class="my-menu-link">
          <q-item-section>
            <q-item-label>{{no.title}}</q-item-label>
            <!--q-item-label caption>
              {{no.title}}
            </q-item-label-->
          </q-item-section>
        </q-item>      
      <q-separator spaced inset />
    </template>
    </q-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as getters from '../store/notes/getters'
import * as actions from '../store/notes/actions'
import * as types from '../store/notes/types'


const namespace = 'notes'
const { mapGetters, mapActions } = createNamespacedHelpers(namespace)



export default {
  data () {
    return {
      filter: '',
      current:null,
    }
  },
  components: {},
  methods: {
    newNote(){
      this.$store.dispatch('notes/' + types.NOTE_NEW);
    },
    editNote (note) {
      this.$store.dispatch('notes/' + types.GET_NOTE, note)
    },
    delNote (id) {
      this.$store.dispatch('notes/' + types.NOTE_REMOVE, id)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    ...mapActions(Object.keys(actions)),
    rowClass (item, type) {
      if (!item) return
      if (item.todo_completed > 0) return 'table-secondary'
    },
    onSearch(value){
      this.$store.commit('notes/NOTE_SET_QUERY', value);
      this.$store.dispatch('notes/' +'NOTE_FETCH_AUTO');
    }
  },
  computed: {
    ...mapGetters(Object.keys(getters)),
    notes () {
      return this.$store.state.notes.notes;
    },
    sortOptions () {
      // Create an options list from our fields
      return this.fieldsToSort
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }/*,
    ...mapFields('notes', {
      id: 'note.id',
      is_todo: 'note.is_todo',
      parent_id: 'note.parent_id',
      created_time: 'note.user_created_time',
      updated_time: 'note.updated_time',
      todo_completed: 'note.todo_completed',
      todo_due: 'note.todo_due',
      author: 'note.author',
      tag: 'tag.id'
    })*/
  },
  mounted () {
  }
}
</script>
<style >
.my-menu-link{
  color: white;
  background: #ccc;
}

</style>