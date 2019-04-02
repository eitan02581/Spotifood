<template>
  <section>
    <div class="cuisine-cards-cotnainer">
      <div
        @click="onFilter( 'cuisineType', cuisine.name , cuisine.color)"
        class="card"
        v-for="cuisine in cusines"
        :key="cuisine.name"
      >
        <div class="image">
          <img :src="cuisine.img" alt>
        </div>
        <div class="title">
          <h1 :class="cuisine.name">{{cuisine.name}}</h1>
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
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553940296/demo/ok4mseurarbch6dq8n8o.jpg",
          color: "03a9f4"
        },
        {
          name: "Italian",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553939032/demo/liromqabvewg9dlbtfuf.jpg",
          color: "4caf50"
        },
        {
          name: "Israeli",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553940382/demo/sejxmsyjksn8nz94fwbu.jpg",
          color: "03a9f4"
        },
        {
          name: "Chinese",
          img:
            "http://res.cloudinary.com/sprint4-weat/image/upload/v1553938638/demo/blzyqdxjdcifkxtqt6da.jpg",
          color: "f44336"
        }
      ]
    };
  },
  methods: {
    onFilter(filterBy, val, color) {
      console.log(color);

      this.$emit("filterBy", filterBy, val, color);
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
    margin-right: 0;
  }
  .card:first-child {
    margin-left: 0;
  }
  .card {
    margin: 0 23.3px;
    flex-grow: 1;
    max-width: 250px;
    cursor: pointer;
    width: 250px;
    height: 300px;
    position: relative;
    display: inline-block;
    .image {
      height: 100%;
      width: 250px;
      transition: 0.3s;
      img {
        height: 100%;
        width: 250px;
        object-fit: cover;
        transition: 0.3s;
      }
    }
    .title {
      width: 250px;
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
@media (max-width: 1200px) {
  .cuisine-cards-cotnainer {
    .card {
      margin: 0 1.95vw;
    }
  }
}
</style>
