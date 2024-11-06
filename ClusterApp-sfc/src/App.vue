<script >

import Clust from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js";
import Classification from "@/components/models/Classification.js";
import LNavList from "@/components/LNavList.vue"
import _ from "lodash"
import ClassificationList from "@/components/ClassificationList.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ClusterList from "@/components/ClusterList.vue";
import ClusterItem from "@/components/ClusterItem.vue";
import {RouterLink,RouterView} from "vue-router";

// data: all the data for the Cluster, must return an object
 export default{ components: {
     ClusterList,
     FontAwesomeIcon,
     ClassificationList,
     LNavList

   },
    data: function() {
    return {
      NewStar:new Star(),
      editStar: new Star(),
      newCluster: new Clust(),
      editCluster:new Clust (),
      classification:new Classification(),
      CLusterList: [
        new Clust('MilkyWay', 'testing something real quick ' ,true,true,[ "Rare", "common","supernova"], 'cards',[{name:'Absolutno',photo: "pexels-pixabay-41951.jpg",classi:'common',notes:"lorem ipsum"},
          {name:'star2',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star3',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star4',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" }],false ),
        new Clust('MilkyWay', 'testing something real quick ' ,true,true,[ "Rare", "common",  "supernova" ], 'cards',[{name:'Absolutno',photo: "pexels-pixabay-41951.jpg",classi:'common',notes:"lorem ipsum"},
          {name:'star2',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star3',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star4',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" }],false ),

        new Clust('MilkyWay', 'testing something real quick ' ,true,true,["Rare", "common", "supernova"], 'cards',[{name:'Absolutno',photo: "pexels-pixabay-41951.jpg",classi:'common',notes:"lorem ipsum"},
          {name:'star2',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star3',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star4',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" }],false ),

        new Clust('MilkyWay', 'testing something real quick ' ,true,true,["Rare", "common","supernova"], 'cards',[{name:'Absolutno',photo: "pexels-pixabay-41951.jpg",classi:'common',notes:"lorem ipsum"},
          {name:'star2',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star3',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" },
          {name:'star4',photo: "pexels-pixabay-41951.jpg",Classi:'common',notes:"lorem ipsum" }],false ),

      ],

      currentCluster:{
        type: Clust,
        required: true
      },
      currentStar:{
        type: Star,
        required:true
      },
      clusterTypes: [
        'Figurine',
        'Food',
        'cards'

      ],

      pages:[
        {name:'Clusters', href:'Clusters.vue'}
      ],
      rightDrawerOpen: false,
      confirm: false,

    }
  },

  // methods: usually "events" triggered by v-on:
  methods: {

    addNewStar() {
      debugger;
      let clus =  this.CLusterList.find( e=> e.name === this.currentCluster.name)
      let ind = this.CLusterList.indexOf(clus)
      this.currentCluster.Stars.push(this.NewStar)
      this.CLusterList[ind] = this.currentCluster
      // clear the form
      //todo: refactor to accept multiple aruguments for cluster
      this.NewStar = new Star()
      window.location.href = 'Cluster.html'
    },
    addNewCluster() {
      debugger
      this.CLusterList.push(this.newCluster);
      // clear the form
      this.currentCluster = this.newCluster

      this.newCluster = new Clust()

      window.location.href = 'NewStar.html'
    },
    addClassification(name) {
      debugger;

      if (name.trim() !== '') {
        this.classification.name = name
        this.newCluster.classifications.push(this.classification);
        this.classification = new Classification();
      }

    },
    addEditClassification(name) {
      debugger;
      if (name.trim() !== '') {
        this.classification.name = name
        this.editCluster.classifications.push(this.classification)
        this.classification = {name: ''}
      }
    },
    deleteCluster(item) {
      // TODO: confirm with user first!
      this.CLusterList.splice(this.CLusterList.indexOf(item), 1);
      window.location.href = 'Clusters.html'


    },
    deleteStar(item){
      debugger
      // TODO: confirm with user first!
      let clus =  this.CLusterList.find( e=> e.name === this.currentCluster.name)
      let ind = this.CLusterList.indexOf(clus)
      this.CLusterList[ind].Stars.splice(this.currentCluster.Stars.indexOf(item), 1);
      this.currentCluster =  this.CLusterList[ind]
      window.location.href = 'Cluster.html'



    },
    /* deleteClassi(item){
         debugger
         this.newCluster.classifications.splice(this.newCluster.classifications.indexOf(item),1)
     },*/
    editCurrentCluster() {

      debugger

      let clus =  this.CLusterList.find( e=> e.name === this.currentCluster.name)
      let ind = this.CLusterList.indexOf(clus)

      this.CLusterList[ind].name = this.editCluster.name
      this.CLusterList[ind].public = this.editCluster.public
      this.CLusterList[ind].favorite = this.editCluster.favorite
      this.CLusterList[ind].purchased = this.editCluster.purchased
      this.CLusterList[ind].Complete = this.editCluster.Complete
      this.CLusterList[ind].classifications = this.editCluster.classifications
      this.CLusterList[ind].type = this.editCluster.type

      this.CLusterList[ind].Stars.forEach(s => s.Cluster = this.editCluster.name)

      //this.CLusterList[this.CLusterList.indexOf(this.currentCluster )].Cluster = item
      this.currentCluster =  this.CLusterList[ind]
      window.location.href = 'Cluster.html';

    },
    setEditCluster() {
      debugger
      this.editCluster = this.currentCluster
      window.location.href = 'EditCluster.html'


    }/*,
        setEditStar() {
            debugger
            console.log(this.currentCluster)
            this.editStar = this.currentStar
            console.log(this.currentCluster)
            window.location.href = 'EditStar.html'


        }*/,
    editCurrentStar(item){
      debugger
      // TODO: confirm with user first!
     let clus =  this.CLusterList.find( e=> e.name === this.currentCluster.name)
     let ind = this.CLusterList.indexOf(clus)
     let star = this.CLusterList[ind].Stars.find(e => e.name === this.currentStar.name)
     let sind = this.CLusterList[ind].Stars.indexOf(star)
      this.CLusterList[ind].Stars[sind].name = this.editStar.name
      this.CLusterList[ind].Stars[sind].photo = this.editStar.photo
      this.CLusterList[ind].Stars[sind].qty = this.editStar.qty
      this.CLusterList[ind].Stars[sind].Classi = this.editStar.Classi
      this.CLusterList[ind].Stars[sind].notes = this.editStar.notes
      this.CLusterList[ind].Stars[sind].Trade = this.editStar.Trade
      this.CLusterList[ind].Stars[sind].Cluster = this.editStar.Cluster



      this.currentCluster =  this.CLusterList[ind]
      window.location.href = 'Cluster.html';




    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    }
  },

  // computed: values that are updated and cached if dependencies change
  computed: {
    StarList(){
      return this.StarList().filter(function (item){
        return item.Cluster = 'MilkyWay' // retrun the search results
      })

    }

  },

  //mounted:  called after the instance has been mounted,
  mounted: function () {
// this could also be done in the crated block as well

    if(localStorage.getItem('currentCluster')){
      this.currentCluster = JSON.parse(localStorage.getItem('currentCluster'))
    }
    if(localStorage.getItem('currentStar')){
      this.currentStar = JSON.parse(localStorage.getItem('currentStar'))
    }
    if(localStorage.getItem('CLusterList')){
      this.CLusterList = JSON.parse(localStorage.getItem('CLusterList'))
    }
    /*   if(localStorage.getItem('newCluster')){
            this.newCluster = JSON.parse(localStorage.getItem('newCluster'))
        }*/
    if(localStorage.getItem('editCluster')){
      this.editCluster = JSON.parse(localStorage.getItem('editCluster'))
    }
    if(localStorage.getItem('editStar')){
      this.editStar = JSON.parse(localStorage.getItem('editStar'))
    }
  },

  // watch:   calls the function if the value changes
  // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
  watch: {
    currentCluster:{
      //this.shoppingList // = old list before the list is updated
      handler(){
        localStorage.setItem('currentCluster',JSON.stringify(this.currentCluster))
      },
      deep: true,
    },
    currentStar:{
      //this.shoppingList // = old list before the list is updated
      handler(){
        localStorage.setItem('currentStar',JSON.stringify(this.currentStar))
      },
      deep: true,

    },
    CLusterList:{
      //this.shoppingList // = old list before the list is updated
      handler(newList){
        localStorage.setItem('CLusterList',JSON.stringify(this.CLusterList))
      },
      deep: true,

    },
    /* newCluster:{
         //this.shoppingList // = old list before the list is updated
         handler(newList){
             localStorage.setItem('newCluster',JSON.stringify(this.newCluster))
         },
         deep: true,

     },*/
    editCluster:{
      //this.shoppingList // = old list before the list is updated
      handler(newList){
        localStorage.setItem('editCluster',JSON.stringify(this.editCluster))
      },
      deep: true,

    },
    editStar:{
      //this.shoppingList // = old list before the list is updated
      handler(newList){
        localStorage.setItem('editStar',JSON.stringify(this.editStar))
      },
      deep: true,

    }

  }
}
</script>

<template>
  <div>


    <q-layout view="hHh lpR fFf">
    <l-nav-list :pages="pages"></l-nav-list>
      <q-page-container>


<!--      <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
        &lt;!&ndash; drawer content &ndash;&gt;
      </q-drawer>-->


        <div class="row justify-center">
          <div class="col-6 text-center text-h3 q-pa-lg">
            Clusters
          </div>
        </div>

        <div class="row q-col-gutter-lg self-center">
          <div class="col-4">
            <div class=" q-px-lg">

              <q-btn flat color="primary"  href="/views/NewCluster.vue">
                <q-icon left size="1em">
<!--                  <font-awesome-icon :icon="['fas', 'circle-plus']"> <RouterLink to="/NewCluster"></RouterLink></font-awesome-icon>
               --> </q-icon>
                New Cluster
              </q-btn>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-lg self-center justify-center">
          <div class="col-8">
            <cluster-list :list="CLusterList"></cluster-list>
          </div>
        </div>
      </q-page-container>

    </q-layout>

  </div>
</template>

<style scoped>

</style>

