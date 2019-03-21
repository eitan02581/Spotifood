<template>
  <section class="participant-preview">
    <img :src="user.img">
    <h2>{{user.username}}</h2>
  </section>
</template>

<script>
export default {
  props:{
      user: {
        type: Object,
        required: true
      }
    },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
img {
  height: 5vh;
  border-radius: 3vh;
  width: auto;
  margin-right: 5px
}
.participant-preview {
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
}
</style>
