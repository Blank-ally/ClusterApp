<script>
import User from "@/components/models/User.js";

export default {
  name: "LSearch",
  data: function(){
    return {

      keyword: '',
    }
  },
  props: {
    onSearch: Function,
    authUser: {type: User, required: true},
  },
  methods: {
    search(){
      this.onSearch(this.keyword);
    }
  },
  computed: {

  },
}
</script>

<template>
  <q-form @submit.prevent="search" class="q-flex row q-pb-lg">
    <q-input
        v-model="keyword"
        label="Search"
        placeholder="Collection"
        class="col"
        filled
        bg-color="white"
        clearable
        clear-icon="close"
    />
    <q-btn :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }" type="submit"  class="col-auto">
      <q-icon name="search" />
    </q-btn>
  </q-form>
</template>

<style scoped>

</style>