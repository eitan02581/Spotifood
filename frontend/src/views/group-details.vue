<template>
  <section class="group-details">
    <loading-cmp v-if="!group"/>
    <template v-else>
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
import loadingCmp from '../components/loading-cmp'
export default {
  data() {
    return {
      group: null
    };
  },
  components: {
    detailsAside,
    groupInfo,
    recipesList,
    loadingCmp
  },
  created() {
    console.log(this.$route.params.groupId);
    // console.log(this.$store.getters.groups[0]);
    this.$store.dispatch('getGroupById',{_id:this.$route.params.groupId})
    .then(group=> this.group = group)
    console.log("Hello there", this.$store.getters.groups[0]);
    // this.group = this.$store.getters.groups[0];
  }
};
</script>

<style>
.group-details {
  height: calc(100vh - 230px);
  width: 80vw;
  /* overflow: scroll; */
  top: 130px;

}
</style>
