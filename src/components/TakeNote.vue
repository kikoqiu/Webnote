<template>
  <form method="post"  @submit.prevent="doNote">
    <q-dialog v-model="confirmDelete" seamless position="top">
      <q-card style="width: 350px">
        <q-linear-progress :value="1" color="pink" />
        <q-card-section class="row items-center no-wrap">
          <div>            
            <div class="text-grey">Delete this note</div>
            <div class="text-weight-bold">{{note.title}}</div>
          </div>
          <q-space />
          <q-btn flat round icon="close"   v-close-popup />
          <q-btn flat round icon="delete" @click="this.removeNote()" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>



    <div class="row">
      <q-input color="purple-12" v-model="note.title" placeholder="Title" borderless dense style='width:100%;' input-style="padding-left:5px;">
          <!--template v-slot:prepend>
            <q-btn color="secondary" labe="">
            </q-btn>
          </template-->
          <template v-slot:append>
            <q-btn color="primary" @click="this.confirmDelete=true"  icon="delete">
                </q-btn>
            <q-btn color="primary" @click="changeMode" icon='preview'>
              <q-tooltip>
                Change View
              </q-tooltip>
            </q-btn>
            <q-btn color="secondary" icon='info'>            
            <q-tooltip class="bg-gray" >
              <template>Note details</template>
              <ul>
                <li v-if="note.id">ID:{{note.id}}</li>
                <li v-if="note.parent_id">ID:{{note.parent_id}}</li>
                <li v-if="note.source_url !== ''">URL: <a v-bind:href="note.source_url" v-bind:title="note.source_url">Go to the source</a></li>
                <li v-else>URL n/a</li>
                <li>Date
                  <ul>
                    <li v-if="note.created_time > 0">Created: {{ date.formatDate(note.created_time, 'YYYY-MM-DD HH:mm:ss.SSSZ') }}</li>
                    <li v-if="note.updated_time > 0">Updated: {{ date.formatDate(note.updated_time, 'YYYY-MM-DD HH:mm:ss.SSSZ') }}</li>
                  </ul>
                </li>
                <li>Geo location
                  <ul>
                  <li>Latitude {{ note.latitude }}</li>
                  <li>Longitude {{ note.longitude }}</li>
                  <li>Altitude {{ note.altitude }}</li>
                  </ul>
                </li>
                <li>Tasks
                  <ul>
                    <li v-if="note.todo_completed > 0">Todo Completed: {{ note.todo_completed }}</li>
                    <li v-else>Todo Competed: n/a</li>
                    <li v-if="note.todo_due > 0">Todo Due: {{ note.todo_due }}</li>
                    <li v-else>Todo Due: n/a</li>
                  </ul>
                </li>
                <li>Source
                  <ul>
                    <li>Source: {{ note.source }}</li>
                    <li>Source Application: {{ note.source_application }}</li>
                    <li>ID: {{ note.id }}</li>
                  </ul>
                </li>
              </ul>
            </q-tooltip>
          </q-btn>
          <q-btn  color="primary" @click="this.tryUpdateNote()" icon='save'></q-btn>
        </template>
      </q-input>      
    </div>
    <q-separator/>
    <!--div class="form-group row">
      <div class="col-sm-2">
      <label v-if="note.is_todo==1" class="btn btn-secondary btn-sm active"><i class="fas fa-tasks"></i> Tasks ?
        <input name="is_todo" id="is_todo" v-model="note.is_todo" type="checkbox" checked autocomplete="off"/>
      </label>
      <label v-if="note.is_todo==0" class="btn btn-secondary btn-sm"><i class="fas fa-tasks"></i> Tasks ?
        <input name="is_todo" id="is_todo" v-model="note.is_todo" type="checkbox" autocomplete="on"/>
      </label>
      </div>
      <div class="col-sm-2">
        <span v-if="note.todo_due"> {{ note.todo_due }}</span>
      </div>
    </div-->

    <!--div class="form-group">
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01"><i class="fas fa-folder-open"></i> Folder</label>
          <treeselect v-model="note.parent_id"
                :multiple="false"
                :disable-branch-nodes="false"
                :options="this.getTreeFolders"
                ref="treeselect"/>
        </div>
      </div>
    </div-->
    <div class="row no-wrap justify-start items-start content-start">
      <div class="col-6 col-grow" style='overflow:auto' v-show="mode&1">
        <textarea
          v-model="note.body"
          style='height:calc( 100vh - 160px );width:100%;border:none;outline:none;resize:none;padding:10px;'
          @blur="this.tryUpdateNote()"
        ></textarea>
        
      </div>
      <div class="col-6 col-grow" style='overflow:auto' v-show="mode&2">
        <!--div id='joplin-container-styleContainer'/:srcdoc="compiledMarkdown"-->
        <div style='height:calc( 100vh - 160px );overflow-y:hidden'>
        <iframe ref='output' src="about:blank" style='width:100%;height:100%' 
          scrolling="yes" onload="/*this.height=document.getElementById('iframepage').documentElement.clientHeight;*/" 
          frameborder="0"></iframe>
        </div>
        <!--div v-html="compiledMarkdown" style='height:calc( 100vh - 160px );overflow-y:scroll'></div-->
      </div>
    </div>



    <q-select
        label="Tag"
        filled
        v-model="tags"
        use-input
        dense
        use-chips
        multiple
        input-debounce="10"
        @new-value="createNewTag"
        :options="tags_options"
      />

  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import * as getters from '../store/notes/getters'
import * as actions from '../store/notes/actions'
import * as types from '../store/notes/types'

import _ from 'lodash';
import * as api from '../store/api'

import { date } from 'quasar'



const namespace = 'notes'
const { mapGetters, mapActions, mapState } = createNamespacedHelpers(namespace)


const { MarkupToHtml } = require('../joplin-renderer');

const options = {};
// The notes are rendered using the provided theme. The supported theme properties are in `defaultNoteStyle.js`
// and this is what is used if no theme is provided. A `theme` object can be provided to override default theme
// properties.
const markupToHtml = new MarkupToHtml(options);




export default {

  data () {
    return {
      confirmDelete:false,
      updated: -1,
      folders: [],
      errors: [],
      compiledMarkdown:'',
      note:{},
      note_changed:false,
      mode:3,
      compiledCSS:'',
      date,
    }
  },
  components: {  },
  methods: {
    changeMode(){
      switch(this.mode){
        case 1:
          this.mode=2;
          break;
        case 2:
          this.mode=3;
          break;  
        case 3:
          this.mode=1;
          break;
      }
    },
    /*doNote (e) {
      this.errors = []

      if (this.note.parent_id === undefined) {
        this.errors.push('folder required.')
      }
      if (this.note.body === '' && this.note.title === '') {
        this.errors.push('You need the fill the title or the body.')
      }

      if (!this.errors.length) {
        if (this.note.id === undefined || this.note.id === 0) {
          this.addNote()
        } else {
          this.tryUpdateNote()
        }
        return true
      }

      e.preventDefault()
    },*/
    createNewTag(){

    },
    /* update the note */
    tryUpdateNote (note=null) {
      if(note==null){
        note=this.note;
      }
      if(!this.note_changed)return;
      this.note_changed=false;
      console.log('tryUpdateNote');
      
      // payload
      const payload = {
        id: note.id,
        title: note.title,
        body: note.body,
        parent_id: note.parent_id,
        tag: note.tag,
        is_todo: (note.is_todo ? 1 : 0)
      }
      if(!note.title && !note.body){
        console.log('empty note to update');
        return;
      }
      // push the data
      this.$store.dispatch('notes/' + types.NOTE_CHANGE, payload)
        .then((res) => {
          //note.updated = 1
        })
        // eslint-disable-next-line
        .catch((error) => {
          //this.note.updated = 0
        });
    },
    /* delete action pressed */
    removeNote () {
      this.$store.dispatch('notes/' + types.NOTE_REMOVE, this.note.id)
    },
    ...mapActions(Object.keys(actions)),
    updateImage (html) {
      const re = /<img(.*)src=":\/(.*?)"(.*?)>/g;
      const replaceIt = '<img$1src="' + api.config.url +'/resources/$2/file?token='+api.config.token  + '"$3>';
      //console.log(re.exec(html));
      return html = html.replace(re, replaceIt);
    },
    render:_.debounce(async function(){   
      const theme = {};
      const result = await markupToHtml.render(MarkupToHtml.MARKUP_LANGUAGE_MARKDOWN, this.markdown, theme, options);

      //console.info('Plugin assets:', result.pluginAssets);
      let css=loadPluginAssets(result.pluginAssets);
      //console.log(css);
      let html=this.updateImage(result.html);
      //console.log(html);
      this.compiledCSS=css;
      this.compiledMarkdown= html;      
      
      function loadPluginAssets(assets) {
        //document.getElementById('joplin-container-styleContainer').innerHTML='';
        let ret='';
        for (let i = 0; i < assets.length; i++) {
          const asset = assets[i];

          if (asset.mime === 'text/css') {
            /*const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/' + asset.name;
            document.getElementById('joplin-container-styleContainer').appendChild(link);*/            
            ret+=`<link href="assets/${asset.name}" rel="stylesheet" type="text/css">`;
          }
        }
        return ret;
      }
    },300,{leading:true,maxWait:2000}),
  },
  watch:{
    async markdown(newVal,oldVal){   
      this.render();
    },
    selected_note(newVal,oldVal){
      if(this.note_changed){
        this.tryUpdateNote();
      }      
      this.note=_.cloneDeep(newVal);
      this.$nextTick(function(){
        this.note_changed=false;
      });
    },
    note:{
      handler(newVal,oldVal){
        this.note_changed=true;
      },
      deep:true
    },
    compiledMarkdown(newVal){     
      this.$refs.output.contentWindow.document.getElementById('content').innerHTML = newVal;
    },
    compiledCSS(newVal){
      this.$refs.output.contentWindow.document.getElementById('css').innerHTML = newVal;
    }
  },
  // load the data of the store into the form for each input
  computed: {
    selected_note(){
      return this.$store.state.notes.note;
    },
    markdown(){
      let body = ''
      if (this.note.body !== undefined) {
        body = this.note.body
      }
      return body;   
    },
    // default mode    
    ...mapGetters(Object.keys(getters)),
    tags: {
      get () {
        return this.$store.state.notes.tag.map(t=>t.title);
      },
      set () {
      }
    },
    tags_options(){
      return this.$store.state.tags.tags.map(t=>t.title);
    }
  },
  mounted () {
    this.$refs.output.contentWindow.document.body.innerHTML = `<div id='css'></div><div id='content'></div>`;
  }
}
</script>

<style scoped>
		/*::-webkit-scrollbar {
      width: 10px; 
      height: 2px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #2e75d3;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }*/

    ::-webkit-scrollbar {
			width: 7px;
			height: 7px;
		}
		::-webkit-scrollbar-corner {
			background: none;
		}
		::-webkit-scrollbar-track {
			border: none;
		}
		::-webkit-scrollbar-thumb {
			background: rgba(100, 100, 100, 0.3); 
			border-radius: 5px;
		}
		::-webkit-scrollbar-track:hover {
			background: rgba(0, 0, 0, 0.1); 
		}
		::-webkit-scrollbar-thumb:hover {
			background: rgba(100, 100, 100, 0.7); 
		}

</style>
