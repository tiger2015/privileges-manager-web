<template>
  <div>
    <div id="head">
      <div id="userInfo">
        当前用户&nbsp;<span class="account">{{account}}</span>
        &nbsp;&nbsp;
        <input type="button" value="退出" id="logout" v-on:click="logout"/>
      </div>
    </div>
    <div id="menu">
      <ul>
        <li>
          <a href="#" target="iFrame">用户管理</a>
          <ul>
            <li><a href="#" target="iFrame">用户查询</a></li>
            <li><a href="#">添加用户</a></li>
          </ul>
        </li>
        <li>
          <a th:href="#">角色管理</a>
            <ul>
              <li><a href="#">角色查询</a></li>
              <li><a href="#">添加角色</a></li>
            </ul>
        </li>
        <li>
          <a href="#">权限管理</a>
            <ul>
              <li><a href="#">权限查询</a></li>
              <li><a href="#">添加权限</a></li>
            </ul>
        </li>
      </ul>
    </div>
    <div id="center">
      <router-view></router-view>
    </div>
</div>
</template>
<script>
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'index',
  data () {
    return {
      account: sessionStorage.getItem('account'),
      permissions: ''
    }
  },
  methods: {
    logout: function () {
      console.log('logout')
      console.log(sessionStorage.getItem('accountId'))
      this.$http.post(evidenceUrl + '/account/rest/logout',
        {'accountId': sessionStorage.getItem('accountId')
        },
        {
          emulateJSON: true
        }).then(function (response) {
        sessionStorage.removeItem('account')
        sessionStorage.removeItem('accountId')
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>
<style>
  #head {
    position: absolute;
    top: 0;
    width: 100%;
    margin: 1px;
    height: 100px;
    background-color: aqua;
  }
  #userInfo {
    position: absolute;
    right: 10%;
    top: 5%;
  }
  #center {
    position: absolute;
    margin-left: 1px;
    left: 40%;
    top: 15%;
    width: 90%;
    height: 300px;
  }
  .account {
    font-size: 16px;
    font-weight: bold;
  }
  ul, li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  #menu {
    position: absolute;
    left: 40%;
    top: 70px;
  }
  #menu > ul {
    background-color: #f1f1f1;
  }
  #menu > ul > li {
    float: left;
    position: relative;
    padding: 5px 10px;
    background-color: deepskyblue;
  }
  #menu ul li a {
    display: block;
    text-align: center;
    text-decoration: none;
  }
  #menu > ul > li > ul {
    display: none;
  }
  #menu ul li:hover ul {
    position: absolute;
    display: block;
    width: 100px;
    left: 0;
  }
  #menu ul li:hover ul li a {
    display: block;
    background-color: lawngreen;
    color:#000;
  }
  #menu ul li:hover ul li a:hover {
    background-color: #dfc184;
    color: #000;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
