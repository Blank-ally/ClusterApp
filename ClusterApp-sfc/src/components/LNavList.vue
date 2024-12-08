<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "LNavList",
  components: {FontAwesomeIcon},
  // data:    Data created and maintained by this component.
  //          This function is like a constructor. It gets called
  //          separately for each instance of this component
  data: function(){
    return {
      rightDrawerOpen: false,
    }
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    pages: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    },

  },

  // methods: Usually "events" triggered by v-on:
  methods: {

    toggleRightDrawer(){
      this.rightDrawerOpen = !this.rightDrawerOpen;
    }
  },

  // computed:    Values that are updated and cached if dependencies change.
  //              Computed value functions need to return a value.
  //              Treat these like regular values that you would use
  //              in data or props.
  computed: {


  }
}
</script>

<template>

  <q-header elevated >
    <q-toolbar>
      <q-toolbar-title>
        <q-btn  flat  to="/"  :list="list">  <!-- check if user is null if not display cluster collection-->
          <q-icon name="fa-solid fa-meteor grad" right size="2em"/>
          Cluster
        </q-btn>

      </q-toolbar-title>
      <q-btn dense flat round icon="fa-solid fa-user" @click="toggleRightDrawer" />
    </q-toolbar>


  </q-header>


<!--  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
        Title
      </q-toolbar-title>

      <q-btn dense flat round icon="fa-solid fa-user" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>-->

  <q-drawer  v-model="rightDrawerOpen" side="right" bordered>
    <!-- drawer content -->
    <!--  TODO: customize this  -->
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>
            Inbox
          </q-item-section>
        </q-item>

        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section>
          <q-btn @click="authuser">Profile</q-btn>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="drafts" />
          </q-item-section>

          <q-item-section>
            Drafts
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<style scoped>

</style>