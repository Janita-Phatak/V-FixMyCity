<template>
    <div>
        <p>Problem Details : </p>
        <img v-if="showImg === true" class="preview" :src="imgDownloadURL" />
        <!-- <p>{{imgSrc}}</p> -->
    </div>
</template>

<script>
export default {
    name: "problemDetails",
    data(){
        return {
            imgDownloadURL: null,
            showImg: false,
        }
    },
    methods: {

    },
    mounted(){

        this.imgDownloadURL = localStorage.getItem("imgURL");
        this.showImg = true;

        // this.imgSrc = this.$route.params.test
    //     let username = localStorage.getItem("user-info");
    // if (!username) {
    //   this.$router.push({ name: "login" });
    // }
    }    
}
</script>

<style scoped>
img.preview {
  display: block;
  max-width: 80vw;
  min-width: 70vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
  margin-left: auto;
  margin-right: auto;
}
</style>