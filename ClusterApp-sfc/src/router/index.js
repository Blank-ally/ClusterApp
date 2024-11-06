import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cluster from '../views/Cluster.vue'
import NewCluster from '../views/NewCluster.vue'
import EditCluster from '../views/EditCluster.vue'
import NewStar from '../views/NewStar.vue'
import EditStar from '../views/EditStar.vue'
import ClusterList from "@/components/ClusterList.vue";
import app from "@/App.vue";
const foo = {template :'<div>foo</div>'}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
     // props: {ClusterList }

    },
    {
      path: '/Cluster',
      name: 'Cluster',
      component: Cluster
    },
    {
      path: '/NewCluster',
      name: 'NewCluster',
      component: NewCluster
    },
    {
      path: '/EditCluster',
      name: 'EditCluster',
      component: EditCluster
    },
    {
      path: '/NewStar',
      name: 'NewStar',
      component: NewStar
    },
    {
      path: '/EditStar',
      name: 'EditStar',
      component: EditStar
    },
   {
      path:'/foo',
      component:foo
    }

 /*   {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Cluster.vue')
    }*/
  ]
})

export default router
