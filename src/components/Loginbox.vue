<template>
  <q-dialog
          v-model="this.$store.state.auth.show_login"
          persistent
          :maximized="true"
          transition-show=""
          transition-hide="slide-down"
        >
    <div class="q-pa-md" style="background-color:white;">
      <div class="row justify-center" style='height:60vh;margin-top:200px;'>
        <div style="width:100%;max-width:500px;">
          <q-card class="my-card">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Web Note</div>
              <div class="text-subtitle2">Please set login info</div>
            </q-card-section>

            <q-separator />

            <q-form
            class="q-gutter-md q-pa-md"
          >
            <q-input filled bottom-slots v-model="URL" label="URL" counter maxlength="200"  :rules="[ val => val && val.length > 0 || 'Please type something']">
            </q-input>

            <q-input filled bottom-slots v-model="token" label="Token" counter maxlength="50" :rules="[ val => val && val.length > 0 || 'Please type something']">

            </q-input>
          </q-form>

            <q-card-actions align="right">
              <q-btn flat @click="auth">Query Token</q-btn>
              <q-btn flat @click="save">Save</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    
  </q-dialog>
</template>

<script>
import { defineComponent, ref} from 'vue'

const URL=ref('');
const token=ref('');
import * as api from '../store/api';

export default defineComponent({
  name: 'loginbox',
  props: {
    title: {
      type: String,
      required: false
    }
  },
  setup(){
    return {URL,token};
  },
  methods:{
    async auth(){
       this.token=await api.getAuthToken(this.URL);
    },
    async save(){
      this.$store.commit('auth/setAuth',{url:this.URL,token:this.token});
      this.$store.dispatch('folders/' + 'FOLDER_FETCH_ALL');
      this.$store.dispatch('tags/' + 'TAG_FETCH_ALL');
    }
  },
  beforeMount(){
    this.URL=this.$store.state.auth.url??'http://localhost:41184';
    this.token=this.$store.state.auth.token??"";
  }
})
</script>
