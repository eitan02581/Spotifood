<template>
  <section class="aside-preview">
    <img :src="card.img">
    <h2>{{(card.username)?card.username:card.title}}</h2>
  </section>
</template>

<script>
import asidePreview from "./group-aside-cmp.vue";
export default {
  props: ["card"],
  // {
  //     card:object
  // },
  components: {
    asidePreview
  },
  data() {
    return {
      // cards:['fdsf','fdsfd','sdfsd']
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
.aside-preview {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
</style>
