<template>
  <section>
    <div class="gallery js-flickity">
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
    </div>
  </section>
</template>

<script>
import groupPreview from "./groups/group-preview-cmp";
export default {
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    groupPreview
  }
};
</script>

<style scoped lang="scss">
.gallery {
  background: #eee;
}

.gallery-cell {
  width: 28%;
  height: 200px;
  margin-right: 10px;
  background: #8c8;
  counter-increment: gallery-cell;
}

.gallery-cell.is-selected {
  background: #ed2;
}

/* cell number */
.gallery-cell:before {
  display: block;
  text-align: center;
  content: counter(gallery-cell);
  line-height: 200px;
  font-size: 80px;
  color: white;
}
</style>