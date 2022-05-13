<template>
 <div class="adminWorkOrder">
   <h1>工单管理页面</h1>
 </div>
</template>

<script>
export default {
  created() {
    this.$emit('active',4);
  },
  name: "AdminWorkOrder"
}
</script>

<style scoped>

</style>