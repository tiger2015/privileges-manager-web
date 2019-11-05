<template>
 <div>
    <div>
        名称 <input type="text" v-model="name"> <input type="button" value="查询" v-on:click="search()">
    </div>
 </div>
</template>
<script>
export default {
  name: 'queryPermission',
  data () {
    return {
      name: '',
      pageInfo: {pageSize: 5, current: 1, total: 1},
      permissions: []
    }
  },
  methods: {
    search: function () {
    }
  }
}
</script>
<style scoped>
</style>
