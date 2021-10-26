<template>
  <b-list-group>
    <b-list-group-item class="d-flex justify-content-between align-items-center"
       v-for="tag in this.getTags"
       :key="tag.id">
      <b-link :to="{ name: 'myTag', params: { id: tag.title } }"
          replace
          v-slot="{ href }">
        <a :href="href" @click="notesByTag(tag)">{{ tag.title }}</a>&nbsp;
        <b-badge pill varian='primary'>{{ tag.nb_notes }}</b-badge>
      </b-link>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import getters from '../getters'
import actions from '../actions'
import types from '../types'
import typesNote from '../../notes/types'
import typesFolder from '../../folders/types'

const namespace = 'tags'
const { mapGetters, mapActions } = createNamespacedHelpers(namespace)

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(Object.keys(actions)),
    notesByTag (tag) {
      this.$store.dispatch('folders/' + typesFolder.FOLDER_FETCH, {})
      this.$store.dispatch('tags/' + types.TAG_FETCH, tag)
      this.$store.dispatch('notes/' + typesNote.NOTE_FETCH_TAG, tag)
    }
  },
  computed: {
    ...mapGetters(Object.keys(getters))
  },
  created () {
    this.$store.dispatch('tags/' + types.TAG_FETCH_ALL)
  }
}
</script>
