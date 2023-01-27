<template>
  <div class="uploadPic">
    <!-- <div>
      <p>Upload an image to Firebase:</p>
      <input type="file" @change="previewImage" accept="image/*"/>
    </div> -->
    <div class="upload-btn-wrapper">
      <p>Upload an image to Firebase:</p>
      <button class="btn">Upload a file</button>
      <input
        type="file"
        @change="previewImage"
        accept="image/*"
        name="myfile"
      />
    </div>
    <div v-if="progress === true">
      <p>
        Progress: {{ uploadValue.toFixed() + "%" }}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
    </div>
    <div v-if="imageData != null">
      <img class="preview" :src="picture" />
      <br />
      <button @click="onUpload" class="button-87" role="button">Upload</button>
    </div>
  </div>
</template>

<script>
import { fb } from "../firebase";

export default {
  name: "UploadPic",
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      progress: false,
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
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
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
      );
    },
  },
};
</script>


<style scoped="">
img.preview {
  width: 200px;
}

/* #file-upload-button {
    appearance: none;
    background-color: initial;
    cursor: default;
    align-items: baseline;
    color: inherit;
    text-overflow: ellipsis;
    white-space: pre;
    text-align: start !important;
    padding: initial;
    border: initial;
    overflow: hidden !important;
    color: #F09819;
} */

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  /* cursor: pointer; */
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

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.uploadPic {
  text-align: center;
}
</style>