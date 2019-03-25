<template>
  <section v-if="groupAdmin">
    <router-link tag="div" :to="'/groups/' + group._id" class="preview-container">
      <div class="img-container" :style="{ backgroundImage: 'url(' + group.img + ')' }"></div>
      <div class="main">
        <div class="bottom">
          <img :src="groupAdmin.img" alt>
          <div class="info-container">
            <h2>
              Hosted by:
              <span>{{groupAdmin.username}}</span>
            </h2>
            <h2>in {{group.place.city}}, {{group.place.country.shortName}}</h2>
            <h3>
              <div class="meal">{{group.eventType}}</div>
            </h3>
            <h1>{{group.title}}</h1>
            <h2 style="color:#f44336">{{seatsLeft === 0 ? 'Full' : seatsLeft + ' seats left'}}</h2>
            <!-- {{group.hashtags}} -->
            <h3>
              <i style="color:orange" class="fas fa-star"></i>
              <i style="color:orange" class="fas fa-star"></i>
              <i style="color:orange" class="fas fa-star"></i>
              <i style="color:orange" class="fas fa-star"></i>
              <i style="color:orange" class="fas fa-star"></i> (37)
            </h3>
            <div class="has-container">
              <el-tag type="warning" v-for="hashtag in group.hashtags" :key="hashtag">#{{hashtag}}</el-tag>
              <!-- <span v-for="hash in group.hashtags" :key="hash">#{{hash}}</span> -->
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true,
      default: function() {
        return "EMPTY";
      }
    }
  },
  data() {
    return {
      groupAdmin: null
    };
  },
  computed: {
    seatsLeft() {
      return this.group.guests - this.group.users.length;
    }
  },
  async created() {
    this.groupAdmin = await this.$store.dispatch({
      type: "getUserById",
      userId: this.group.admin
    });
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 10px;
  display: inline-block;
  .preview-container {
    display: inline-block;
    position: relative;
    margin: 20px;
    width: 280px;
    height: 488px;

    // border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    .img-container {
      height: 250px;
      width: 280px;
      // background-image: url("../../assets/preview-demo.jpg");
      background-color: lightseagreen;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    h1 {
      padding-top: 12px;
      text-align: center;
      color: #414a55;
      font-size: 19px;
    }

    .main {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 80%;
      background: linear-gradient(
        to bottom,
        rgba(50, 50, 50, 0) 0%,
        rgba(16, 15, 15, 0.67) 89%,
        rgba(16, 15, 15, 0.93) 120%
      ) !important;
      border-radius: 0 0 10px 10px;
      .bottom {
        width: 100%;
        background-color: white;
        height: 238px;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        img {
          width: 60px;
          height: 60px;
          border: 3px white solid;
          background-color: white;
          border-radius: 73px;
          position: absolute;
          top: -30px;
          left: 110px;
          object-fit: contain;
        }
        .info-container {
          padding-top: 27px;

          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: center;
        }
        h2 {
          font-size: 14px;
          span {
            color: orangered;
          }
        }
        h3 {
          font-size: 13px;
        }
        .meal {
          background-color: rgb(223, 226, 231);

          display: inline-block;
          padding: 3px;
        }
        h2,
        h3 {
          color: #414a55;
          padding-left: 7px;
        }
        .has-container {
          // overflow-x: scroll;
          overflow-y: hidden;
          white-space: nowrap;

          span {
            padding-left: 7px;
            color: #414a55;
          }
        }
      }
    }
  }
  .preview-container:hover {
  }
}
</style>
