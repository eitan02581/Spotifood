<template>
  <section class="profile-info">
    <div class="user-info">
      <h2>Hi, Im {{user.username}}</h2>
      <template v-if="user.favCategories.length">
        <i class="fas fa-utensils"></i>
        <h3>{{user.favCategories.join()}}</h3>
      </template>
      <!-- <i class="fas fa-users"></i>
      <h3>{{user.groups.length === 0 ? 'Not Yet' : user.groups.length }}</h3>-->
      <i class="fas fa-home"></i>
      <h3>{{user.city}}, {{user.country}}</h3>
      <i class="fas fa-language"></i>
      <h3>{{user.languages.join()}}</h3>
    </div>
    <div class="btns">
      <div class="social-icons">
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
      </div>
      <el-button type="success" round>Send Message</el-button>
    </div>
    <!-- <el-form>
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
    </el-form>-->
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  computed: {}
};
</script>

<style lang=scss scoped>
.profile-info {
  margin-left: 35px;
  font-size: 1.5em;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  .user-info {
    position: relative;
    i {
      position: absolute;
    }
    i + h3 {
      margin-left: 35px;
      margin-top: -4px;
    }
    &>*{
      padding-bottom: 25px;
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    .social-icons {
      font-size: 1.5em;
      display: flex;
      width: 100%;
      justify-content: space-around;
      margin-bottom: 15px;
    }
  }
}
/* .dashboard-container {
  margin-left: 30px;
  text-align: center;
  .stats-container {
    margin-top: 30px;
  }
} */
/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
} */
</style>
