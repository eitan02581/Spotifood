<template>
  <section class="participant-preview">
    <img :src="user.img">
    <h4>{{user.username}}</h4>
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
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
}
h4{
  margin-left: -7px;
}
</style>
