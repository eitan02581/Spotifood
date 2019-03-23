<template>
  <section>
    <h1>heyy user!!</h1>
    <div class="form-wrapper">
      <form>
        <input type="text">
      </form>
      <h1>my Groups</h1>
      <div class="groups-container">
        <!-- <el-button type="success" @click="$emit('delete' , group._id)">Delete</el-button> -->
        <!-- <router-link :to="'/group/edit/' + group._id">
            <el-button type="danger">Edit</el-button>
        </router-link>-->
        <groupPreview></groupPreview>
        <groupPreview></groupPreview>
      </div>
    </div>
  </section>
</template>

<script>
import groupPreview from "../components/groups/group-preview-cmp.vue";
export default {
  components: {
    groupPreview
  }
};
</script>

<style>
</style>
