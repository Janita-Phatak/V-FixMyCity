<template>
  <header style="position: fixed; z-index: 50;" class="headerMain">
    <div class="bg-indigo-600
                border-indigo-200
                px-4
                lg:px-6
                py-2.5
                fixed
                w-full
                shadow-lg
                top-0
                flex
                items-center
                h-[53px]
                ">
      <svg id="backIcon" style="display: none;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="3" stroke="currentColor" class="w-6 h-6 text-indigo-50" @click="back">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      <!-- <svg id="backIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
        class="ml-2 mr-4 w-6 h-6 text-indigo-50">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg> -->
      <span id="headerTitle" class="
                      self-center
                      text-xl
                      font-semibold
                      whitespace-nowrap
                      text-white
                      ml-4
                    ">{{ title }}
      </span>
    </div>
    <div id="mySidenav" class="sidenav" style="z-index: 2;">
      <button class="closebtn" @click="closeNav">&times;</button>
      <div
        class="flex flex-col items-center w-40 h-full overflow-hidden text-gray-700 bg-gray-100 rounded-l-lg w-full pt-0.5"
        style="width: 100%;">
        <div class="w-full px-2">
          <div class="flex items-center w-full mt-0 rounded" style="display: flex;">
            <div class="btnApp">
              <img src="../assets/image.png" class="w-8 h-8 fill-current" alt="FixMyCity Logo" />
              <span class="ml-2 text-xl font-bold text-indigo-600">FixMyCity</span>
            </div>
          </div>
        </div>
        <div class="w-full px-2">
          <div class="flex flex-col items-center w-full mt-0 border-t border-gray-300 pt-[10px]">
            <router-link :to="{ name: 'HomePage' }" id="Home"
              class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300 mb-1.5" style="display: flex;">
              <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="ml-2 text-lg font-medium">Home</span>
            </router-link>
            <router-link :to="{ name: 'postsView' }" id="Posts"
              class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300 mb-1.5" style="display: flex;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span class="ml-2 text-lg font-medium">Posts</span>
            </router-link>
            <router-link :to="{ name: 'myPosts' }" v-if="userType === 'general'" id="My Posts"
              class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300 mb-1.5" style="display: flex;">
              <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <span class="ml-2 text-lg font-medium">My Posts</span>
            </router-link>
            <router-link :to="{ name: 'usersView' }" v-if="userType === 'admin'" id="Users"
              class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300 mb-1.5" style="display: flex;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span class="ml-2 text-lg font-medium">Users</span>
            </router-link>
            <router-link :to="{ name: 'ContactUs' }" id="Contact"
              class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300 mb-1.5"
              style="display: flex;">
              <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span class="ml-2 text-lg font-medium">Contact</span>
            </router-link>
          </div>
          <div v-if="userType === 'general' || userType === 'admin'"
            class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
            <router-link :to="'/locate'" class="flex items-center w-full h-12 px-3 mt-4 rounded hover:bg-gray-300"
              style="display: flex;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
              </svg>

              <span class="ml-2 text-lg font-medium">Report Problem</span>
            </router-link>
          </div>
        </div>
        <div id="upperNav" class="upperNav bg-gray-200 rounded-t-lg rounded-l-lg">
          <div class="w-full px-2">
            <router-link :to="'/user/' + email" id="Manage Profile"
              class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" style="display: flex;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span class="ml-2 text-lg font-medium">Manage Profile</span>
            </router-link>
            <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" style="display: flex;" href="#"
              v-on:click="openlogoutModal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>

              <span class="ml-2 text-lg font-medium">Logout</span>
            </a>
            <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" style="display: flex;" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span class="ml-2 text-lg font-medium">Login</span>
            </a>
          </div>
        </div>
        <button id="btnAccount" class="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
          style="display: flex; padding: 0px 0px 0px 0px; z-index: 2;" @click="toggleAccountBtn">
          <svg class="w-7 h-7 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="ml-2 text-lg font-bold">Account</span>
        </button>
      </div>
      <!-- Component End  -->
    </div>
    <button
      style="font-size:30px;cursor:pointer; right: 0; margin: 5px; margin-right: 8px; position: fixed; color: white; height: 40px; top: 0;"
      class="inline-flex
                      items-center
                      p-2
                      ml-1
                      text-sm
                      rounded-lg
                      focus:outline-none
                      text-white
                      hover:bg-indigo-700" @click="openNav">
      <span class="sr-only">Open main menu</span>
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"></path>
      </svg>
      <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"></path>
      </svg>
    </button>
    <!-- <button style="font-size:30px;cursor:pointer; right: 0; margin-right: 8px; position: fixed; color: white; height: 53px;"
      @click="openNav">&#9776;</button> -->
  </header>
  <div id="backdrop-shadow"></div>
  <div id="logoutModal" class="modal" style="z-index: 50 !important;">
    <div
      class="logoutModal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800">
          Alert!
        </h5>
        <button @click="closelogoutModal" type="button"
          class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
          aria-label="Close">&times;</button>
      </div>
      <div class="modal-body relative p-4">
        <div class="flex items-center mb-1.5">
          <h5 class="text-xl font-medium leading-normal text-gray-800 mx-4">
            Are you sure you want to logout?
          </h5>
        </div>
      </div>

      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md mx-auto">
        <button @click="closelogoutModal" type="button"
          class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
          Cancel
        </button>
        <button @click="logout" type="button"
          class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
          Logout
        </button>
      </div>
    </div>
  </div>

  <!-- drawer component -->
  <div class="fixed z-40 w-full bg-indigo-600 bottom-0 left-0 right-0 translate-y-full bottom-[53px] h-[54px]">

    <div v-if="userType === 'admin' || userType === 'general'" type="button"
      class="fixed flex text-white bg-red-600 hover:bg-red-700 focus:outline-none left-[50%] translate-x-[-50%] half-circle">
    </div>
    <router-link :to="'/locate'" v-if="userType === 'admin' || userType === 'general'" type="button"
      class="fixed flex items-center justify-center text-white bg-red-600 rounded-full w-14 h-14 hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none ring-white left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg">
      <svg aria-hidden="true" class="w-8 h-8 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </router-link>

    <div class=" h-full grid grid-cols-4 items-center justify-items-center">
      <router-link :to="{ name: 'HomePage' }" class="flex flex-col items-center text-white w-[70px] py-2">
        <svg class="w-6 h-6 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <p class="text-sm text-white">Home</p>
      </router-link>
      <!-- <router-link :to="{ name: 'HomePage' }" class="flex flex-col items-center bg-gray-100 px-2 rounded text-indigo-600 w-fit">
        <svg class="w-6 h-6 stroke-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <p class="text-sm text-indigo-600">Home</p>
      </router-link> -->
      <router-link :to="{ name: 'postsView' }" id="bottomDrawerPosts"
        class="flex flex-col items-center justify-items-center text-white w-[70px] py-2 active:bg-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6 stroke-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p class="text-sm text-white">Posts</p>
      </router-link>
      <router-link :to="{ name: 'ContactUs' }" v-if="userType !== 'admin'" id="bottomDrawerContact"
        class="flex flex-col items-center justify-items-center text-white w-[70px] py-2">
        <svg class="w-6 h-6 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <p class="text-sm text-white">Contact</p>
      </router-link>
      <router-link :to="{ name: 'usersView' }" v-if="userType === 'admin'" id="bottomDrawerUsers"
        class="flex flex-col items-center text-white w-[70px] py-2 ml-9">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6 stroke-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        <p class="text-sm text-white">Users</p>
      </router-link>
      <button class="flex flex-col items-center text-white w-[70px] py-2">
        <svg class="w-6 h-6 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" @click="openNav(), this.isActive = true,
            this.OpenOrCloseUpperNav();">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-white">Account</p>
      </button>
    </div>
  </div>
</template>

<script>
import { user } from "@/components/postProblem/stores/userData.js";
export default {
  name: "headerWithSideDrawer",
  props: {
    currentTab: String,
    backButton: Boolean || false,
  },
  data() {
    return {
      email: "",
      userType: "",
      title: "",
      isActive: false
    };
  },
  beforeMount() {
    if (user.email.length > 0) {
      this.email = user.email;
      this.userType = user.userType;
    } else {
      this.email = localStorage.getItem("email");
      this.userType = localStorage.getItem("userType");
    }
  },
  mounted() {
    if (this.currentTab.length > 0) {
      if (this.currentTab === "Posts" || this.currentTab === "Users" || (this.currentTab === "Contact" && this.userType !== 'admin') || this.currentTab === "Home" || this.currentTab === "Account") {
        document.getElementById("bottomDrawer" + this.currentTab).classList.add("bg-indigo-500");
      }
      this.title = this.currentTab;
      if (this.title !== "Post") {
        document.getElementById(this.currentTab).classList.add("bg-indigo-500");
        document.getElementById(this.currentTab).style.color = "white";
        document.getElementById(this.currentTab).disabled = true;
        document.getElementById(this.currentTab).style.pointerEvents = "none";
        document.getElementById(this.currentTab).style.cursor = "default";
      }
    }

    if (this.backButton === true) {
      document.getElementById("backIcon").style.display = "block";
    }

    if (this.userType === 'admin') {
      document.getElementById("bottomDrawerPosts").style.marginRight = "36px";
      document.getElementById("bottomDrawerUsers").style.marginLeft = "36px";
      document.getElementById("bottomDrawerPosts").classList.remove("justify-items-center");
      document.getElementById("bottomDrawerUsers").classList.remove("justify-items-center");
    }
    if (this.userType === 'general') {
      document.getElementById("bottomDrawerPosts").style.marginRight = "36px";
      document.getElementById("bottomDrawerContact").style.marginLeft = "36px";
      document.getElementById("bottomDrawerPosts").classList.remove("justify-items-center");
      document.getElementById("bottomDrawerContact").classList.remove("justify-items-center");
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      user.clear();
      this.$router.push({ name: "loginPage" });
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      document.getElementById("backdrop-shadow").style.display = "block";
      document.getElementById("headerTitle").style.visibility = "hidden";
      if (this.backButton === true) {
        document.getElementById("backIcon").style.visibility = "hidden";
      }
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      // document.body.style.backgroundColor = "white";
      document.getElementById("backdrop-shadow").style.display = "none";
      document.getElementById("headerTitle").style.visibility = "visible";
      if (this.backButton === true) {
        document.getElementById("backIcon").style.visibility = "visible";
      }
      if (this.isActive === true) {
        this.isActive = false;
        this.OpenOrCloseUpperNav();
      }
    },
    OpenOrCloseUpperNav() {
      if (this.isActive === true) {
        document.getElementById("upperNav").style.height = "160px";
        document.getElementById("btnAccount").classList.add("bg-gray-300");
      }
      else {
        document.getElementById("upperNav").style.height = "0";
        document.getElementById("btnAccount").classList.remove("bg-gray-300");
      }
    },
    toggleAccountBtn() {
      this.isActive = !this.isActive;
      this.OpenOrCloseUpperNav();
    },
    back() {
      this.$router.back();
    },
    openlogoutModal() {
      var x = document.getElementById("logoutModal");
      x.style.display = "block";
    },
    closelogoutModal() {
      var modal = document.getElementById("logoutModal");
      modal.style.display = "none";
    }
  },
};
</script>

<style>
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  /* background-color: #111; */
  overflow-x: hidden;
  transition: 0.5s;
  /* padding-top: 60px; */
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 36px;
  margin-left: 53px;
  color: #818181;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}

.upperNav {
  width: 100%;
  height: 0;
  position: absolute;
  /* z-index: 1; */
  bottom: 0;
  right: 0;
  /* background-color: #818181; */
  overflow-x: hidden;
  transition: 0.5s;
  /* padding-top: 60px; */
}

.upperNav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.upperNav a:hover {
  color: #f1f1f1;
}

.upperNav .closebtn {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 36px;
  margin-left: 53px;
  color: #818181;
}

@media screen and (max-height: 450px) {
  .upperNav {
    padding-top: 15px;
  }

  .upperNav a {
    font-size: 18px;
  }
}

.btnApp {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: flex;
  align-items: center;
  transition: 0.3s;
  height: 53px;
}

#btnAccount {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: flex;
  align-items: center;
  transition: 0.3s;
  height: 53px;
  /* z-index: 1; */
}

#backdrop-shadow {
  display: none;
  z-index: 49 !important;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
  z-index: 1
}

.modal {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.logoutModal-content {
  width: 60vw;
  /* width: max-content; */
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  min-height: 30vh;
  justify-content: space-between;
  /* height: -webkit-fill-available; */
  z-index: 50
}

.half-circle {
  width: 60px;
  height: 30px;
  background-color: white;
  border-bottom-left-radius: 68px;
  border-bottom-right-radius: 68px;
  border: 8px solid white;
  border-top: 0;
}
</style>