<template>
  <div id="queryAccount">
    <div>
      <label>账号</label>
      <input type="text" id="name" v-model="name"/>
      <input type="button" value="查询" id="search" v-on:click="search"/>
    </div>
    <div v-if="accounts.length === 0">
        no message
    </div>
    <div v-else>
        <table id="result">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>账号</th>
                    <th></th>
                    <th><input type="checkbox" v-on:click="checkAll" v-model="checkedAll"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" v-bind:key="account.id" class="alt">
                  <td>{{account.id}}</td>
                  <td>{{account.name}}</td>
                  <td>编辑</td>
                  <td><input type="checkbox" v-bind:value="account.id" v-model="checkedAccounts"></td>
                </tr>
            </tbody>
        </table>
        <div id="pageinfo"><input type="button" value="上一页" v-on:click="nextPage()">&nbsp;&nbsp;<input type="button" value="下一页" v-on:click="prevPage()">&nbsp;&nbsp;当前页:{{pageInfo.current}}&nbsp;总页数:{{pageInfo.total}}</div>
    </div>
  </div>
</template>
<script>
import '../../../static/css/result.css'
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'queryAccount',
  data () {
    return {
      name: '',
      pageInfo: {pageSize: 5, current: 1, total: 0},
      accounts: [],
      checkedAccounts: [],
      checkedAll: false
    }
  },
  methods: {
    search: function () {
      console.log('search:' + this.name)
      let url = evidenceUrl + '/account/rest/search'
      let params = {
        'name': this.name,
        'pageSize': this.pageInfo.pageSize,
        'pageNumber': this.pageInfo.current}
      var that = this

      this.$http.post(url, params, {emulateJSON: true}).then(function (response) {
        console.log(response)
        that.pageInfo = response.body.pageInfo
        that.accounts = response.body.accounts
      })
    },
    nextPage: function () {
      this.pageInfo.current++
      this.search()
    },
    prevPage: function () {
      this.pageInfo.current--
      this.search()
    },
    checkAll: function () {
      console.log('check:' + this.checkedAccounts)
      let that = this
      if (!this.checkedAll) {
        this.checkedAccounts = []
        this.accounts.forEach(function (item) {
          that.checkedAccounts.push(item.id)
        })
      } else {
        this.checkedAccounts = []
      }
    }
  },
  watch: {
    checkedAccounts: {
      handler () {
        console.log('change')
        if (this.accounts.length === this.checkedAccounts.length) {
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
