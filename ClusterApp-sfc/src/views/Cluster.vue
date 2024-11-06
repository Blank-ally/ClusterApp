<template><!--  <q-layout view="hHh lpR fFf">

    <l-nav-list :pages="pages"></l-nav-list>

    <q-page-container>

      <div class="row justify-center ">
        <div class="col-6  justify-center text-h3">
          <div class="q-pa-xl">
            <q-card class="header-card text-center">
              <q-card-section>
                <div class="text-h2 q-pa-sm">{{ currentCluster.name }}</div>
                <div class="text-h5">created: {{currentCluster.creationDate}}</div>
              </q-card-section>

              <q-card-actions align="around">
                <q-btn padding="lg xl" flat @click="setEditCluster" class="p-4">
                  <q-icon left >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </q-icon>
                </q-btn>
                <q-btn  padding="lg xl" flat  @click="confirm = true">
                  <q-icon>
                    <i class="fa-solid fa-trash"></i>
                  </q-icon>
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>


      <div class="row q-col-gutter-lg self-center">
        <div class="col-5">
          <div class=" q-pa-lg">
            <q-btn flat color="primary"  href="NewStar.html">
              <q-icon left size="1em">
                <i class="fa-solid fa-circle-plus fa-2x" ></i> </q-icon>
              New Star
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-lg self-center">

      </div>
      <div class="row q-col-gutter-lg self-center justify-center">
        <div class="col-8">
          <star-list :list="currentCluster.Stars"></star-list>
        </div>
      </div>



      &lt;!&ndash; modal &ndash;&gt;
      <q-dialog v-model="confirm" persistent >
        <q-card  style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center">

            <div class="text-h6">Delete {{currentCluster.name}}?</div>
          </q-card-section>

          <q-card-section class="q-pt-none">

            Once deleted a cluster cannot be recovered are you sure you want to delete this cluster.
          </q-card-section>

          <q-card-actions align="right">
            <div class="q-gutter-xl">
              <q-btn flat label="Delete" color="primary" v-close-popup @click="deleteCluster(currentCluster)"></q-btn>
            </div>
            <div class="q-gutter-xl">
              <q-btn flat label="Cancel" color="primary" v-close-popup ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page-container>

  </q-layout>-->
  world

</template>

<style>
/*@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}*/
</style>
