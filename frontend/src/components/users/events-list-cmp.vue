<template>
  <section class="events-list">
    <event-preview v-for="group in groups" :key="group._id" :group="group" @SetOnMap="SetOnMap"/>
  </section>
</template>

<script>
import eventPreview from "./event-Preview-cmp";
export default {
  components: {
    eventPreview
  },
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    SetOnMap(loc){
      this.$emit('SetOnMap',loc)
    }
  },
  created() {}
};
</script>

<style lang=scss scoped>
.events-list {
  display: flex;
  height: 120px;
  max-height: 600px;
  width: 100%;
  overflow: scroll;
}
@media(min-width: 600px){
.events-list{
  display: block;
  width: 250px;
  height: 70vh;
}
}
</style>
