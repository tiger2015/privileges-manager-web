<template>
  <div id="accountManager">
    <router-view></router-view>
  </div>
</template>
<script>
export const evidenceUrl = process.env.API_ROOT
export default {
  name: 'accountManager'
}
</script>
<style scoped>
</style>
