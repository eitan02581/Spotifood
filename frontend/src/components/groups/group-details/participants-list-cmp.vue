<template>
  <section class="participant-list">
    <participant-preview v-for="user in users" :user="user" :key="user._id"/>
  </section>
</template>

<script>
import participantPreview from "./participant-preview-cmp";
export default {
  props:{
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
      // cards:['fdsf','fdsfd','sdfsd']
    };
  }
};
</script>

<style>
.participant-list {
  height: 100%;
  width: 100%;
}
</style>
