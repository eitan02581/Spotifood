<template>
  <section>
    <!-- :style="{ backgroundImage: 'url(' + groupDemoObj.image + ')' }" -->
    <router-link tag="div" :to="'/groups/' + groupDemoObj._id" class="preview-container">
      <h1>{{groupDemoObj.title}}</h1>
      <div class="main">
        <div class="bottom">
          <div class="info-container">
            <h2>{{groupDemoObj.country}} , {{groupDemoObj.city}}</h2>
            <h3>Hosting: {{groupDemoObj.createdBy}}</h3>
            <div class="has-container">
              <span v-for="hash in groupDemoObj.hastag" :key="hash">#{{hash}}</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      groupDemoObj: {
        _id: "dasd",
        image: 'url("assets/preview-demo.jpg")',
        title: "Israeli authentic Experience",
        createdBy: "Eitan Elnekave",
        country: "Israel",
        city: "Ramat Gan",
        hastag: ["carnibors ", "Israeli food"]
      },
      imgBgClass: {
        backgroundImage: ' url("../../assets/preview-demo.jpg")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
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
    width: 249px;
    height: 353px;
    background-image: url("../../assets/preview-demo.jpg");
    background-color: lightseagreen;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    h1 {
      padding-top: 12px;
      text-align: center;
      color: white;
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
        height: 100px;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .info-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        h2,
        h3 {
          color: white;
          padding-left: 7px;
        }
        .has-container {
          span {
            padding-left: 7px;
            color: white;
          }
        }
      }
    }
  }
  .preview-container:hover {
    -webkit-box-shadow: 0px 0px 49px -10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 49px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 49px -10px rgba(0, 0, 0, 0.75);
  }
}
</style>
