<template>
  <section class="group-info">
    <h1>{{group.title}}</h1>
    <h3>{{group.time | time }}</h3>
    <h3>{{group.place}}</h3>
    <el-tag type="warning" v-for="hashtag in group.hashtags" :key="hashtag">#{{hashtag}}</el-tag>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.group-info {
  margin-top: 130px;
  padding-left: 10px;
  h1 {
    font-size: 2.5em;
  }
  h3 {
    font-size: 1em;
    color: gray;
  }
  & > *{
    margin-bottom: 10px;
  }
}
</style>
