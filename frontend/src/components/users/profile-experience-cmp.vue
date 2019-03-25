<template>
  <section class="profile-experience">
    <el-timeline :reverse="true">
      <el-timeline-item
        v-for="group in groups"
        :key="group._id"
        :timestamp="group.time | time"
      >{{group.title}}</el-timeline-item>
    </el-timeline>
    <h3 v-if="user.favCategories.length">Cuisines</h3>
    <ul>
      <li v-for="category in user.favCategories" :key="category">{{category}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true
    }
  },
  computed: {}
};
</script>

<style lang=scss>
.profile-experience {
  width: 20%;
  ul {
    max-height: 270px;
    overflow: overlay;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
}
</style>
