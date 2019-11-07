<template>
 <div>
    <div>
        名称 <input type="text" v-model="name"> <input type="button" value="查询" v-on:click="search()">
    </div>
    <div v-if="permissions.length === 0">
      no message
    </div>
    <div v-else>
       <table id="result">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>url</th>
                    <th>说明</th>
                    <th></th>
                    <th><input type="checkbox" v-on:click="checkAll" v-model="checkedAll"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(permission, index) in permissions" v-bind:key="permission.id" class="alt">
                  <td>{{permission.id}}</td>
                  <td>{{permission.name}}</td>
                  <td>{{permission.url}}</td>
                  <td>{{permission.description}}</td>
                  <td><a href="#" v-on:click="update(index)">编辑</a></td>
                  <td><input type="checkbox" v-bind:value="permission.id" v-model="checkedPermissions"></td>
                </tr>
            </tbody>
        </table>
        <div id="pageinfo"><input type="button" value="上一页" v-on:click="nextPage()">&nbsp;&nbsp;<input type="button" value="下一页" v-on:click="prevPage()">&nbsp;&nbsp;当前页:{{pageInfo.current}}&nbsp;总页数:{{pageInfo.total}}</div>
    </div>
 </div>
</template>
<script>
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'queryPermission',
  data () {
    return {
      name: '',
      pageInfo: {pageSize: 5, current: 1, total: 1},
      permissions: [],
      checkedAll: false,
      checkedPermissions: []
    }
  },
  methods: {
    search: function () {
      let url = evidenceUrl + '/permission/rest/search'
      var params = {
        name: this.name,
        pageNumber: this.pageInfo.current,
        pageSize: this.pageInfo.pageSize
      }
      var that = this
      this.$http.post(url, params, {emulateJSON: true}).then(function (response) {
        console.log(response)
        if (response.ok) {
          that.permissions = response.body.permissions
          that.pageInfo = response.body.pageInfo
        } else {
          that.permissions = []
        }
      })
    },
    netPage: function () {
      this.pageInfo.current++
      this.search()
    },
    prevPage: function () {
      this.pageInfo.current--
      this.search()
    },
    checkAll: function () {
      if (!this.checkedAll) {
        this.checkedPermissions = []
        var that = this
        this.permissions.forEach(function (item) {
          that.checkedPermissions.push(item.id)
        })
      } else {
        this.checkedPermissions = []
      }
    },
    update: function (index) {
      console.log(index)
      var that = this
      // console.log(this.permissions[index])
      this.$router.push({
        name: 'updatePermission',
        params: {
          permission: that.permissions[index]
        }
      })
    }
  },
  watch: {
    checkedPermissions: {
      handler (val, oldVal) {
        if (this.permissions.length === this.checkedPermissions.length) {
          this.checkedAll = true
        } else {
          this.checkedAll = false
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
</style>
