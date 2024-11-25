<script >
/*import newStar from "@/views/NewStarView.vue";*/
import Star from "@/components/models/Star.js";




export default {
  name: "NewStar",
  data: function() {
    return {
      newStar: new Star() ,
    }},

}
</script>

<template>



    <q-page-container>
      <div class="row justify-center ">
        <div class="col-6 text-center text-h3 q-pa-lg">
          New Star
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-6">
          <q-form
              submit="addnewStar"
              reset="onReset"
              class="q-gutter-xl"
          >

            <div class="q-pa-md">
              <div class="q-col-gutter-md row justify-center">
                <div class="col-6">
                  <q-img :src="newStar.photo" :ratio="4/3">

                  </q-img>
                </div>
              </div>


            </div>

            <q-input
                filled
                v-model="newStar.photo"
                label="Star img"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"

            ></q-input>

            <q-input
                filled
                v-model="newStar.name"
                label="Star Name"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"

            ></q-input>
            <q-input
                filled
                v-model="newStar.cluster"
                label="Cluster"
                lazy-rules
                disabled
                bg-color="white"
            >
            </q-input>

            <q-select standout v-model="newStar.classi"  label="Classifications"  bg-color="white"></q-select> <!--:options="currentCluster.classifications.map(item => ({value: item, label: item.name}))"-->


            <q-input
                filled
                type="number"
                v-model="newStar.qty"
                label="Qty"
                lazy-rules
                bg-color="white"
                :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
            ></q-input>
            <q-input
                v-model="newStar.notes"
                filled
                label="Notes"
                type="textarea"
                bg-color="white"
            ></q-input>


            <q-toggle v-model="newStar.Trade" label="Trade" ></q-toggle>



            <q-btn label="Submit" type="submit" color="primary"></q-btn>
            <q-btn label="Cancel" href="Cluster.html" color="primary"  class="q-ml-lg"></q-btn>




          </q-form>
        </div>
      </div>


    </q-page-container>


</template>

<style scoped>

</style>