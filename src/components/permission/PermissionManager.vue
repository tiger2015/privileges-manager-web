<template>
 <div>
   <router-view></router-view>
 </div>
</template>
<script>
import UpdatePermission from './UpdatePermission'
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'permissionManager',
  components: {UpdatePermission},
  methods: {
    getPermission: function (id) {
      console.log('search permission: ' + id)
      var url = evidenceUrl + '/permission/rest/get/' + id
      this.$http.post(url, {}, {emulateJSON: true}).then(function (response) {
        console.log(response.body)
        return response.body
      })
    }
  }
}
</script>
<style scoped>
</style>
