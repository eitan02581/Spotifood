<template>
  <section>
    <div class="dashboard-container">
      <div class="name-container">
        <h1>Hi, Im {{user.username}}</h1>
      </div>
      <div class="stats-container">
        Groups: {{user.groups.length === 0 ? 'Not Yet' : user.groups.length }} |
        Favorit categories: {{user.favCategories.length === 0 ? 'Not Yet' : user.favCategories.length }}
      </div>
      <h3>Lives in {{user.city}}, {{user.country}}</h3>
    </div>
    <el-form>
      <el-form-item label="Favorit Categories">
        <el-select multiple v-model="user.favCategories" filterable placeholder="Select Categories">
          <el-option
            v-for="category in this.$store.getters.categories"
            :key="category"
            :label="category"
            :value="category"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang=scss scoped>
.dashboard-container {
  margin-left: 30px;
  text-align: center;
  .stats-container {
    margin-top: 30px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>
