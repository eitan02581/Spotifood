<template>
  <section class="aside-header">
    <h1>Group Admin:</h1>
    <participant-preview :user="admin"/>
    <el-button type="success" plain>Add User</el-button>
  </section>
</template>

<script>
import participantPreview from "./participant-preview-cmp";
export default {
  props: {
    admin: {
      type: Object,
      required: true
    }
  },
  components: {
    participantPreview
  }
};
</script>

<style scoped>
.aside-header {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}
.aside-header button {
  width: 15%;
  margin: 10px auto;
}
</style>
