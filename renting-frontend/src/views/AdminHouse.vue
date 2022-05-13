<template>
 <div class="adminHouse">
   <h1>房源管理页面</h1>
 </div>
</template>

<script>
export default {
  created() {
    this.$emit('active',3);
  },
  name: "AdminHouse"
}
</script>

<style scoped>

</style>