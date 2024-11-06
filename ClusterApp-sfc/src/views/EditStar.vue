<script setup>

</script>

<template>
  <q-layout view="hHh lpR fFf">

    <l-nav-list :pages="pages"></l-nav-list>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div class="row justify-center ">
        <div class="col-6 text-center text-h3 q-pa-lg">
          Edit Star
        </div>
      </div>

      <div class="row justify-content-start ">
        <div class="col-6 text-center text-h3 q-pa-lg">
          <q-btn  padding="lg xl" flat  @click="confirm = true">
            <q-icon>
              <i class="fa-solid fa-trash"></i>
            </q-icon>
          </q-btn>
        </div>
      </div>


      <div class=" row justify-center" style="max-width:400px;max-height: 1000px ">
        <q-form
            @submit="editCurrentStar"
            @reset="onReset"
            class="q-gutter-xl"
        >

          <div class="q-pa-md">
            <div class="q-col-gutter-md row justify-center">
              <div class="col-6">
                <q-img  :src="editStar.photo" :ratio="4/3">

                </q-img>
              </div>
            </div>


          </div>

          <q-input
              filled
              v-model="editStar.photo"
              label="Star img"
              lazy-rules
              bg-color="white"
              :rules="[ val => val && val.length > 0 || 'Please type something']"

          ></q-input>

          <q-input
              filled
              v-model="editStar.name"
              label="Star Name"
              lazy-rules
              bg-color="white"
              :rules="[ val => val && val.length > 0 || 'Please type something']"

          ></q-input>
          <q-input
              filled
              v-model="editStar.cluster"
              label="Cluster"
              lazy-rules
              disabled
              bg-color="white"
          >
          </q-input>
          <!--
                              .map(item => ({value: item, label: item.name}))"-->
          <q-select standout v-model="editStar.classi" :options="currentCluster.classifications.getItems()"

                    label="Classifications"   bg-color="white"></q-select>


          <q-input
              filled
              type="number"
              v-model="editStar.qty"
              label="Qty"
              lazy-rules
              bg-color="white"
              :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
          ></q-input>
          <q-input
              v-model="editStar.notes"
              filled
              label="Notes"
              type="textarea"
              bg-color="white"
          ></q-input>


          <q-toggle v-model="editStar.Trade" label="Trade" ></q-toggle>



          <q-btn label="Submit" type="submit" color="primary"></q-btn>
          <q-btn label="Cancel" href="Cluster.html" color="primary"  class="q-ml-lg"></q-btn>









        </q-form>
      </div>
      <!-- modal -->
      <q-dialog v-model="confirm" persistent>
        <q-card  style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center">

            <div class="text-h6">Delete {{currentStar.name}}?</div>
          </q-card-section>

          <q-card-section class="q-pt-none">

            Once deleted a Star cannot be recovered are you sure you want to delete this Star.
          </q-card-section>

          <q-card-actions align="right">
            <div class="q-gutter-xl">
              <q-btn flat label="Delete" color="primary" v-close-popup @click="deleteStar(currentStar)"></q-btn>
            </div>
            <div class="q-gutter-xl">
              <q-btn flat label="Cancel" color="primary" v-close-popup ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page-container>


  </q-layout>
</template>

<style scoped>

</style>