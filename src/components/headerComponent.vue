<template>
  <header>
    <nav
      class="
        bg-indigo-600
        border-indigo-200
        px-4
        lg:px-6
        py-2.5
        fixed
        w-full
        shadow-lg
        top-0
        z-30
      "
    >
      <div
        class="
          flex flex-wrap
          justify-between
          items-center
          mx-auto
          max-w-screen-xl
        "
      >
        <router-link :to="'/'" class="flex items-center">
          <img
            src="../assets/logo_White.png"
            class="mr-3 h-6 sm:h-9"
            alt="FixMyCity Logo"
          />
          <span
            class="
              self-center
              text-xl
              font-semibold
              whitespace-nowrap
              text-white
            "
            >FixMyCity</span
          >
        </router-link>
        <div class="flex items-center lg:order-2">
          <!-- <a
            href="#"
            class="
              text-gray-800
              dark:text-white
              hover:bg-gray-50
              focus:ring-4 focus:ring-gray-300
              font-medium
              rounded-lg
              text-sm
              px-4
              lg:px-5
              py-2
              lg:py-2.5
              mr-2
              dark:hover:bg-gray-700
              focus:outline-none
              dark:focus:ring-gray-800
            "
            >Log in</a
          >
          <a
            href="#"
            class="
              text-white
              bg-primary-700
              hover:bg-primary-800
              focus:ring-4 focus:ring-primary-300
              font-medium
              rounded-lg
              text-sm
              px-4
              lg:px-5
              py-2
              lg:py-2.5
              mr-2
              dark:bg-primary-600 dark:hover:bg-primary-700
              focus:outline-none
              dark:focus:ring-primary-800
            "
            >Get started</a
          > -->
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="
              inline-flex
              items-center
              p-2
              ml-1
              text-sm
              rounded-lg
              lg:hidden
              focus:outline-none focus:ring-2
              text-white
              hover:bg-indigo-700
              focus:ring-indigo-500
            "
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            v-on:click="myFunction"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="
            hidden
            justify-between
            items-center
            w-full
            lg:flex lg:w-auto lg:order-1
          "
          id="mobile-menu-2"
        >
          <ul
            class="
              flex flex-col
              mt-4
              font-medium
              lg:flex-row lg:space-x-8 lg:mt-0
              xl:items-center
            "
          >
            <li>
              <router-link :to="'/HomePage'"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-400
                  border-b border-gray-200
                  hover:bg-indigo-700 hover:text-white
                  xl:text-gray-400
                  xl:border-gray-100
                  xl:hover:bg-gray-50
                  xl:hover:bg-transparent
                  xl:border-0
                  xl:p-0
                  xl:hover:text-white
                  xl:hover:bg-indigo-600
                  xl:hover:text-white
                  xl:hover:bg-transparent
                  xl:border-indigo-700
                  text-lg
                "
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link :to="'/'"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-white
                  bg-primary-700
                  xl:bg-transparent xl:text-primary-700 xl:p-0
                  hover:text-white
                  border-b border-gray-200
                  xl:border-0
                  text-lg
                  hover:bg-indigo-600 hover:text-white
                  xl:border-gray-100
                  xl:hover:bg-gray-50
                  xl:hover:bg-transparent
                  xl:border-0
                  xl:p-0
                  xl:hover:text-white
                  xl:hover:bg-indigo-600
                  xl:hover:text-white
                  xl:hover:bg-transparent
                  xl:border-indigo-700
                "
                >Posts</router-link
              >
            </li>
            <li v-if="userType === 'general'">
              <router-link :to="'/myposts'"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-400
                  border-b border-gray-200
                  hover:bg-indigo-700 hover:text-white
                  xl:text-gray-400
                  xl:border-gray-100
                  xl:hover:bg-gray-50
                  xl:hover:bg-transparent
                  xl:border-0
                  xl:p-0
                  xl:hover:text-white
                  xl:hover:bg-indigo-600
                  xl:hover:text-white
                  xl:hover:bg-transparent
                  xl:border-indigo-700
                  text-lg
                "
                >My Posts</router-link
              >
            </li>
            <li>
              <a :href="'/user/'+email"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-400
                  border-b border-gray-200
                  hover:bg-indigo-700 hover:text-white
                  xl:text-gray-400
                  xl:border-gray-100
                  xl:hover:bg-gray-50
                  xl:hover:bg-transparent
                  xl:border-0
                  xl:p-0
                  xl:hover:text-white
                  xl:hover:bg-indigo-600
                  xl:hover:text-white
                  xl:hover:bg-transparent
                  xl:border-indigo-700
                  text-lg
                "
                >My Account</a
              >
            </li>
            <li v-if="userType === 'admin'">
              <a :href="'/users'"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-400
                  border-b border-gray-200
                  hover:bg-indigo-700 hover:text-white
                  xl:text-gray-400
                  xl:border-gray-100
                  xl:hover:bg-gray-50
                  xl:hover:bg-transparent
                  xl:border-0
                  xl:p-0
                  xl:hover:text-white
                  xl:hover:bg-indigo-600
                  xl:hover:text-white
                  xl:hover:bg-transparent
                  xl:border-indigo-700
                  text-lg
                "
                >Users</a
              >
            </li>
            <li>
              <router-link :to="'/ContactUs'"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-400
                  border-b border-gray-200
                  hover:bg-indigo-700 hover:text-white
                  xl:text-gray-400
                  xl:border-gray-100
                  xl:hover:bg-gray-50
                  xl:hover:bg-transparent
                  xl:border-0
                  xl:p-0
                  xl:hover:text-white
                  xl:hover:bg-indigo-600
                  xl:hover:text-white
                  xl:hover:bg-transparent
                  xl:border-indigo-700
                  text-lg
                "
                >Contact</router-link
              >
            </li>
            <li v-if="userType === 'general' || userType === 'admin'" class="self-center">
              <router-link
                :to="'/locate'"
                class="
                  bg-indigo-50
                  text-indigo-500
                  hover:bg-indigo-300
                  focus:ring-4 focus:ring-indigo-300
                  font-medium
                  rounded-lg
                  text-sm
                  py-2
                  pr-3
                  pl-3
                  focus:outline-none
                  block
                  mt-2
                  xl:my-0
                  w-[10rem]
                  text-center text-lg
                  shadow-lg
                "
                >Report Problem</router-link
              >
            </li>
            <li class="self-center">
              <a
                v-on:click="logout"
                href="#"
                class="
                  bg-red-600
                  text-gray-50
                  hover:bg-red-400 hover:text-gray-50
                  focus:ring-4 focus:ring-indigo-300
                  font-medium
                  rounded-lg
                  text-sm
                  py-2
                  pr-3
                  pl-3
                  mt-2
                  focus:outline-none
                  block
                  w-32
                  text-center text-lg
                  shadow-lg
                "
                >Log Out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { user } from "@/components/postProblem/stores/userData.js";
export default {
  name: "headerComponent",
  data() {
    return {
      email: "",
      userType: ""
    };
  },
  beforeMount(){
    if (user.email.length > 0) {
      this.email = user.email;
      this.userType = user.userType;
    } else {
      this.email = localStorage.getItem("email");
      this.userType = localStorage.getItem("userType");
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      user.clear();
      this.$router.push({ name: "loginPage" });
    },
    myFunction() {
      var x = document.getElementById("mobile-menu-2");
      x.classList.toggle("hidden");
    },
  },
};
</script>