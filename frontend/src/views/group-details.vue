<template>
  <section class="group-details">
    <details-aside :userCards="userCards" :groupCards="groupCards"/>
  </section>
</template>

<script>
import detailsAside from "../components/groups/group-aside-cmp.vue";

export default {
  data() {
    return {
      userCards: [
        {
          username: "yovelb",
          img: "https://api.adorable.io/avatars/300/yovelb",
          groups: [],
          password: "123",
          favCategories: [],
          isAdmin: false
        },
        {
          username: "Eitan",
          img: "https://api.adorable.io/avatars/300/Eitan",
          groups: [],
          password: "123",
          favCategories: [],
          isAdmin: false
        }
      ],
      groupCards: [
        {
          _id: 'pio40jv',
          title: "sprint 1",
          img: "https://api.adorable.io/avatars/300/sprint1",
          users: [],
          recipes: [],
          time: 1553090054008,
          location: { lat: 32.088002, lng: 34.803081 },
          place: "coding academy",
          hashtags: ["Nervous", "Class", "Beef", "Pasta"]
        },
        {
          _id: 'pio40jw',
          title: "sprint 2",
          img: "https://api.adorable.io/avatars/300/sprint2",
          users: [],
          recipes: [],
          time: 1553090054008,
          location: { lat: 32.088002, lng: 34.803081 },
          place: "coding academy",
          hashtags: ["Nervous", "Class", "Beef", "Pasta"]
        }
      ]
    };
  },
  created() {
    console.log(this.$route.params.groupId);
  },
  components: {
    detailsAside
  }
};
</script>

<style>
.group-details {
  height: calc(100vh - 130px - 100px);
}
</style>
