<template>
  <headerComponent> </headerComponent>
  <div
    class="text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[64px] w-full fixed z-10 bg-gray-50 shadow">
    
    <div id="slideshow">
    <img v-for="(image, index) in images" :src="image.src" :alt="image.alt" :key="index" v-show="currentIndex === index" />
    </div>
  
    <h1>Fixing civic issues is easy as 1-2-3</h1>
    <div class="wrapper">
      <transition-group name="fade" tag="div" class="card-container">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="card.isOpen = !card.isOpen">
        <h2>{{ card.title }}</h2>
        <p v-if="card.isOpen">{{ card.description }}</p>
      </div>
    </transition-group>
  </div>
</div>
</template>

<script>

import headerComponent from "./headerComponent.vue";

export default {
  name: "HomePage",
  components: { headerComponent },
  data() {
    return {
      title:"Home",
      images: [
        { src: "https://media.istockphoto.com/id/1164657862/photo/city-residential-apartment-buildings-with-view-of-city-road-at-sunrise.jpg?b=1&s=170667a&w=0&k=20&c=XZRn65Wlv66YOYxTUc_o25BBgS8XTLtslYO4myMsyis=", alt: 'Image 1' },
        { src: 'https://play-lh.googleusercontent.com/Ar9wAVo4gwq-SRLQ_MbTkWIDvjjP2FxNz_1lWRG9kST6RFC9Y5CNPU0_PmlV_f1Zqig', alt: 'Image 2' },
        { src: 'https://www.jagranimages.com/images/2018/jul/fb-post1530541972952.jpg', alt: 'Image 3' }
      ],
      currentIndex: 0,

      cards: [
        { title: 'Post a complaint', description: 'xxxxxxxx xxx xxxxx  xxxxx xxxxx xx xxxxx xxxxxxxx  xxxxxx xxxxx  xxxxxx xxxx.', isOpen: false },
        { title: 'Track progress', description: 'yyy yyyyy yyyyyy  yyyyy yyyy yyyyyy yyyyyyyy   yyyyyy yyyyyyyyyyyyyyyyyyy.', isOpen: false },
        { title: 'Get notified', description: 'zzz zzzz zzzzzzzz zz zzzzz  zzzzz zzzzzzz zzzzzzzz zzzzzzzzzz zzzzzzz zzzzz.', isOpen: false }
      ],
    }
  },
  created() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = 0;
      }
    }, 3000); // Change image every 3 seconds
  },
 
  methods: {
    // methods for the homepage go here
  }
}
</script>

<style>

#slideshow {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

#slideshow img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-container {
    display: flex;
    justify-content: space-between;
  }
  .card {
    width: 30%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }

</style>