<script setup>

</script>

<template>
  <q-layout view="hHh lpR fFf">


    <q-page-container>


      <div class="row justify-center ">
        <div class="col-6 text-center text-h3 q-pa-lg">
          Edit Cluster
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-6">
          <q-form
              @submit.prevent="editCurrentCluster"
              @reset="onReset"
              class="q-gutter-md"
          >

            <q-input
                filled
                v-model="editCluster.name"
                label="Cluster Name *"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            ></q-input>


            <q-input  filled
                      label="New Classification"
                      v-model="classification.name"
                      lazy-rules
                      bg-color="white">
              <q-btn round dense flat icon="add"@click="addEditClassification(classification.name)" ></q-btn>
            </q-input>


            <classification-list :list="editCluster.classifications"></classification-list>


            <q-toggle v-model="editCluster.public" label="Public"></q-toggle>

            <q-toggle v-model="editCluster.favorite" label="Favorite"></q-toggle>

            <q-select standout v-model="editCluster.type" :options="clusterTypes" label="Collection Type"  bg-color="white"></q-select>
            <q-btn label="Submit" type="submit" color="primary"></q-btn>

            <q-btn label="Reset" type=""  color="primary"  class="q-ml-lg"></q-btn>

          </q-form>
        </div>
      </div>


    </q-page-container>

  </q-layout>
</template>

<style scoped>

</style>