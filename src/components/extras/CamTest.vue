<template>
  <div id="camera">
    <div>
      <video ref="video" id="video" width="100%" height="100%" autoplay></video>
    </div>
    <div>
        <!-- <button id="snap" v-on:click="capture()">Snap Photo</button> -->
        <!-- <input type="file" accept="image/*" capture="environment" /> -->
        <input type="file" id="snap" capture="user" accept="image/*" />
    </div>
    <canvas ref="canvas" id="canvas" width="100%" height="100%"> </canvas>
  </div>
</template>
<script>

export default {
    name: 'CamTest',
    data() {
        return {
             video: {},
             canvas: {},
             captures: []
        }
    },
    mounted() {
        this.video = this.$refs.video;
        // if(navigator.mediaDevices & navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(stream => {
                this.video.srcObject = stream;
                // this.video.play();
                this.video.onplay = function () {
                };
                this.video.play();
            });
        // }
    },
    methods: {
        capture(){
            this.canvas = this.$refs.canvas;
            var context = this.canvas.getContext("2d")
            context.drawImage(this.video, 0, 0, 640, 480);
            this.captures.push(this.canvas.toDataURL("image/webp"))
        }
    }
}
</script>

<style scoped>
    #camera {
        text-align: center;
        color: #2c3e50;
    }
    #video {
        background-color: #000000;
    }
    #canvas {
        display: none;
    }
    li {
        display: inline;
        padding: 5px;
    }
</style>
