import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClusterView from '../views/ClusterView.vue'
import NewClusterView from '../views/NewClusterView.vue'
import EditClusterView from '../views/EditClusterView.vue'
import NewStarView from '../views/NewStarView.vue'
import EditStarView from '../views/EditStarView.vue'
import ClusterCollectionView from "@/views/ClusterCollectionsView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ProfileView from "@/views/ProfileView.vue";
import settingsView from "@/views/SettingsView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,


    },
    {
      path: '/ClusterCollection',
      name: 'ClusterCollection',
      component: ClusterCollectionView,


    },
    {
      path: '/Cluster/:clusterId',
      name: 'Cluster',
      component: ClusterView,
      props:true

    },
    {
      path: '/NewCluster',
      name: 'NewCluster',
      component: NewClusterView
    },
    {
      path: '/EditCluster/:clusterId',
      name: 'EditCluster',
      component: EditClusterView,
      props:true
    },
    {
      path: '/Cluster/:clusterId/NewStar',
      name: 'NewStar',
      component: NewStarView,
      props:true
    },
    {
      path: '/Cluster/:clusterId/star/:starId/EditStar',
      name: 'EditStar',
      component: EditStarView,
      props:true

    },
    {
      path: '/Error',
      name: 'Error',
      component: ErrorView,
    },
/*    {
      path: '/Profile',
      name: 'Profile',
      component: ProfileView,
      props:true

    },*/
    {
      path: '/Settings',
      name: 'Settings',
      component: settingsView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFoundView,
    },


 /*   {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClusterView.vue')
    }*/
  ]
})

export default router
