<template>
<div>
  <q-tree
    :nodes="rootfolders"
    node-key="id"
    label-key="title"
    no-connectors
    dark
    selected-color="black"
    v-model:selected="selection"
  />
  <!--q-list dark>
    <q-item-label header>Notebooks</q-item-label>
    <q-item clickable v-ripple 
      v-for="folder in folders"
     :key="folder.id"
     :active="selection === folder.id"
     @click="this.selection = folder.id;notesByFolder(folder)"
     active-class="my-menu-link"
     >
      <q-item-section avatar>
        <q-icon color="gray" name="folder" />
      </q-item-section>

      <q-item-section :style="{'padding-left':folder.pad+'px'}">
        {{ folder.title }}
      </q-item-section>
    </q-item>
  </q-list-->
</div>
</template>

<script>
import { ref } from 'vue'
import { createNamespacedHelpers } from 'vuex'

//import Folder from './Folder'

import * as getters from '../store/folders/getters'
import * as actions from '../store/folders/actions'
import _ from 'lodash';

const namespace = 'folders'
const { mapGetters, mapActions } = createNamespacedHelpers(namespace)

export default {
  data () {
    return {
      selection: null,
      root:{title:"All Notes",id:0,parent_id:-1},
    }
  },
  components: {  },
  methods: {
    notesByFolder (folder) {      
      if(folder?.id){
        this.$store.dispatch('folders/' + 'FOLDER_FETCH', folder)        
        this.$store.dispatch('notes/' +'NOTE_FETCH_FOLDER', folder)
      }else{
        this.$store.commit('folders/FOLDER_SET', null);
        this.$store.dispatch('notes/' +'NOTE_FETCH_AUTO')
      }
    },
    ...mapActions(Object.keys(actions))
  },
  watch:{
    selection(newval, oldval){
      console.log(oldval,newval);
      if(newval==0){
        this.notesByFolder(this.root);
        return;        
      }
      for(let i of this.getFolders){
        if(i.id==newval){
          this.notesByFolder(i);
          break;
        }
      }
    }
  },
  computed: {
    ...mapGetters(Object.keys(getters)),
    rootfolders(){
      let fs= _.cloneDeep(this.getFolders);
      let map={};
      const root=this.root;
      fs.push(root);
      for(let f of fs){
          map[f.id]=f;
          if(!f.parent_id){
            f.parent_id=0;
          }
          f.children=[];
      }
      for(let f of fs){
          let p=map[f.parent_id];
          if(!p)continue;
          if(!p.children)p.children=[];
          p.children.push(f);
      }
      for(let f of fs){
          if(f.children){
            f.children.sort((a,b)=>a.title.localeCompare(b.title));
          }
      }
      console.log(root);
      let children=root.children;
      root.children=null;
      return [root,...children];
    },
    folders(){
      function trav(root,level,ret){
        ret.push(root);
        root.pad=20*level;
        if(root.pad<=0)root.pad=0;
        if(root.children){
          for(let i of root.children){
            trav(i,level+1,ret);
          }
        }
      }
      let ret=[];
      for(let i in this.rootfolders){
        trav(this.rootfolders,-1,ret);
      }
      return ret;
    }
  },
  created () {
    this.$store.dispatch('folders/' + 'FOLDER_FETCH_ALL');
    this.$store.dispatch('tags/' + 'TAG_FETCH_ALL');
  },
  beforeMount(){
  },
  mounted(){
    if(this.folders.length>0){
      this.notesByFolder(this.folders[0]);
    }    
  }
}
</script>
