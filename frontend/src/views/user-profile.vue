<template>
  <section class="profile-container">
    <profile-details
      :isMyUserProfile="isMyUserProfile"
      :user="user"
      :groups="userGroups"
      v-if="user"
    />
  </section>
</template>

<script>
import profileDetails from "../components/users/profile-details-cmp";

export default {
  components: {
    profileDetails
  },
  data() {
    return {
      user: null,
      groups: [],
      managedGroups: [],
      isMyUserProfile: false
    };
  },
  created() {
    var userId = this.$route.params.userId;
    this.isMyUserProfile =
      this.$store.getters.user && this.$store.getters.user._id === userId
        ? true
        : false;
    this.$store.dispatch({ type: "getUserById", userId }).then(user => {
      this.user = user;
      if (user.groups) this.getUserGroups();
    });
  },
  methods: {
    getUserGroups() {
      this.user.groups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          this.groups.push(group);
        });
      });

      this.user.createdGroups.forEach(groupId => {
        this.$store.dispatch({ type: "getGroupById", groupId }).then(group => {
          this.managedGroups.push(group);
        });
      });
    }
  },
  computed: {
    userGroups() {
      return this.groups.concat(this.managedGroups);
    }
  }
};
</script>

<style scoped lang="scss">
.profile-container {
  padding-top: calc(50px + 25%);
  // max-width: 1200px;
  min-height: calc(100vh - 200px);
  width: 100%;
  margin: 0 auto;
}
</style>
