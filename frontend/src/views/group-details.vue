<template>
  <section class="group-details">
    <loading-cmp v-if="!group"/>
    <template else>
      <details-aside :users="group.users"/>
      <group-info :group="group"/>
      <recipes-list :recipes="group.recipes"/>
    </template>
  </section>
</template>

<script>
import detailsAside from "../components/groups/group-details/group-aside-cmp";
import groupInfo from "../components/groups/group-details/group-info-cmp";
import recipesList from "../components/groups/group-details/group-recipes-list-cmp";
import loadingCmp from "../components/loading-cmp";
export default {
  data() {
    return {
    };
  },
  components: {
    detailsAside,
    groupInfo,
    recipesList,
    loadingCmp
  },
  created() {
    this.$store
      .dispatch("getGroupById", { _id: this.$route.params.groupId })
  },
  computed: {
    group() {
      console.log('group ',this.$store.getters.group)
      return this.$store.getters.group
    }
  }
};
</script>

<style>
.group-details {
  min-height: calc(100vh - 230px);
  max-height: 100%;
  width: 80vw;
  /* overflow: scroll; */
  /* top: 130px; */
}
</style>
