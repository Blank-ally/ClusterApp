<script>
export default {
  name: "LSearch",
  data: function(){
    return {

      keyword: '',
    }
  },
  props: {
    onSearch: Function
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
    />
    <q-btn type="submit" color="primary" class="col-auto">
      <q-icon name="search" />
    </q-btn>
  </q-form>
</template>

<style scoped>

</style>