<template>
  <div>
    <header style="position: fixed; z-index: 50;" class="headerMain shadow">
      <div id="header" class="
                bg-indigo-600
                px-4
                lg:px-6
                py-2.5
                fixed
                w-full
                top-0
                flex
                items-center
                h-[53px]
                ">
        <div id="headerTitle" class="flex items-center hidden">
          <img src="../assets/logo_White.png" class="h-6 sm:h-9 ml-4" alt="FixMyCity Logo" />
          <span id="headerTitle" class="
                      self-center
                      text-xl
                      font-semibold
                      whitespace-nowrap
                      text-white
                      ml-2
                    ">FixMyCity
          </span>
        </div>
      </div>
    </header>
    <div class="text-lg font-medium text-center text-gray-500 pt-[52px] w-full bg-gray-50 shadow">
      <div class="px-4 pb-4 bg-indigo-600
                border-indigo-200 min-h-[80px]">
        <div class="flex items-center justify-center mb-4 pt-1 relative z-[50]">
          <img src="../assets/logo_White.png" class="mr-3 h-12 sm:h-9 zoom-animate mt-[-4px]" alt="FixMyCity Logo" />
          <span class="
                      self-center
                      text-4xl
                      font-semibold
                      whitespace-nowrap
                      text-white
                      mt-[-4px]
                    ">
            <span class="pop-animate">F</span>
            <span class="pop-animate">i</span>
            <span class="pop-animate">x</span>
            <span class="pop-animate">M</span>
            <span class="pop-animate">y</span>
            <span class="pop-animate">C</span>
            <span class="pop-animate">i</span>
            <span class="pop-animate">t</span>
            <span class="pop-animate">y</span>
          </span>
        </div>
      </div>


      <div id="indicators-carousel" class="relative z-0" data-carousel="static">

        <!-- Carousel wrapper -->
        <div class="relative h-60 overflow-hidden">
          <div v-for="(image, index) in images" :key="index" v-show="currentIndex === index"
            class="duration-700 ease-in-out" data-carousel-item="active">
            <img class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              :src="getImage(image.src)" :alt="image.alt">
          </div>
        </div>
        <!-- Slider indicators -->
        <div class="relative block w-full bg-indigo-600 h-12 shadow-md">
          <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button :id="'imgNavBtn-' + index" v-for="(image, index) in images" :key="index" @click="currentIndex = index"
              type="button" class="w-3 h-3 rounded-full bg-white/30"></button>
          </div>
        </div>
        <!-- Slider controls -->
        <button type="button" @click="prev"
          class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev>
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" @click="next"
          class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next>
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>

      <div id="indicators-carousel" class="relative z-0" data-carousel="static">
        <!-- Carousel wrapper -->
        <div class="relative h-60 overflow-hidden mx-4">
          <div v-for="(card, index) in cards" :key="index" v-show="currentCardIndex === index"
            class="duration-700 ease-in-out" data-carousel-item="active">
            <div class="block p-10 border border-gray-200 rounded-lg hover:bg-gray-100 mt-4 text-gray-100 shadow-xl"
              style="background-color: #6c63ff; height: 190px">
              <h5 class="mb-4 text-2xl font-bold tracking-tight">{{ card.title }}</h5>
              <p class="font-normal mt-2">{{ card.description }}</p>
            </div>
          </div>
        </div>
        <!-- Slider indicators -->
        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          <button :id="'cardNavBtn-' + index" v-for="(card, index) in cards" :key="index"
            @click="currentCardIndex = index" type="button" class="w-3 h-3 rounded-full bg-white/30"></button>
        </div>
        <!-- Slider controls -->
        <button type="button" @click="prevCard"
          class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-6 cursor-pointer group focus:outline-none"
          data-carousel-prev>
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" @click="nextCard"
          class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-6 cursor-pointer group focus:outline-none"
          data-carousel-next>
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>

      <div class="mx-8">
        <router-link id="click2login" :to="'/login'"
          class="inline-flex items-center px-3 text-xl font-medium text-center text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-300 my-4 py-4 px-6 shadow-md w-full justify-center">
          Click here to Login / Sign up
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </router-link>
        <router-link id="click2view" :to="{ name: 'postsView' }"
          class="inline-flex items-center px-3 text-xl font-medium text-center text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-300 mt-4 mb-2 py-4 px-6 shadow-md w-full justify-center">
          View reported issues
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </router-link>
        <router-link id="click2report" :to="{ name: 'fetchLocation' }"
          class="inline-flex items-center px-3 text-xl font-medium text-center text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 mt-2 mb-4 py-4 px-6 shadow-md w-full justify-center">
          Report an issue
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>

  <h2 style="text-align:center;" class="mt-4 text-2xl font-bold tracking-tight text-indigo-600 shadow pb-4">Just 1-2-3 and
    you are ready to Go!</h2>
  <div class=" mx-10 mb-2 flex justify-center">
    <dl class="grid grid-rows-5 gap-2 p-4 mx-auto sm:grid-rows-2 xl:grid-rows-3 sm:p-8 text-center">
      <div class="flex flex-col">
        <dt id="step-number-0"
          class="flex mb-2 mx-auto items-center justify-center w-8 h-8 bg-gray-400 text-white rounded-full">1</dt>
        <dd id="step-title-0" class="font-light">Simply create an account</dd>
      </div>
      <div class="flex flex-col max-h-8 h-8">
        <div class="border-l h-full border-gray-700 self-center"></div>
      </div>
      <div class="flex flex-col mt-[-24px]">
        <dt id="step-number-1"
          class="flex mb-2 mx-auto items-center justify-center w-8 h-8 bg-gray-400 text-white rounded-full">2</dt>
        <dd id="step-title-1" class="font-light">Report & Join the community</dd>
      </div>
      <div class="flex flex-col max-h-8 h-8 mt-[-20px] md:mt-2 sm:mt-2 lg:mt-[-20px]">
        <div class="border-l h-full border-gray-700 self-center"></div>
      </div>
      <div class="flex flex-col mt-[-44px] md:mt-2 sm:mt-2 lg:mt-2">
        <dt id="step-number-2"
          class="flex mb-2 mx-auto items-center justify-center w-8 h-8 bg-gray-400 text-white rounded-full">3</dt>
        <dd id="step-title-2" class="font-light">Track the updates</dd>
      </div>
    </dl>
    <!-- <ol class="relative border-l border-gray-700 h-[120px] mb-[50px] mx-6">
        <li class="mb-10 ml-6 step-animation" v-for="(step, index) in steps" :key="index" @click="currentStepIndex = index">
          <span :id="'step-number-' + index"
            class="absolute flex items-center justify-center w-8 h-8 bg-gray-400 text-white rounded-full -left-4 ring-8 ring-white">
            {{ index + 1 }}
          </span>
          <h3 :id="'step-title-' + index" class="flex items-center mb-1 text-lg font-normal text-gray-700 ml-4">{{
            step.title }}
          </h3>
        </li>
      </ol> -->
  </div>

  <div class="w-full bg-indigo-600 rounded-t-2xl shadow-t-xl">
    <div class="p-4 bg-indigo-600 rounded-lg md:p-8 mt-[-20px] md:mt-0 lg:mt-0" id="statistics" role="tabpanel" aria-labelledby="statistics-tab">
      <dl
        class="grid max-w-screen-xl grid-cols-3 gap-8 p-4 mx-auto text-white sm:grid-cols-2 xl:grid-cols-3 sm:p-8 text-center">
        <div class="flex flex-col">
          <dt id="issuesReproted" class="mb-2 text-3xl font-extrabold">{{totalPosts}}</dt>
          <dd class="font-light text-white">Issues reported</dd>
        </div>
        <div class="flex flex-col">
          <dt id="issueInProgress" class="mb-2 text-3xl font-extrabold">{{openPosts}}</dt>
          <dd class="font-light text-white">Issues in progress</dd>
        </div>
        <div class="flex flex-col">
          <dt id="issueFixed" class="mb-2 text-3xl font-extrabold">{{fixedPosts}}</dt>
          <dd class="font-light text-white">Issues fixed</dd>
        </div>
      </dl>
    </div>
  </div>

  <footer class="p-4 bg-gray-500 shadow md:px-6 md:py-8">
    <div class="flex sm:items-center sm:justify-between">
      <a href="https://flowbite.com/" class="flex items-center sm:mb-0 mx-auto">
        <img src="../assets/logo_White.png" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">FixMyCity</span>
      </a>
      <!-- <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
                  <li>
                      <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                  </li>
                  <li>
                      <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                  </li>
                  <li>
                      <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">Contact</a>
                  </li>
              </ul> -->
    </div>
    <hr class="my-4 border-gray-300 sm:mx-auto lg:my-8" />
    <span class="block text-sm text-white sm:text-center mx-auto flex justify-center">© &nbsp;<a
        href="https://fixmycity.com/" class="hover:underline">FixMyCity™</a>. All Rights Reserved.
    </span>
  </footer>
</template>

<script>
import { user } from "@/components/postProblem/stores/userData.js";
import axios from "axios";
import { properties } from "./axiosInvoc.js";
export default {
  name: "HomePage",
  data() {
    return {
      title: "Home",
      email: "",
      userType: "",
      images: [
        { src: "aBrighterFutureTogether.svg", alt: "Image 1" },
        { src: "EmpowringCitizensTransformingCommunities.svg", alt: "Image 2" },
        { src: "myCity_myPride.svg", alt: "Image 3" },
        { src: "UnitingForABetterCommunitysvg.svg", alt: "Image 4" },
        { src: "yourChoiceYourCityYourImpact.svg", alt: "Image 5" },
      ],
      currentIndex: 0,
      currentCardIndex: 0,
      cards: [
        { title: 'FixMyCity', description: 'The platform that empowers citizens to bring about change in their communities.' },
        { title: 'With FixMyCity,', description: 'you have the power to report civic issues and be a part of the Smart & Healty City' },
        { title: 'Your voice matters,', description: 'and with FixMyCity, it can create real change.' },
        { title: 'Don\'t wait, start making an impact today! ', description: 'Sign up now and start transforming your city, one issue at a time.' }
      ],
      currentStepIndex: 0,
      steps: [
        { title: 'Signup', description: 'Simply create an account' },
        { title: 'Report & Join the community', description: 'Submit a report' },
        { title: 'Track the updates', description: 'Watch as the issue is assigned, reviewed, and resolved' },
      ],
      totalPosts: 0,
      reportedPosts: 0,
      openPosts: 0,
      fixedPosts: 0
    }
  },
  watch: {
    currentIndex(newVal, oldVal) {
      document.getElementById('imgNavBtn-' + newVal).classList.add("bg-white/80");
      document.getElementById('imgNavBtn-' + oldVal).classList.remove("bg-white/80");
    },
    currentCardIndex(newVal, oldVal) {
      if (newVal === this.cards.length) {
        this.currentCardIndex = this.cards.length - 1;
      }
      document.getElementById('cardNavBtn-' + newVal).classList.add("bg-white/80");
      document.getElementById('cardNavBtn-' + oldVal).classList.remove("bg-white/80");
    },
    currentStepIndex(newVal, oldVal) {
      document.getElementById('step-number-' + newVal).classList.add("bg-indigo-600")
      document.getElementById('step-number-' + newVal).classList.add("text-white")
      document.getElementById('step-title-' + newVal).classList.add("text-indigo-600")
      document.getElementById('step-title-' + newVal).classList.add("font-semibold")

      document.getElementById('step-number-' + oldVal).classList.remove("bg-indigo-600")
      document.getElementById('step-title-' + oldVal).classList.remove("text-indigo-600")
      document.getElementById('step-number-' + oldVal).classList.add("bg-gray-400")
      document.getElementById('step-title-' + oldVal).classList.remove("font-semibold")
    }
  },

  created() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = 0;
      }
    }, 6000); // Change image every 6 seconds
    // setInterval(() => {
    //   // if (this.currentCardIndex >= this.cards.length) {
    //   //   this.currentCardIndex = 0;
    //   // }
    //   if (this.currentCardIndex <= this.cards.length - 1) {
    //     this.currentCardIndex++;
    //   }
    //   else{
    //     this.currentCardIndex = this.cards.length -1;
    //   }
    // }, 6000); // Change image every 6 seconds
    setInterval(() => {
      this.currentStepIndex++;
      if (this.currentStepIndex >= this.steps.length) {
        this.currentStepIndex = 0;
      }
    }, 4000); // Change image every 6 seconds

    window.addEventListener('scroll', this.handleScroll);
  },
  async mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    document.getElementById('imgNavBtn-0').classList.add("bg-white/80");
    document.getElementById('cardNavBtn-0').classList.add("bg-white/80");
    document.getElementById('step-number-0').classList.add("bg-indigo-600");
    document.getElementById('step-number-0').classList.add("text-white");
    document.getElementById('step-title-0').classList.add("text-indigo-600");
    document.getElementById('step-title-0').classList.add("font-semibold");

    if (user.email.length > 0) {
      this.email = user.email;
      this.userType = user.userType;
    } else {
      this.email = localStorage.getItem("email");
      this.userType = localStorage.getItem("userType");
    }

    if (this.email) {
      document.getElementById("click2login").classList.add("hidden");
      if(this.userType !== "admin" || this.userType !== "general"){
        document.getElementById("click2report").classList.add("hidden");
      }
    }
    else {
      document.getElementById("click2view").classList.add("hidden");
      document.getElementById("click2report").classList.add("hidden");
    }

    await axios.get(properties.server + "/post/posts/count?status=reported").then(
          (res) => {
            this.reportedPosts = res.data;
            this.totalPosts += this.reportedPosts;
          }
        );
    await axios.get(properties.server + "/post/posts/count?status=open").then(
          (res) => {
            this.openPosts = res.data;
            this.totalPosts += this.openPosts;
          }
        );
    await axios.get(properties.server + "/post/posts/count?status=fixed").then(
          (res) => {
            this.fixedPosts = res.data;
            this.totalPosts += this.fixedPosts;
          }
        );
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    // methods for the homepage go here
    handleScroll() {
      // Any code to be executed when the window is scrolled
      if (document.scrollingElement.scrollTop >= 100) {
        document.getElementById("headerTitle").classList.remove("hidden")
        document.getElementById("header").classList.add("shadow-lg")
      }
      if (document.scrollingElement.scrollTop < 100) {
        document.getElementById("headerTitle").classList.add("hidden")
        document.getElementById("header").classList.remove("shadow-lg")
      }
      if (document.scrollingElement.scrollTop > 300) {
        this.animateValue("issuesReproted", 0, this.totalPosts, 500);
        this.animateValue("issueInProgress", 0, this.openPosts, 500);
        this.animateValue("issueFixed", 0, this.fixedPosts, 500);
      }
    },
    prev() {
      if (this.currentIndex !== 0) {
        this.currentIndex--;
      }
      else {
        this.currentIndex = this.images.length - 1;
      }
    },
    next() {
      if (this.currentIndex !== (this.images.length - 1)) {
        this.currentIndex++;
      }
      else {
        this.currentIndex = 0;
      }
    },
    getImage(image) {
      return require('../assets/' + image)
    },
    prevCard() {
      if (this.currentCardIndex !== 0) {
        this.currentCardIndex--;
      }
      else {
        this.currentCardIndex = this.cards.length - 1;
      }
    },
    nextCard() {
      if (this.currentCardIndex !== (this.cards.length - 1)) {
        this.currentCardIndex++;
      }
      else {
        this.currentCardIndex = 0;
      }
    },
    animateValue(objId, start, end, duration) {
      const obj = document.getElementById(objId);
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }
}
</script>

<style scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.zoom-animate {
  animation-name: zoom;
  z-index: 9999;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  display: inline-block;
}

.pop-animate {
  animation-name: pop;
  z-index: 1000;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  display: inline-block;
}

@keyframes pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes zoom {
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  0% {
    transform: scale(3);
    opacity: 0;
  }
}

.bg-indigo-600 {
  background-color: #6c63ff;
}

.text-white {
  color: #ffffff;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-container .card {
  margin: 20px;
  width: 300px;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}

.container div {
  background-color: #3f51b5;
  color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  position: relative;
  transition: all 0.5s ease-in-out;
}

.container div:not(:last-child):after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);
  width: 50px;
  height: 10px;
  background-color: #3f51b5;
}

.container div.active {
  color: white;
  background-color: gray;
  border-color: gray;
  animation: highlight 1s ease-in-out infinite;
}</style>