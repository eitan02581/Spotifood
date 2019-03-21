<template>
  <section class="accordion">
    <el-collapse v-model="activeName" accordion v-for="(recipe,idx) in recipes" :key="idx">
      <el-collapse-item :title="recipe.title" :name="idx">
        <ul>
          <li
            v-for="(ingredient, idx) in Object.keys(recipe.ingredients)"
            :key="idx">
            {{ingredient}} - {{recipe.ingredients[ingredient]}}
          <!-- {{Object.entries(ingredient)[0][1] + ' ' + Object.entries(ingredient)[0][0]}} -->
          </li>
        </ul>
        <ol>
          <li 
            v-for="instruction in recipe.instructions" 
            :key="instruction">
              {{instruction}}
          </li>
        </ol>
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
  computed: {}
};
</script>

<style scoped>
ul,ol{
  padding: 2vw;
}
.accordion{
  width: 70vw;
  margin-left: 5vw;
}
</style>
