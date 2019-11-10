<template>
   <div id="add">
      <form>
          <table>
            <tr>
              <td>名称</td>
              <td><input type="text"  v-model="permission.name" required/></td>
            </tr>
             <tr>
              <td>url</td>
              <td><input  type="text"  v-model="permission.url" required/></td>
            </tr>
             <tr>
              <td>desc</td>
              <td><textarea v-model="permission.description"></textarea></td>
            </tr>
             <tr>
              <td colspan="2"><input type="submit" value="提交"></td>
            </tr>
          </table>
       </form>
    </div>
</template>
<script>
import '../../../static/css/add.css'
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'updatePermission',
  data () {
    return {
      permission: {id: 0, name: '', url: '', description: ''}
    }
  },
  created: function () {
    console.log(this.$route)
    var id = parseInt(this.$route.query.permissionId)
    this.permission.id = id
    console.log(this.permission)
    localStorage.setItem('permissionId', JSON.stringify(id))
  },
  mounted: function () {
    if (localStorage.getItem('permissionId') !== undefined && localStorage.getItem('permissionId') !== null) {
      this.permission.id = localStorage.getItem('permissionId')
      this.permission = this.getPermission(this.permission.id)
    }
  },
  destroyed: function () {
    localStorage.removeItem('permissionId')
  },
  methods: {
    getPermission: function (id) {
      var url = evidenceUrl + '/permission/rest/get/' + id
      this.$http.post(url, {}, {emulateJSON: true}).then(function (response) {
        console.log(response)
        this.permission = response.body
      })
    }
  }
}
</script>
