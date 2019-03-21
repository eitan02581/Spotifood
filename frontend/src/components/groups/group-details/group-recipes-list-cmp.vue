<template>
  <section class="accordion">
    <el-collapse v-model="activeName" accordion v-for="(recipe,idx) in recipes" :key="recipe._id">
      <el-collapse-item :title="recipe.title" :name="idx">
        <div class="flex space-between">
          <div>
            <el-carousel>
              <el-carousel-item v-for="(img,idx) in recipe.imgs" :key="`${img}${idx}`">
                <img :src="img" alt="Recipe Img">
              </el-carousel-item>
            </el-carousel>
            <ul>
              <li
                v-for="ingredient in Object.keys(recipe.ingredients)"
                :key="ingredient"
              >{{recipe.ingredients[ingredient]}} {{ingredient}}</li>
            </ul>
          </div>
          <ol>
            <li v-for="(instruction,idx) in recipe.instructions" :key="idx">{{instruction}}</li>
          </ol>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>
<script>
export default {
  props: {
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeName: "1"
    };
  },
  computed: {},
  created() {
    console.log(this.recipes);
  }
};
</script>

<style scoped lang="scss">
ul,
ol {
  padding: 2vw;
}
.accordion {
  width: 70vw;
  margin-left: 5vw;
}
.el-carousel {
  width: 250px;
  height: 200px;
}
.el-carousel__container{
  height: 200px !important;
}
.el-carousel__item {
  width: 250px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
