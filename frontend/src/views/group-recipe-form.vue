<template>
  <section class="recipe-form" v-loading="isLoading">
    <h1 class="wrong-route" v-if="!recipe.createdBy">Who U?</h1>
    <form v-else>
      <h1>{{formTitle}}</h1>
      <label>Title:
        <el-input placeholder="Enter Recipe Title" v-model="recipe.title"></el-input>
        <br>
      </label>
      <label v-for="(ingredient,idx) in ingredients" :key="idx + 'ingredient'">Ingredient:
        <el-input-number v-model="ingredientsQuantity[idx]" :step="0.25" :max="100"></el-input-number>
        <el-input placeholder="ingredient" v-model="ingredients[idx]"></el-input>
        <br>
      </label>
      <label
        v-for="(instruction,idx) in recipe.instructions"
        :key="idx + 'instruction'"
        style="display: inherit; width: 100%;"
      >Instruction:
        <el-input
          type="textarea"
          autosize
          placeholder="Enter Instruction"
          v-model="recipe.instructions[idx]"
        ></el-input>
      </label>
      <i class="fas fa-plus-circle" @click="addTextArea" title="Add Instruction"></i>
      <br>
      <label>Prep Time:
        <el-input-number v-model="recipe.prepTime" :step="1" :max="10000"></el-input-number>
        <br>
      </label>
      <label>Categories:
        <el-select multiple v-model="recipe.categories" filterable placeholder="Select Categories">
          <el-option
            v-for="category in allCategories"
            :key="category"
            :label="category"
            :value="category"
          ></el-option>
        </el-select>
      </label>
      <div class="upload-gallery">
        <div class="exist-imgs" v-for="(img,idx) in recipe.imgs" :key="idx + img">
          <!-- TODO: SHOW DELETE AND PREVIEW ON HOVER -->
          <img :src="img">
        </div>
        <el-upload
          action="http://localhost:3007/upload-img"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="onUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div>
      <el-button plain @click="SaveRecipe">Submit</el-button>
    </form>
  </section>
</template>

<script>
import recipeService from "../services/RecipeService";
import uploadService from "../services/UploadService";
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
      ingredients: [""],
      ingredientsQuantity: [],
      dialogImageUrl: "",
      dialogVisible: false,
      uploadedImgs: {},
      isLoading: false
    };
  },
  methods: {
    addTextArea() {
      this.recipe.instructions.push("");
    },
    SaveRecipe() {
      this.isLoading = true;
      this.recipe.ingredients = {};

      this.ingredients.forEach((ingredient, idx) => {
        if (!ingredient || !this.ingredientsQuantity[idx]) return;
        this.recipe.ingredients[ingredient] = this.ingredientsQuantity[idx];
      });

      let imgsUrls = Object.values(this.uploadedImgs);

      var saveRecipe = this.recipeId
        ? recipeService.updateRecipe(this.recipe, imgsUrls)
        : recipeService.addRecipe(this.recipe, this.groupId, imgsUrls);
      saveRecipe.then(() => {
        if (this.recipeId) this.$toast.Success("Recipe Updated Successfully");
        else this.$toast.Success("Recipe Added Successfully");
        this.isLoading = false;
        this.$router.push(`/groups/${this.groupId}`);
      })
      .catch(err=>{
        this.$toast.Error("Something went wrong");
        console.log('err',err)
      })
    },
    addIngredientInput() {
      if (
        this.ingredients[this.ingredients.length - 1] &&
        this.ingredientsQuantity[this.ingredients.length - 1]
      ) {
        this.ingredients.push("");
        this.ingredientsQuantity.push(0);
      }
    },
    handleRemove(file, fileList) {
      delete this.uploadedImgs[file.uid];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImg(input) {
      const formData = new FormData();
      formData.append("file", input.file);
      uploadService.uploadImg(formData).then(url => {
        this.uploadedImgs[input.file.uid] = url;
      });
    },
    onUpload(url, file, fileList) {
      this.uploadedImgs[file.uid] = url;
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
.upload-img {
  width: 100px;
  height: 100px;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dotted gainsboro;
  border-radius: 10px;
}
.upload-gallery {
  display: flex;
  flex-wrap: wrap;
  .exist-imgs > img {
    height: 148px;
    width: 148px;
    object-fit: fill;
    border-radius: 5px;
    margin-right: 10px;
  }
}
</style>
