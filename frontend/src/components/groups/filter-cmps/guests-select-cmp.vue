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
          value: "1 guest"
        },
        {
          value: "2 guests"
        },
        {
          value: "3 guests"
        },
        {
          value: "4 guests"
        },
        {
          value: "6 guests"
        },
        {
          value: "7 guests"
        },
        {
          value: "8 guests"
        },
        {
          value: "9 guests"
        },
        {
          value: "above 10"
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
