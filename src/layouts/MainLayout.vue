<template>
  <q-layout view="hHh LpR fFf">  
    <loginbox></loginbox>
    <q-header reveal elevated class="bg-white text-black" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Web Note
        </q-toolbar-title>      

        <q-btn flat label="Auth" @click='this.$store.commit("auth/showlogin",true)'  />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <!--<q-tabs align="left" @update1:model-value1="1" shrink>
        <q-route-tab to="/indicators1" label="机构"  name="indicators1"/>
      </q-tabs>-->
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered class='bg-blue-grey-9 text-white'  :width="300">
      <folders></folders>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page :style-fn='stylefn'>
        <div class='fit row no-wrap justify-start items-start content-start'>
            <notes style="overflow: auto; min-width: 300px; max-width: 300px;"/>
            <div style="overflow: auto; width:calc( 100% - 300px )"><take-note /></div>            
        </div>
      </q-page>
    </q-page-container>

    <q-footer v-model="footerShow" reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import loginbox from '../components/Loginbox.vue'
import Folders from '../components/Folders.vue'
import TakeNote from '../components/TakeNote.vue'
import Notes from '../components/Notes.vue'
export default {
  components: { loginbox, Folders,TakeNote, Notes},
  setup (){
    const leftDrawerOpen = ref(true)
    const rightDrawerOpen = ref(false)
    const footerShow=ref(false);
    
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      footerShow,
      stylefn (offset,height) {
        // "offset" is a Number (pixels) that refers to the total
        // height of header + footer that occupies on screen,
        // based on the QLayout "view" prop configuration

        // this is actually what the default style-fn does in Quasar
        //return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
      },
    }
  },
      computed:{
      },
      methods:{
      }
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #ccc
</style>