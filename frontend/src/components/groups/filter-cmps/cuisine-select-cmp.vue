<template>
  <section>
    <el-select @change="onSave" v-model="value" placeholder="Cuisine Type">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <button v-if="value.length >=1" @click="clearSelect" class="delete">X</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Israeli"
        },
        {
          value: "French"
        },
        {
          value: "Italien"
        },
        {
          value: "British"
        },
        {
          value: "Vietnamese"
        },
        {
          value: "Chinese"
        },
        {
          value: "Indian"
        }
      ],
      value: ""
    };
  },
  methods: {
    onSave() {
      this.$emit("cuisine", this.value);
    },
    clearSelect() {
      this.value = "";
      this.onSave();
    }
  }
};
</script>