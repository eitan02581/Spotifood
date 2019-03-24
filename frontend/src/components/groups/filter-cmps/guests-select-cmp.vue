<template>
  <section>
    <el-select @change="onSave" v-model="value" placeholder=" Guests">
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
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        },
        {
          value: 6
        },
        {
          value: 7
        },
        {
          value: 8
        },
        {
          value: 9
        },
        {
          value: 10
        },
        {
          value: 11
        },
        {
          value: 12
        },
        {
          value: 13
        },
        {
          value: 14
        },
        {
          value: 15
        }
      ],
      value: ""
    };
  },
  methods: {
    onSave() {
      this.$emit("guests", this.value);
    },
    clearSelect() {
      this.value = "";
      this.onSave();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
