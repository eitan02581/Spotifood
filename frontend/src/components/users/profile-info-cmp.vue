<template>
  <section class="profile-info">
    <div class="user-info">
      <h2>Hi, Im {{user.username}}</h2>
      <!-- <template v-if="user.favCategories.length">
        <i class="fas fa-utensils"></i>
        <h3>{{user.favCategories.join()}}</h3>
      </template>-->
      <!-- <i class="fas fa-users"></i>
      <h3>{{user.groups.length === 0 ? 'Not Yet' : user.groups.length }}</h3>-->
      <i class="fas fa-home"></i>
      <h3>{{user.city}}, {{user.country}}</h3>
      <!-- <i class="fas fa-language"></i>
      <h3>{{user.languages.join()}}</h3> -->
      <!-- Edit Cuisine -->
      <label for="Cuisine Type" v-if="showInput">
        <el-select multiple v-model="user.favCategories" filterable placeholder="Select Cuisine">
          <el-option
            v-for="cuisine in this.$store.getters.categories"
            :key="cuisine"
            :label="cuisine"
            :value="cuisine"
          ></el-option>
        </el-select>
        <button @click="SaveCuisines">Save</button>
      </label>
      <!-- End of Edit Cuisine -->
    </div>
    <div class="social-icons">
      <i class="fab fa-facebook-f"></i>
      <i class="fab fa-twitter"></i>
      <i class="fab fa-instagram"></i>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    showInput: {
      type: Boolean,
      required: true
    }
  },
  computed: {},
  methods: {
    SaveCuisines() {
      this.$emit("closeInput");
      this.$store
        .dispatch({ type: "updateUser", user: this.user })
        .then(() => this.$toast.Success("User Updated Successfully"));
    }
  }
};
</script>

<style lang=scss scoped>
.profile-info {
  margin-left: 35px;
  font-size: 1.5em;
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  .user-info {
    position: relative;
    i {
      position: absolute;
    }
    i + h3 {
      margin-left: 35px;
      margin-top: -4px;
    }
    & > * {
      padding-bottom: 25px;
    }
  }
  .social-icons {
    font-size: 1.5em;
    display: flex;
    width: 50%;
    justify-content: space-around;
    margin-bottom: 15px;
    & > i:hover {
      color: cyan;
    }
  }
}
</style>
