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
              <td><textarea v-model="permission.desc"></textarea></td>
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
export default {
  name: 'addPermission',
  data () {
    return {
      permission: {name: '', url: '', desc: ''}
    }
  }
}
</script>
