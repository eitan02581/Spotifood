<template>
  <section></section>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.groupId = this.$route.params.id;
    if (this.groupId) {
      this.$store.dispatch({ type: "getGroup", groupId: this.groupId });
    }
  }
};
</script>

<style>
</style>
