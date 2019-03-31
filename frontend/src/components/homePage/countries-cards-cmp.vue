<template>
  <section>
    <div class="country-cards-cotnainer">
      <div class="card">
        <div class="image">
          <img src="../../assets/group-imgs/israel.jpg" alt>
        </div>
        <div class="title">
          <!-- <h1 :class="country.name">Israel</h1> -->
        </div>
      </div>
      <div class="card">
        <div class="image">
          <img src="../../assets/group-imgs/france.jpg" alt>
        </div>
        <div class="title">
          <!-- <h1 :class="country.name">France</h1> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {},
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.country-cards-cotnainer {
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
