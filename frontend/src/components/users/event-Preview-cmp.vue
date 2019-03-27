<template>
  <section class="event-preview" @click="SetOnMap">
    <img :src="group.img">
    <div class="content">
      <h3>{{group.title}}</h3>
      <h4>{{group.place.city}} , {{group.place.country.shortName}}</h4>
    </div>
    <i class="fas fa-arrow-circle-right" @click.stop="routeToGroup"></i>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    SetOnMap() {
      this.$emit("SetOnMap", this.group.location);
    },
    routeToGroup() {
      this.$router.push(`/groups/${this.group._id}`);
    }
  },
  created() {}
};
</script>

<style lang=scss scoped>
.event-preview {
  cursor: pointer;
  height: 100px;
  width: 300px;
  border: 1px solid #e4e7ed;
  display: flex;
  img {
    height: 100%;
    width: 100px;
    object-fit: cover;
  }
  .content {
    width: 150px;
    padding: 5px;
    h4 {
      color: gray;
    }
  }
  i {
    height: 100%;
    width: 30px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
  }
}
@media (min-width: 600px) {
  .event-preview {
    height: 70px;
    width: 100%;
    img{
      width: 70px;
    }
    .content {
    width: calc(100% - 100px);
    }
  }
}
</style>
