<template>
  <section>
    <h3>participants</h3>
    <div class="participant-list">
      <participant-preview v-for="user in users" :user="user" :key="user._id"/>
    </div>
  </section>
</template>

<script>
import participantPreview from "./participant-preview-cmp";
export default {
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
    return {
    };
  }
};
</script>

<style scoped>
.participant-list {
  display: flex;
}
h3 {
  color: gray;
  margin-bottom: 10px;
}
</style>
