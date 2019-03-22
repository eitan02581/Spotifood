<template>
  <section class="add-group-form">
    <el-form class="form-text-input" ref="form" :model="form" label-width="120px">
      <div class="inputs">
        <el-form-item label="Group Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <div class="btns">
        <el-form-item>
          <el-button type="primary">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </div>
    </el-form>
    <GmapMap v-if="currLoc" :center="currLoc" :zoom="7" style="width: 350px; height: 350px">
      <GmapMarker :position="currLoc" :clickable="true" :draggable="true"/>
    </GmapMap>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currLoc: null,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  },
  methods: {
    setCurrentLocation(position) {
      this.currLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("curr location is", this.currLoc);
    }
  }
};
</script>

<style lang="scss" scoped>
section.add-group-form {
  width: 80%;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
.add-group-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
