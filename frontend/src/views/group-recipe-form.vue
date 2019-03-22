<template>
  <section class="recipe-form">
    <h1 class="wrong-route" v-if="!recipe.createdBy">Who U?</h1>
    <form @submit.prevent="SaveRecipe" v-else>
      <h1>{{formTitle}}</h1>
      <label>
        Title:
        <el-input placeholder="Enter Recipe Title" v-model="recipe.title"></el-input>
        <br>
      </label>
      <label v-for="(ingredient,idx) in ingredients" :key="idx + 'ingredient'">
        Ingredient:
        <el-input-number v-model="ingredientsQuantity[idx]" :step="0.25" :max="100"></el-input-number>
        <el-input placeholder="ingredient" v-model="ingredients[idx]"></el-input>
        <br>
      </label>
      <label
        v-for="(instruction,idx) in recipe.instructions"
        :key="idx + 'instruction'"
        style="display: inherit; width: 100%;"
      >
        Instruction:
        <el-input
          type="textarea"
          autosize
          placeholder="Enter Instruction"
          v-model="recipe.instructions[idx]"
        ></el-input>
      </label>
      <i class="fas fa-plus-circle" @click="addTextArea" title="Add Instruction"></i>
      <br>
      <label>
        Prep Time:
        <el-input-number v-model="recipe.prepTime" :step="1" :max="10000"></el-input-number>
        <br>
      </label>
      <label>
        Categories:
        <el-select multiple v-model="recipe.categories" filterable placeholder="Select Categories">
          <el-option
            v-for="category in allCategories"
            :key="category"
            :label="category"
            :value="category"
          ></el-option>
        </el-select>
      </label>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
        <span v-for="img in recipe.imgs" :key="img">
          <!-- Check How Shows All Photos -->
          <img :src="img">
        </span>
      </el-dialog>
      <button>Submit</button>
    </form>
  </section>
</template>

<script>
import recipeService from "../services/RecipeService";
export default {
  data() {
    return {
      groupId: this.$route.query.groupId,
      recipeId: this.$route.query.recipeId,
      recipe: {
        title: "",
        imgs: [],
        ingredients: {},
        instructions: [""],
        categories: [],
        prepTime: null,
        createdAt: null,
        createdBy: this.$route.query.creatorId
      },
      allCategories: [],
      dialogImageUrl: "",
      dialogVisible: false,
      ingredients: [""],
      ingredientsQuantity: []
    };
  },
  methods: {
    addTextArea() {
      this.recipe.instructions.push("");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    SaveRecipe() {
      this.recipe.ingredients = {};
      this.ingredients.forEach((ingredient, idx) => {
        if (!ingredient || !this.ingredientsQuantity[idx]) return;
        this.recipe.ingredients[ingredient] = this.ingredientsQuantity[idx];
      });
      if (this.recipeId) {
        recipeService
          .updateRecipe(this.recipe)
          .then(() => console.log("Saved!"));
      } else {
        //TODO: Add recipe to group!
        recipeService.addRecipe(this.recipe).then(() => console.log("Added!"));
      }
    },
    addIngredientInput() {
      if (
        this.ingredients[this.ingredients.length - 1] &&
        this.ingredientsQuantity[this.ingredients.length - 1]
      ) {
        this.ingredients.push("");
        this.ingredientsQuantity.push(0);
      }
    }
  },
  computed: {
    formTitle() {
      return this.recipeId ? "Edit Recipe" : "Add Recipe";
    }
  },
  created() {
    if (this.recipeId) {
      recipeService.getRecipeById(this.recipeId).then(recipe => {
        this.recipe = recipe;
        this.ingredients = Object.keys(recipe.ingredients);
        this.ingredientsQuantity = Object.values(recipe.ingredients);
      });
    }
    this.allCategories = this.$store.getters.categories;
  },
  watch: {
    ingredients() {
      this.addIngredientInput();
    },
    ingredientsQuantity() {
      this.addIngredientInput();
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-form {
  margin-top: 50px;
  min-height: calc(100vh - 250px);
}
.wrong-route {
  font-size: 3em;
  position: absolute;
  left: 45vw;
  top: 40vh;
}
.el-input {
  width: 40vw;
}
.el-input-number {
  width: 140px;
}
i {
  margin-left: 5px;
  font-size: 1.5em;
  &:hover {
    color: lightseagreen;
    cursor: pointer;
  }
}
form {
  display: flex;
  flex-direction: column;
  width: 70vw;
  min-height: 100%;
  justify-content: center;
  margin: auto;
  align-items: baseline;
  & > * {
    margin-bottom: 15px;
  }
}
</style>
