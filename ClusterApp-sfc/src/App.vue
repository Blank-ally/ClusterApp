<script >

import Clust from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js";
import Classification from "@/components/models/Classification.js";
import LNavList from "@/components/LNavList.vue"
import _ from "lodash"
import ClassificationList from "@/components/ClassificationList.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ClusterList from "@/components/ClusterList.vue";
import User from '@/components/models/User.js'

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
      authUser: new User(),

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
      //window.location.href = 'Cluster.html';

    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    }
  },

  // computed: values that are updated and cached if dependencies change
  computed: {


     

  },

  //mounted:  called after the instance has been mounted,
  mounted: function () {
// this could also be done in the crated block as well

  },


}
</script>

<template>
  <div>


    <q-layout view="hHh lpR fFf">
    <l-nav-list :pages="pages" :list="CLusterList"></l-nav-list>
      <q-page-container>
        <router-view :list="CLusterList" :currentCluster="currentCluster" :currentStar="currentStar" :auth-user="authUser"></router-view>

      </q-page-container>


    </q-layout>

  </div>
</template>

<style scoped>

</style>

