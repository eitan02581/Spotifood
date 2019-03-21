<template>
  <section class="group-details">
    <loading-cmp v-if="!group"/>
    <template v-if="group">
      <group-main-content :group="group"/>
      <recipes-list :recipes="group.recipes"/>
    </template>
  </section>
</template>

<script>
import groupMainContent from '../components/groups/group-details/group-main-content-cmp'
import recipesList from "../components/groups/group-details/group-recipes-list-cmp";
import loadingCmp from "../components/loading-cmp";
export default {
  data() {
    return {
    };
  },
  components: {
    recipesList,
    loadingCmp,
    groupMainContent
  },
  created() {
      this.$store
      .dispatch("getGroupById", { _id: this.$route.params.groupId })
    
  },
  computed: {
    group() {
      return this.$store.getters.group
    }
  }
};
</script>

<style>
.group-details {
  min-height: calc(100vh - 230px);
  max-height: 100%;
}
</style>
