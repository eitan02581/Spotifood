<template>
  <section class="profile-experience">
    <el-timeline :reverse="false">
      <el-timeline-item
        v-for="group in groups"
        :key="group._id"
        :timestamp="group.time | time"
      >{{group.title}}</el-timeline-item>
    </el-timeline>
    <div class="cuisines">
      <h3 v-if="user.favCategories.length">
        Cuisines:
        <i class="far fa-edit" v-if="isMyUserProfile" @click="editCuisine"></i>
      </h3>
      <ul>
        <li v-for="countryUrl in countriesFlags" :key="countryUrl">
          <img :src="countryUrl">
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true
    },
    isMyUserProfile:{
      type: Boolean,
      required: true
    }
  },
  computed: {
    countriesFlags() {
      return this.user.favCategories.map(category => {
        switch (category) {
          case "British":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532475/demo/eebgewy30zwm0nauyift.png";
          case "American":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532519/demo/huhedgc4ziopzei1fxed.png";
          case "Chinese":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553532383/demo/vs51q9wpjurnjdr3jgtk.png";
          case "Vegan":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604325/demo/yiqc4rpj6amsdb4sxfm1.png";
          case "France":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604377/demo/iuqym1xcmag0qivg76qk.png";
          case "Indian":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604410/demo/hh4m1bjiyt95wg1nrwj0.png";
          case "Italian":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604440/demo/bwmszyygti1j44iaklxe.png";
          case "Israeli":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604468/demo/vey7zynb2msqr5p4ntlh.png";
          case "Vietnamese":
            return "http://res.cloudinary.com/sprint4-weat/image/upload/v1553604700/demo/tpbcpaqyquiygqozek52.png";
          default:
            return;
        }
      });
      // china
      // http://res.cloudinary.com/sprint4-weat/image/upload/v1553532383/demo/vs51q9wpjurnjdr3jgtk.png
      // british
      // http://res.cloudinary.com/sprint4-weat/image/upload/v1553532475/demo/eebgewy30zwm0nauyift.png
      // American
      // http://res.cloudinary.com/sprint4-weat/image/upload/v1553532519/demo/huhedgc4ziopzei1fxed.png
    },
  },
  methods:{
    editCuisine(){
      this.$emit('editCuisine')
    }
  }
};
</script>

<style lang=scss>
.profile-experience {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    max-height: 270px;
    overflow: overlay;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
}
.cuisines {
  h3 {
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    & > li > img {
      width: 30px;
      height: 30px;
    }
  }
  .fa-edit:hover{
    color: gray;
  }
}
</style>
