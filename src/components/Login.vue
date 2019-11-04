<template>
    <form id="login" v-on:submit.prevent="onSubmit">
        <label id="title">登录</label>
        <input type="text" id="name" placeholder="username" v-model="username"/>
        <br/>
        <input type="password" id="pwd" placeholder="password" v-model="password"/>
        <br/>
        <input type="text" placeholder="验证码" v-model="checkCode">
        <br/>
        <label id="error">{{error}}</label>
        <input type="submit" value="login"/>
    </form>
</template>

<script>
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      error: '',
      checkCode: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('username:' + this.username)
      var url = evidenceUrl + '/account/rest/login'
      console.log('url:' + url)
      var formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      let config = {
        emulateJSON: true
      }
      var that = this
      this.$http.post(url, formData, config).then(function (response) {
        if (response.body.status === 400) {
          this.error = response.body.msg
        } else {
          // console.log(response.body.accountId)
          sessionStorage.setItem('accountId', response.body.accountId)
          sessionStorage.setItem('account', that.username)
          this.$router.push({
            name: 'index'
          })
        }
      })
    }
  }
}
</script>

<style>
    #login {
        position: absolute;
        margin-left: 40%;
        width: 240px;
        height: 280px;
        margin-top: 15%;
        background-color: deepskyblue;
    }

    #title {
        position: relative;
        margin-top: 20px;
        margin-left: 40%;
        font: 20px bold;
        text-align: center;
    }

    input {
        position: relative;
        width: 200px;
        margin-top: 20px;
        margin-left: 8%;
        height: 30px;
        font-size: 15px;
        font-weight: bold;
    }

    #error {
        position: absolute;
        color: red;
        display: flex;
    }
</style>
