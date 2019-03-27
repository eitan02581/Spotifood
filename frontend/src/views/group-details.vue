<template>
  <section v-if="group" class="group-details">
    <div data-aos="fade" data-aos-duration="700" data class="top-title">
      <h1>{{group.title}}</h1>
    </div>
    <div data-aos="fade" data-aos-duration="700" v-if="imgs" class="img-carusel">
      <!-- for desktop -->
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="img in imgs" :key="img">
          <img :src="img" alt>
        </el-carousel-item>
      </el-carousel>
      <!-- for phone -->
      <!-- <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="img in imgs" :key="img">
          <img :src="img" alt>
        </el-carousel-item>
      </el-carousel>-->
      <!-- <img src="../assets/group-imgs/tabl1.jpg" alt> -->
    </div>

    <div data-aos="fade" data-aos-duration="700" class="join-btn-holder">
      <router-link :to="'/user/' + admin._id">
        <div class="hosted-by-container">
          <div class="hosted">
            <h1>Hosted By: {{admin.username}}</h1>
          </div>
          <div class="image">
            <img :src="admin.img" alt>
          </div>
        </div>
      </router-link>
      <div class="full-message" v-if="!isPlaceLeft">
        <h1>Event is full</h1>
      </div>
      <template v-if="isAdmin">
        <pandingUser :groupId="group._id" :pendUsers="pendUsers"></pandingUser>
      </template>
      <template v-if="!isAdmin && user && isPlaceLeft">
        <div v-if="isAbleToJoin" class="join-btn-container">
          <div class="join-btn-container">
            <el-button @click.native="onStatusActionGroup('join')" type="success">Join +</el-button>
          </div>
        </div>
        <div v-else class="cancel- btn-container">
          <div class="cancel-btn-container">
            <el-button @click.native="onStatusActionGroup('leave')" type="danger">leave</el-button>
          </div>
        </div>
      </template>
      <template v-if="!isAdmin && !user && isPlaceLeft">
        <router-link to="/login">
          <div class="join-btn-container">
            <el-button @click.native="onStatusActionGroup('join')" type="success">Join +</el-button>
          </div>
        </router-link>
      </template>
    </div>
    <div class="main">
      <div class="group-info">
        <div data-aos="fade-down-right" data-aos-duration="1000" class="info-container">
          <div class="title">
            <h1>{{group.title}}</h1>
          </div>
          <div class="main-group-info">
            <div class="loc">
              <h3>At {{group.place.city}} {{group.place.country.longName}}</h3>
            </div>
            <div class="top">
              <div class="time">
                <img src="../assets/icons/clock.svg" alt>
                <h3>{{group.time | time }}</h3>
              </div>
              <div class="event-type">
                <img src="../assets/icons/plate.svg" alt>
                <h3>{{group.eventType}}</h3>
              </div>
              <div class="guests">
                <img src="../assets/icons/guests.svg" alt>
                <h3>{{group.guests - group.users.length}} Place left</h3>
              </div>
            </div>
            <div class="cuisine-type">
              <img src="../assets/icons/shef.svg" alt>
              <el-tag type="info" v-for="cuisine in group.cuisineType" :key="cuisine">{{cuisine}}</el-tag>
            </div>
            <div v-if="group.hashtags.length >=1" class="hashtags">
              <span class="hash">#</span>
              <el-tag type="warning" v-for="hashtag in group.hashtags" :key="hashtag">#{{hashtag}}</el-tag>
            </div>
          </div>
        </div>
        <div data-aos="fade-up-right" data-aos-duration="1000" class="desc-container">
          <h1>Description</h1>
          <p>Italian cuisine has a great variety of different ingredients which are commonly used, ranging from fruits, vegetables, sauces, meats, etc. In the North of Italy, fish (such as cod, or baccalà), potatoes, rice, corn (maize), sausages, pork, and different types of cheeses are the most common ingredients. Pasta dishes with use of tomato are spread in all Italy.[33][34] Italians like their ingredients fresh and subtly seasoned and spiced.</p>
        </div>
      </div>
      <div class="users-aside">
        <div data-aos="fade-down-left" data-aos-duration="1000" class="users-container">
          <div class="participants">
            <h1>Participants</h1>
            <!-- <h2 style="color:#f44336">{{group.users.length + '/' + group.guests }}</h2> -->
            <h2
              style="color:#f44336"
            >{{seatsLeft === 0 ? 'Full' : group.users.length + ' of ' + group.guests }}</h2>
          </div>
          <div class="list">
            <participantList :users="users"></participantList>
          </div>
        </div>
        <div data-aos="fade-up-left" data-aos-duration="1000" class="chat-container"></div>
      </div>
    </div>
    <div data-aos="fade-right" data-aos-duration="700" class="recpies-container">
      <recipes-list :recipes="group.recipes"/>
    </div>
    <div data-aos="fade-left" data-aos-duration="700" class="map-container">
      <gmap-map :center="eventLocation" :zoom="12">
        <gmap-marker :position="eventLocation"></gmap-marker>
      </gmap-map>
    </div>
  </section>
</template>

<script>
import groupMainContent from "../components/groups/group-details/group-main-content-cmp";
import recipesList from "../components/groups/group-details/group-recipes-list-cmp";
import loadingCmp from "../components/loading-cmp";
import pandingUser from "../components/groups/group-details/pending-users-cmp";
import { gmapApi } from "vue2-google-maps";
import participantList from "../components/groups/group-details/participants-list-cmp";

export default {
  data() {
    return {
      isAbleToJoin: true,
      // isAdmin: true,
      user: null,
      currLoc: null,
      imgs: null,
      admin: null
    };
  },
  components: {
    recipesList,
    loadingCmp,
    groupMainContent,
    pandingUser,
    participantList
  },
  created() {
    this.currLoc = {
      lat: 35,
      lng: 35
    };
    console.log("group details created!");
    this.$store
      .dispatch({ type: "getGroupById", groupId: this.$route.params.groupId })
      // get group
      .then(() => {
        this.imgs = this.getImgs();
        // this.admin = getAdmin()
        this.user = this.$store.getters.user;
        this.checkIfUserIsAdmin();
      })
      // check if user able to join a group
      .then(() => {
        this.checkIfUserAbaleToJoin();
      });
  },
  computed: {
    google: gmapApi,

    group() {
      return this.$store.getters.group;
    },
    pendUsers() {
      return this.$store.getters.pendUsers;
    },
    isAdmin() {
      return this.$store.getters.isGroupAdmin;
    },
    isPlaceLeft() {
      var guests = this.$store.getters.group.guests;
      var participants = this.$store.getters.group.users.length;
      return guests - participants > 0 ? true : false;
    },
    users() {
      return this.$store.getters.group.users;
    },
    eventLocation() {
      return this.$store.getters.group.location;
    },
    seatsLeft() {
      var group = this.$store.getters.group;
      return group.guests - group.users.length;
    }
  },
  methods: {
    getImgs() {
      var imgs = [];
      console.log(this.$store.getters.group.recipes);

      this.$store.getters.group.recipes.forEach(recipe => {
        if (recipe.imgs.length >= 1) {
          var [img] = recipe.imgs;

          imgs.push(img);
        }
      });
      var groupImg = this.$store.getters.group.img;
      imgs.push(groupImg);
      return imgs;
    },
    getAdmin() {
      // var
      //  return  this.$store.dispatch({})
    },
    // this.imgs = this.$store.getters.group.recipes.((recipe) =>  )
    onStatusActionGroup(status) {
      var user = this.$store.getters.user;
      var group = this.$store.getters.group;
      if (status === "join") {
        this.$store
          .dispatch({
            type: "askJoinGroup",
            ids: { userId: user._id, groupId: group._id }
          })
          .then(() => {
            this.$toast.Success("Request Sent");
            this.isAbleToJoin = false;
          });
      } else {
        this.$store
          .dispatch({
            type: "removeUserFromGroup",
            ids: { userId: user._id, groupId: group._id }
          })
          .then(() => {
            this.$toast.Error("Request Canceled");

            this.isAbleToJoin = true;
          });
      }
    },
    checkIfUserIsAdmin() {
      this.$store
        .dispatch({
          type: "getUserById",
          userId: this.$store.getters.group.admin
        })
        // check if admin
        .then(adminUser => {
          this.admin = adminUser;
          // if user is the group admin => disable to join
          if (this.user._id !== adminUser._id) {
            this.$store.commit({ type: "setIsGroupAdmin", bool: false });
            // this.isAdmin = false;
          } else {
            this.$store.commit({ type: "setIsGroupAdmin", bool: true });
            // this.isAdmin = true;
          }
          this.$store.commit("setAdminObj", { admin: adminUser });
        });
    },
    checkIfUserAbaleToJoin() {
      // console.log("here");

      var group = this.$store.getters.group;
      // TODO: CHECK IF EVEN IF THERE ARE NULLS AND A REAL PENDING USER , IF IT WORKS
      // TODO: CHANGE FINDINDEX TO INCLUDES
      var isPending = group.pendingUsers.findIndex(pending => {
        if (pending) {
          return pending === this.user._id;
        }
      });
      var isParticipant = group.users.findIndex(participant => {
        return participant._id === this.user._id;
      });

      if (isPending !== -1 || isParticipant !== -1) {
        this.isAbleToJoin = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 90px 30px 0 30px;
  // background-color: lightcoral;
  .top-title {
    h1 {
      text-align: center;
      font-size: 52px;
      color: #f44336;
      margin-bottom: 50px;
    }
  }
  .img-carusel {
    // background-color: lightgreen;
    width: 100%;
    height: 500px;
    // margin-bottom: 100px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    // width: 100%;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
      background-color: unset;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
      background-color: unset;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
      background-color: unset;
    }
  }
  .join-btn-holder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    margin-top: -100px;
    position: relative;
    .hosted-by-container {
      margin-top: -40px;
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      .hosted {
        h1 {
          font-size: 35px;
          color: #607d8b;
        }
      }
      .image {
        padding-left: 20px;
        img {
          width: 76px;
          border-radius: 51px;
          border: 5px solid white;
        }
      }
    }

    button {
      height: 50px;
      width: 261px;
    }
  }
  .main {
    display: flex;
    // background-color: lightseagreen;
    width: 100%;
    height: 500px;
    // margin-bottom: 100px;
    .group-info {
      // background-color: lightslategray;
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .title {
        h1 {
          // color: #3a4348;
          // display: inline-block;
          // background-color: white;
          margin-bottom: 20px;
          // border-radius: 8px;
          color: #f44336;
        }
      }
      .main-group-info {
        width: 100%;

        display: inline-block;
        background-color: white;
        padding: 12px;
        border-radius: 8px;
        color: #f44336;
        padding-bottom: 30px;

        .loc {
          h3 {
            margin-top: 10px;
            font-size: 20px;
            color: #3a4348;
            padding-left: 10px;
          }
        }
      }

      .info-container {
        // background-color: lawngreen;
        width: 100%;
        height: 100%;
        .top {
          display: flex;
          margin-top: 20px;
        }
        .time,
        .event-type,
        .guests,
        .cuisine-type {
          display: flex;
          align-items: center;
          padding: 4px;
          height: 42px;
          h3 {
            color: #f44336;
          }
          h1 {
            display: flex;
            align-items: center;
          }
          img {
            width: 24px;
          }
        }
        .cuisine-type {
          margin-bottom: 15px;
        }
        .hashtags {
          display: flex;
          align-items: center;
          span.hash {
            font-size: 21px;
            color: coral;
            padding-left: 7px;
            padding-right: 7px;
          }
        }
      }
      .desc-container {
        // background-color: lightgrey;
        margin-top: 40px;

        width: 100%;
        height: 100%;
        background-color: white;
        padding: 12px;
        border-radius: 8px;
        h1 {
          color: #607d8b;
          font-size: 28px;

          margin-bottom: 20px;
        }
        p {
          line-height: 20px;
        }
      }
    }
    .users-aside {
      // background-color: lightgoldenrodyellow;
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      .users-container {
        // background-color: azure;
        width: 100%;
        padding: 0 5px 20px 5px;
        .participants {
          text-align: center;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;

          h1 {
            color: #607d8b;
            font-size: 28px;
          }
          h2 {
            margin-top: 3px;
            margin-left: 15px;
          }
        }
        .list {
          // display: inline-block;
          background-color: white;
          padding: 12px;
          border-radius: 8px;
          display: flex;
          justify-content: flex-start;
        }
        // height: 40%;
      }
      .chat-container {
        background-color: lightsalmon;
        width: 100%;
        height: 100%;
      }
    }
  }
  .recpies-container {
    // margin-bottom: 100px;
    // background-color: seagreen;
    width: 100%;
    height: 300px;
  }
  .map-container {
    margin-bottom: 100px;
    // background-color: lightsteelblue;
    width: 100%;
    height: 300px;
    .vue-map-container {
      height: 100%;
    }
  }
}

// .full-message {
//   position: fixed;
//   right: 0;
//   margin-right: 30px;
//   background-color: #f44336;
//   padding: 20px;
//   color: white;
//   border-radius: 50px;
//   cursor: default;
// }
// .join-btn-container,
// .cancel-btn-container {
//   text-align: center;
//   button {
//     position: fixed;
//     right: 0;
//     margin-right: 50px;
//   }
// }
</style>
