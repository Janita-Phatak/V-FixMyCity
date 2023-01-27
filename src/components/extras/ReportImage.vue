<template>
  <div>
    <button @click="fromCamera = true" class="button-87" role="button">
      Take Picture from Camera
    </button>
    <div v-if="fromCamera">
      <!-- <CapturePic @picture-taken="getImages($event)" /> -->
      <CapturePic v-if="imageSrc === null" @picture-taken="imageSrc = $event" />
      <img v-if="imageSrc" class="canvasImg" :src="imageSrc" ref="pic" />
      <button class="button-87" role="button" @click="onUpload" v-if="imageSrc">
        Upload
      </button>
      <button @click="fromCamera = false; imageSrc = null" class="button-87" role="button">
        Close Camera
      </button>
    </div>
    <span class="orDiv">
      <hr class="orHr" />
      <p class="or">OR</p>
      <hr class="orHr" />
    </span>
    <button @click="fromFile = true" class="button-87" role="button">
      Upload Picture from your file
    </button>
    <div v-if="fromFile">
      <UploadPic></UploadPic>
      <button @click="fromFile = false" class="button-87" role="button">
        Cancle
      </button>
    </div>
    <!-- <div class="picDiv" v-for="item in images" :key="item">
      <img class="canvasImg" :src="item" />
    </div> -->
    <!-- <button class="snap" @click="savePicture()">Save</button> -->
  </div>
</template>

<script>
import CapturePic from "./CapturePic.vue";
import UploadPic from "./UploadPic.vue";
import { fb } from "../firebase";

export default {
  name: "ReportImage",
  components: {
    CapturePic,
    UploadPic,
  },
  data() {
    return {
      imageSrc: null,
      images: [],
      fromCamera: false,
      fromFile: false,
    };
  },
  methods: {
    // savePicture() {
    //   // for( var i=0; i<this.images.length; i++ ){
    //   // localStorage.setItem("IMG_"+ (new Date()).getTime() + "_" + (i+1), this.images[i]);
    //   localStorage.setItem("imageTest", this.imageSrc);
    //   // }
    // },
    // getImages(image) {
    //   this.images.push(image);
    // },
    onUpload() {
      // this.picture = null;

      var data = this.imageSrc.substring(this.imageSrc.indexOf(",") + 1);

      fb.storage()
        .ref("IMG_" + new Date().getTime() + ".png")
        .putString(data, "base64", { contentType: "image/png" });
    },
  },
};
</script>

<style scoped>

.or {
  display: inline-flex;
  margin-right: 10px;
}

.orHr {
  width: 30px;
  display: inline-flex;
  margin-right: 10px;
}

.orDiv {
  margin: auto;
  display: table;
}
</style>
