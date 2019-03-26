

<template>
  <section>
    <template v-if="users.length >= 1">
      <div class="participant-item" v-for="user in users" :key="user._id">
        <!-- ONLY FOR ADMIN -->
        <div v-if="isAdmin && user" class="remove-btn">
          <button @click="onRemoveParticipant(user._id)">X</button>
        </div>
        <router-link :to="'/user/' + user._id">
          <participant-preview :user="user"/>
        </router-link>
      </div>
    </template>
  </section>
</template>
  </section>
</template>

<script>
import participantPreview from "./participant-preview-cmp";
export default {
  // TODO: ADD FUNC TO REMOVE  USER
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  components: {
    participantPreview
  },
  data() {
    return {};
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isGroupAdmin;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onRemoveParticipant(userId) {
      var groupId = this.$store.getters.group._id;
      var ids = { userId, groupId };

      this.$store.dispatch({ type: "removeUserFromGroup", ids });
    }
  }
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  .participant-list {
    display: flex;
  }
}
/* h3 {
  color: gray;
  margin-bottom: 10px;
} */
</style>
