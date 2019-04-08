<template>
  <section class="accordion">
    <div class="recipes-header">
      <h1>Recipes</h1>
      <template v-if="isGroupAdmin">
        <i class="fas fa-plus" @click="addRecipe"></i>
      </template>
    </div>
    <template v-if="!recipes.length >= 1">
      <h1>My Recipes Are A Secret ;)</h1>
    </template>
    <el-collapse
      class="rec-item"
      v-model="activeName"
      accordion
      v-for="(recipe,idx) in recipes"
      :key="recipe._id"
    >
      <div class="space"></div>
      <el-collapse-item id="rec" :title="recipe.title" :name="idx">
        <h1 style="color:#f33636;font-size:3rem;margin:0 30px;">{{recipe.title}}</h1>
        <div class="collapse-context">
          <div>
            <el-carousel height="200px">
              <el-carousel-item v-for="(img,idx) in recipe.imgs" :key="`${img}${idx}`">
                <img :src="img" alt="Recipe Img">
              </el-carousel-item>
            </el-carousel>
            <h1>Ingredient</h1>
            <ul>
              <li v-for="ingredient in Object.keys(recipe.ingredients)" :key="ingredient">
                <span class="quantity">{{recipe.ingredients[ingredient]}}</span>
                {{ingredient}}
              </li>
            </ul>
          </div>

          <ol>
          <h1>Instructions</h1>
            <li v-for="(instruction,idx) in recipe.instructions" :key="idx">{{instruction}}</li>
          </ol>
        </div>
        <template v-if="isGroupAdmin">
          <i class="far fa-edit" @click="updateRecipe(recipe._id,recipe.createdBy)"></i>
          <i class="far fa-trash-alt" @click="removeRecipe(recipe._id)"></i>
        </template>
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
  methods: {
    addRecipe() {
      this.$router.push({
        path: "/groups/recipeForm",
        query: {
          groupId: this.$route.params.groupId,
          creatorId: this.$store.getters.group.admin._id
        }
      });
    },
    updateRecipe(recipeId, creatorId) {
      this.$router.push({
        path: "/groups/recipeForm",
        query: {
          groupId: this.$route.params.groupId,
          creatorId,
          recipeId
        }
      });
    },
    removeRecipe(recipeId) {
      this.$store
        .dispatch("removeRecipeFromGroup", {
          recipeId,
          groupId: this.$route.params.groupId
        })
        .then(() => this.$toast.Success("Recipe Deleted Successfully"));
    },
    uploadRecipe() {}
  },
  computed: {
    isGroupAdmin() {
      return this.$store.getters.isGroupAdmin;
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
.rec-item {
  display: flex;
  .space {
    width: 20px;
    display: inline-block;
    background-color: white;
  }
  .el-collapse-item {
    flex-grow: 1;
  }
}
@media only screen and (min-width: 600px) {
  ul,
  ol {
    padding-top: 5vh;
    li > .quantity {
      font-size: 1.3em !important;
    }
    li {
      list-style: unset;
    }
  }
  h1 {
    margin: 15px 0;
    font-size: 1.75em;
  }
  .accordion {
    margin: 0 50px;
    .recipes-header {
      display: flex;
      align-items: center;
      h1 {
        color: #607d8b;
        font-size: 30px;

        margin-right: 5px;
      }
    }
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
      object-fit: cover;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .collapse-context {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .el-collapse-item__header {
  }
  i {
    margin-left: 5px;
    font-size: 2em;
    &:hover {
      color: lightseagreen;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 600px) {
  ul,
  ol {
    // padding-top: 5vh;
    li > .quantity {
      font-size: 1.3em !important;
    }
    li {
      list-style: unset;
    }
  }
  h1 {
    margin: 15px 0;
    font-size: 1.75em;
  }
  .accordion {
    // margin-left: 26px;
    .recipes-header {
      display: flex;
      align-items: center;
      h1 {
        color: #607d8b;
        font-size: 30px;

        margin-right: 5px;
      }
    }
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
      object-fit: cover;

      height: 100%;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .collapse-context {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .el-collapse-item__header {
  }
  i {
    margin-left: 5px;
    font-size: 2em;
    &:hover {
      color: lightseagreen;
      cursor: pointer;
    }
  }
}
</style>
