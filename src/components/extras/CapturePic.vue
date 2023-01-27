<template>
  <div class="camera">
    <video class="feed" ref="video" @canplay="initCanvas()">Stream Unavailable</video>
    <canvas ref="canvas" style="display: none"></canvas>
    <button class="button-87" role="button" @click="takePicture()">Take Picture</button>
  </div>
</template>

<script>
export default {
  name: "CapturePic",
  props: {},
  data(){
    return {
      video : null,
      canvas : null,
      imageData : null,
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.video = this.$refs.video
    this.startCapture();
  },

  methods: {
    startCapture() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
          this.video.srcObject = stream;
          this.video.play()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    takePicture() {
      let context = this.canvas.getContext('2d')
      context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight)
      this.$emit('picture-taken', this.canvas.toDataURL('image/png'))
    },
    initCanvas(){
      this.canvas.setAttribute("width", this.video.videoWidth)
      this.canvas.setAttribute("height", this.video.videoHeight)
    },
    previewImage(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.camera {
  width: 100vw;
  height: 100vh;
  padding: 25px;
  box-sizing: border-box;
}

.feed{
  display: block;
  width: 100%;
  max-width: 720px;

  margin: 0 auto;

  background-color: #171717;
  box-shadow: 6px 6px 12px 8px rgba(0, 0, 0, 0.35);
}

</style>
