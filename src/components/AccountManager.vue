<template>
  <div>
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
                    <th></th>
                    <th>ID</th>
                    <th>账号</th>
                    <th></th>
                    <th><input type="checkbox" v-on:click="checkAll" v-model="checkedAll"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(account, index) in accounts" v-bind:key="account.id" class="alt">
                  <td>{{index}}</td>
                  <td>{{account.id}}</td>
                  <td>{{account.name}}</td>
                  <td>编辑</td>
                  <td><input type="checkbox" v-bind:value="account.id" v-model="checkedAccounts"></td>
                </tr>
            </tbody>
        </table>
        <div id="pageinfo"><input type="button" value="上一页">&nbsp;&nbsp;<input type="button" value="下一页">&nbsp;&nbsp;当前页:{{pageInfo.current}}&nbsp;总页数:{{pageInfo.total}}</div>
    </div>
  </div>
</template>
<script>
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'accountManager',
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
    checkAll: function () {
      console.log('check:' + this.checkedAccounts)
      this.checkedAll = !this.checkedAll
      let that = this
      if (this.checkedAll) {
        this.checkedAccounts = []
        this.accounts.forEach(function (item) {
          that.checkedAccounts.push(item.id)
        })
      } else {
        this.checkedAccounts = []
      }
    },
    watch: {
      checkedAccounts: {
        handler: function (val, oldVal) {
          console.log('change')
          if (this.accounts.length === this.checkedAccounts.length) {
            this.checkedAll = true
          } else {
            this.checkedAll = false
          }
        }
      }
    }
  }
}
</script>
<style scoped>
  #result
  {
    border-collapse:collapse;
    margin-top: 5px;
  }
  #result td, #result th
  {
    font-size:1em;
    border:1px solid #98bf21;
    padding:3px 7px 2px 7px;
  }
  #result th
  {
    font-size:1.1em;
    text-align:center;
    padding-top:5px;
    padding-bottom:4px;
    background-color:#A7C942;
    color:#ffffff;
  }

  #result tr.alt td
  {
    color:#000000;
    background-color:#EAF2D3;
  }
  #pageinfo{
    margin-top: 5px;
  }
</style>
