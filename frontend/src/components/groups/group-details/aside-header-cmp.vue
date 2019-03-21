<template>
  <section class="aside-header">
    <participant-preview :user="admin"/>
    <button>+</button>
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

<style >
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
