<template>
  <section>
    <div class="cuisine-cards-cotnainer">
      <div
        @click="onFilter( 'cuisineType', cusine.name)"
        class="card"
        v-for="cusine in cusines"
        :key="cusine.name"
      >
        <div class="image">
          <img :src="cusine.img" alt>
        </div>
        <div class="title">
          <h1 :class="cusine.name">{{cusine.name}}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cusines: [
        {
          name: "French",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553940296/demo/ok4mseurarbch6dq8n8o.jpg"
        },
        {
          name: "Italian",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553939032/demo/liromqabvewg9dlbtfuf.jpg"
        },
        {
          name: "Israeli",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553940382/demo/sejxmsyjksn8nz94fwbu.jpg"
        },
        {
          name: "Chinese",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553938638/demo/blzyqdxjdcifkxtqt6da.jpg"
        }
      ]
    };
  },
  methods: {
    onFilter(filterBy, val) {
      this.$emit("filterBy", filterBy, val);
    }
  }
};
</script>

<style scoped lang="scss">
.cuisine-cards-cotnainer {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  .card:last-child {
    margin: 0;
  }
  .card {
    flex-grow: 1;
    cursor: pointer;
    width: 250px;
    height: 300px;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    .image {
      height: 100%;
      width: 100%;
      transition: 0.3s;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: 0.3s;
      }
    }
    .title {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: flex-end;
      h1 {
        text-transform: capitalize;
        text-align: center;
        padding-bottom: 20px;
        color: white;
        font-size: 40px;
        transition: 0.3s;
      }
    }
  }
  .card:hover {
    .image {
    }
    h1 {
      font-size: 50px;
    }
    .Israeli {
      color: #03a9f4;
    }
    .French {
      color: #03a9f4;
    }
    .Italian {
      color: #4caf50;
    }
    .Chinese {
      color: #f44336;
    }
  }
}
</style>
