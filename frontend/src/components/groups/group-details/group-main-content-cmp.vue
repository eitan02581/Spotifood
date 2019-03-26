<template>
  <section class="group-main-content">
    <img :src="group.img" alt="Group Image">
    <group-info :group="group"/>
  </section>
</template>

<script>
import groupInfo from "./group-info-cmp";
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  components: {
    groupInfo
  }
};
</script>

<style scoped lang="scss">
.group-main-content {
  display: flex;
  margin-top: 50px;
  img {
    width: 20vw;
    height: 26vw;
    margin: 25px 50px;
  }
}
</style>
