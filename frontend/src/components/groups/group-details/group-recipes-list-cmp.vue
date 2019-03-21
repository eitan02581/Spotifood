<template>
  <section class="accordion">
    <h1>Recipes</h1>
    <el-collapse v-model="activeName" accordion v-for="(recipe,idx) in recipes" :key="recipe._id">
      <el-collapse-item :title="recipe.title" :name="idx">
        <div class="collapse-context">
          <div>
            <el-carousel height="200px">
              <el-carousel-item v-for="(img,idx) in recipe.imgs" :key="`${img}${idx}`">
                <img :src="img" alt="Recipe Img">
              </el-carousel-item>
            </el-carousel>
            <ul>
              <li v-for="ingredient in Object.keys(recipe.ingredients)" :key="ingredient">
                <span class="quantity">{{recipe.ingredients[ingredient]}}</span>
                {{ingredient}}
              </li>
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
  padding-top: 5vh;
  &li > .quantity {
    font-size: 1.3em !important;
  }
}
h1{
  margin: 15px 0;
  font-size: 1.75em;
}
.accordion {
  margin: 0 50px;
}
.el-carousel {
  width: 250px;
  height: 200px;
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
.collapse-context{
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
