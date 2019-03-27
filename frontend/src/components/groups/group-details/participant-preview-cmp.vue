<template>
  <section class="participant-preview">
    <img :src="user.img">
    <!-- <h4>{{user.username}}</h4> -->
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
img {
  width: auto;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 51px;
  border: 5px solid #9e9e9e47;
  transition: 0.3s;
}
img:hover {
  border: 5px solid #607d8b;
}
.participant-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
}
h4 {
  margin-left: -7px;
}
</style>
