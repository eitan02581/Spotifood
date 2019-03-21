<template>
  <section class="accordion">
    <el-collapse v-model="activeName" accordion v-for="(recipe,idx) in recipes" :key="recipe._id">
      <el-collapse-item :title="recipe.title" :name="idx">
        <ul>
          <li
            v-for="ingredient in Object.keys(recipe.ingredients)"
            :key="ingredient">
            {{recipe.ingredients[ingredient]}} {{ingredient}}
          </li>
        </ul>
        <ol>
          <li 
            v-for="(instruction,idx) in recipe.instructions" 
            :key="idx">
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
