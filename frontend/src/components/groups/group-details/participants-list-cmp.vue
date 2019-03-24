

<template>
  <section>
    <!-- <h3>participants</h3> -->
    <div class="participant-item" v-for="user in users" :key="user._id">
      <div v-if="isAdmin" class="remove-btn">
        <button>X</button>
      </div>
      <participant-preview :user="user"/>
    </div>
  </section>
</template>

<script>
import participantPreview from "./participant-preview-cmp";
export default {
  // TODO: ADD FUNC TO REMOVE  USER
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  components: {
    participantPreview
  },
  data() {
    return {};
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isGroupAdmin;
    }
  }
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  .participant-list {
    display: flex;
  }
}
/* h3 {
  color: gray;
  margin-bottom: 10px;
} */
</style>
