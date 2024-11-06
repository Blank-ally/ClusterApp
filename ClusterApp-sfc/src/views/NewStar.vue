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
          New Star
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-6">
          <q-form
              @submit="addNewStar"
              @reset="onReset"
              class="q-gutter-xl"
          >

            <div class="q-pa-md">
              <div class="q-col-gutter-md row justify-center">
                <div class="col-6">
                  <q-img :src="NewStar.photo" :ratio="4/3">

                  </q-img>
                </div>
              </div>


            </div>

            <q-input
                filled
                v-model="NewStar.photo"
                label="Star img"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"

            ></q-input>

            <q-input
                filled
                v-model="NewStar.name"
                label="Star Name"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"

            ></q-input>
            <q-input
                filled
                v-model="NewStar.cluster"
                label="Cluster"
                lazy-rules
                disabled
                bg-color="white"
            >
            </q-input>

            <q-select standout v-model="NewStar.classi" :options="currentCluster.classifications.map(item => ({value: item, label: item.name}))" label="Classifications"  bg-color="white"></q-select>


            <q-input
                filled
                type="number"
                v-model="NewStar.qty"
                label="Qty"
                lazy-rules
                bg-color="white"
                :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
            ></q-input>
            <q-input
                v-model="NewStar.notes"
                filled
                label="Notes"
                type="textarea"
                bg-color="white"
            ></q-input>


            <q-toggle v-model="NewStar.Trade" label="Trade" ></q-toggle>



            <q-btn label="Submit" type="submit" color="primary"></q-btn>
            <q-btn label="Cancel" href="Cluster.html" color="primary"  class="q-ml-lg"></q-btn>




          </q-form>
        </div>
      </div>


    </q-page-container>


  </q-layout>
</template>

<style scoped>

</style>