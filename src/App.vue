<template>
  <div id="app">
    <router-view></router-view>
    <!-- <ReportImage /> -->
  </div>
</template>

<script>
// import ReportImage from "./components/ReportImage.vue"

export default {
  name: "App",
  // components: {
  //   ReportImage,
  // },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.picDiv {
  display: block;
  width: 100vw;
  height: 100vh;

  padding: 25px;
  box-sizing: border-box;
}
.canvasImg {
  display: block;
  width: 100%;
  max-width: 720px;

  margin: 25px auto;

  box-shadow: 4px 4px 12px 0px;
}
.snap {
  display: block;
  width: 75px;
  height: 75px;
  border-radius: 50%;

  margin: 25px auto;

  background-color: #ffce00;
  border: 1px solid #171717;
  outline: none;

  cursor: pointer;
}

.button-87 {
  margin: 10px;
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
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  display: block;
  margin: 10px auto;
}

.button-87:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.button-87:active {
  transform: scale(0.95);
}

#html {
  /* max-width: 1080px; */
  /* max-height: 2400px; */
  /* min-width: 1080px; */
  /* min-height: 1920px; */
  /* min-height: 719px; */
  /* height: 100vh; */
}
</style>
