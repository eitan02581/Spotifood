<template>
  <section class="about-page-wrapper">
    <div class="about-item">
      <img src="https://api.adorable.io/avatars/100/Alex" alt="Alex Yeruhin">
      <h1>Alex Yeruhin</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facilis, illo nisi cum repudiandae quam soluta a consectetur dolore nostrum repellendus hic ea aut sed. Nobis, asperiores. Architecto, necessitatibus tenetur?</p>
      <i class="fas fa-briefcase"></i>
    </div>
    <div class="about-item">
      <img src="https://api.adorable.io/avatars/100/Eitan" alt="Alex Yeruhin">
      <h1>Eitan Elnekave</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facilis, illo nisi cum repudiandae quam soluta a consectetur dolore nostrum repellendus hic ea aut sed. Nobis, asperiores. Architecto, necessitatibus tenetur?</p>
      <i class="fas fa-briefcase"></i>
    </div>
    <div class="about-item">
      <img src="https://api.adorable.io/avatars/100/Yovel" alt="Alex Yeruhin">
      <h1>Yovel Becker</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facilis, illo nisi cum repudiandae quam soluta a consectetur dolore nostrum repellendus hic ea aut sed. Nobis, asperiores. Architecto, necessitatibus tenetur?</p>
      <i class="fas fa-briefcase"></i>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  flex-grow: 1;
}
.about-page-wrapper {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  border-right: 1px solid black;
  border-left: 1px solid black;
  h1 {
    margin: 0;
  }
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // align-items: center;
  .about-item {
    border: 1px solid red;
    margin: 15px;
    padding: 20px;
    width: 300px;
    height: 350px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;
    img {
      border-radius: 50%;
    }
  }
}
</style>
