<template>
  <div class="imgModule" v-if="imgSrc === null">
    <!-- <button class="button-87" type="button">Take Picture from Camera</button> -->
    <label class="btn" for="camIp"
      >Take Picture from Camera
      <input
        id="camIp"
        type="file"
        @change="previewImage"
        accept="image/*"
        capture
      />
    </label>
    <span class="orDiv">
      <hr class="orHr" />
      <p class="or">OR</p>
      <hr class="orHr" />
    </span>
    <!-- <div class="upload-btn-wrapper"> -->
    <label class="btn" for="fileIp"
      >Upload Picture from File
      <!-- <button class="btn" type="button">Upload Picture from File</button> -->
      <input
        type="file"
        @change="previewImage"
        accept="image/*;capture=camera"
        id="fileIp"
      />
    </label>
  </div>

  <div class="imgUpload" v-else-if="imgSrc != null">
    <img class="preview" :src="imgSrc" />
    <div v-if="progress === true" class="meter">
      <progress
        class="progress"
        v-if="progress === true"
        :value="uploadValue"
        max="100"
      ></progress>
    </div>
    <div class="buttonDiv" v-if="uploaded === false">
      <button @click="onUpload" class="button-87" role="button">Upload</button>
      <button @click="imgSrc = null" class="button-87" role="button">
        Cancle
      </button>
    </div>
    <div class="next" v-if="uploaded === true">
      <p class="uploadPrompt">Uploaded Successfully!</p>
      <router-link :to="'/problemdetails'" class="button-87 next"
        >Next</router-link
      >
    </div>
  </div>
</template>

<script>
import { fb } from "../firebase";

export default {
  name: "reportProblem",
  components: {},
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      progress: false,
      imgSrc: null,
      uploaded: false,
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      // var output = document.getElementById('myimage'),
      this.imgSrc = URL.createObjectURL(this.imageData);
      // fileName = event.target.files[0].name;
    },
    onUpload() {
      this.progress = true;
      this.picture = null;
      const storageRef = fb
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.uploaded = false;
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            console.log(this.picture);
            localStorage.setItem("imgURL", this.picture);
            this.uploaded = true;
          });
        }
      );
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,200;0,300;0,400;0,600;1,200;1,300;1,400;1,600&display=swap");
/* * {
  padding: 0;
  margin: 0;
  font-family: "Noto Sans Display", sans-serif;
} */

.or {
  display: inline-flex;
  margin-right: 10px;
  /* font-size: -webkit-xxx-large; */
  font-size: 4vw;
}

.orHr {
  width: 15vw;
  display: inline-flex;
  margin-right: 10px;
  background-color: black;
}

.orDiv {
  margin: auto;
  display: table;
}

.imgModule {
  margin: auto;
  /* width: 50%; */
  border: 0.5vh solid #fe542e;
  padding: 2vw;
  /* margin-top: 40vh; */
  margin-top: 36.5vh;
  width: max-content;
  border-radius: 4vw;
}

.imgUpload {
  margin: auto;
  /* width: 50%; */
  border: 0.5vh solid #fe542e;
  padding: 2vw;
  /* margin-top: 40vh; */
  margin-top: 15vh;
  width: max-content;
  border-radius: 4vw;
}

.button-87 {
  /* font-size: -webkit-xxx-large;
  min-width: 50vw; */
  font-size: 4vw;
  display: inline;
  /* margin-right: 2vw;
  margin-left: 2vw; */
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  /* display: inline-block; */
  /* cursor: pointer; */
}

.upload-btn-wrapper input[type="file"] {
  /* font-size: 4vw; */
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.btn {
  /* border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold; */
  cursor: pointer;
  margin: 10px auto;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(
    45deg,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
  /* cursor: pointer; */
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: auto;
  font-size: 4vw;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
  /* cursor: pointer; */
}

.btn:active {
  transform: scale(0.95);
  /* cursor: pointer; */
}

.btn input[type="file"] {
  /* font-size: 4vw; */
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

#camIp {
  position: absolute;
  width: 0;
  height: 0;
}

#fileIp {
  position: absolute;
  width: 0;
  height: 0;
}

img.preview {
  display: block;
  max-width: 80vw;
  min-width: 70vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
  margin-left: auto;
  margin-right: auto;
}

.buttonDiv {
  display: flex;
}

.next {
  display: block;
  text-decoration: none;
}

.meter {
  height: 1.5vh;
  position: relative;
  background: #c2c2c2;
  border-radius: 25px;
  padding: 1vh;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
}

.progress {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  /* background-color: rgb(43,194,83); */
  background-color: #ff512f;
  background-image: linear-gradient(center bottom, #ff512f 37%, #ff512f 69%);
  /* background-image: linear-gradient(
    center bottom,
    rgb(43,194,83) 37%,
    rgb(84,240,84) 69%
  ); */
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  width: -webkit-fill-available;
}

.uploadPrompt {
  display: block;
  margin: auto;
  margin-top: 1vh;
  margin-bottom: 1vh;
  font-size: 5vw;
  color: rgb(43 194 83);
  font-weight: 800;
  font-family: "Noto Sans Display", sans-serif;
  width: max-content;
}

/* progress {
  -webkit-appearance: none;
  width: -webkit-fill-available;
} */

/* ::-webkit-progress-bar {
  background-color: orange;
} */
</style>