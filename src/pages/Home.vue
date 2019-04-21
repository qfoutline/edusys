<template>
  <div class="page-home">
    <Namelist/>
    <group/>
  </div>
</template>

<script>
import Namelist from "@/components/Namelist.vue";
import Group from "@/components/Group.vue";

// 导出当前组件
export default {
  name: "Home",
  components: {
    Group,
    Namelist
  },
  mounted(){
    console.log('Home')
  }
};
</script>
