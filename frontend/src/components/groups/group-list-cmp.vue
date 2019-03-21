<template>
  <section>
    <div class="list-container">
      <div class="group-preview-wrapper" v-for="group in groups" :key="group._id">
        <el-button type="success" @click="$emit('delete' , group._id)">Delete</el-button>
        <router-link :to="'/group/edit/' + group._id">
          <el-button type="danger">Edit</el-button>
        </router-link>

        <router-link :to="'/groups/' + group._id">
          <GroupPreview :group="group"></GroupPreview>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import GroupPreview from "./group-preview-cmp.vue";
export default {
  props: {
    groups: {
      type: Array,
      required: true,
      default: function() {
        return "EMPTY";
      }
    }
  },
  components: {
    GroupPreview
  }
};
</script>

<style scoped lang="scss">
section {
  // margin-top: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  .list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 75%;
  }
  .group-preview-wrapper {
    display: inline-block;
  }
}
</style>
