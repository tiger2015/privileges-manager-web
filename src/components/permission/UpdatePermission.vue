<template>
   <div>
        <form>
           <label>名称</label><input type="text"  v-model="persmission.name"/><br/>
           <label>ulr</label><input  type="text"  v-model="persmission.ulr"/><br/>
           <label>desc</label><textarea v-model="permission.desc"></textarea><br/>
           <input type="submit" value="提交">
       </form>
    </div>
</template>
<script>
export default {
  name: 'updatePermission',
  data () {
    return {
      permission: {name: '', url: '', desc: ''}
    }
   }
}
</script>
