<template>
  <section class="accordion">
    <el-collapse v-model="activeName" accordion v-for="(recipe,idx) in recipes" :key="idx">
      <el-collapse-item :title="recipe.title" :name="idx">
        <ul>
          <li
            v-for="(ingredien,idx) in recipe.ingrediens"
            :key="idx">
          {{Object.entries(ingredien)[0][1] + ' ' + Object.entries(ingredien)[0][0]}}
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
