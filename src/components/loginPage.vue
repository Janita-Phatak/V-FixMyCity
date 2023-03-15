<template>
  <section class="bg-gray-50">
    <div
      class="
        flex flex-col
        items-center
        justify-center
        px-6
        py-8
        mx-auto
        md:h-screen
        lg:py-0
        h-full
        w-full
        absolute
      "
    >
      <router-link to="/"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        <img class="w-8 h-8 mr-2" src="../assets/image.png" alt="logo" />
        FixMyCity
      </router-link>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="
              text-xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-900
              md:text-2xl
              w-fit
              mx-auto
            "
          >
            Log in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-base font-medium text-gray-900"
                >Your Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model="form.email"
                ref="email"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-base
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                "
                placeholder="Enter your Email"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-base font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
                ref="password"
                placeholder="••••••••"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-base
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                "
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="
                      w-4
                      h-4
                      border border-gray-300
                      rounded
                      bg-gray-50
                      focus:ring-3 focus:ring-primary-300
                    "
                    v-model="remember"
                    required=""
                  />
                </div>
                <div class="ml-3 text-base">
                  <label for="remember" class="text-gray-500"
                    >Remember me</label
                  >
                </div>
              </div>
              <router-link
                :to="'/forgotpassword'"
                class="text-base font-medium text-primary-600 hover:underline"
                >Forgot password?</router-link
              >
            </div>
            <button
              type="button"
              class="
                w-full
                text-white
                bg-indigo-500
                hover:bg-indigo-600
                focus:ring-4 focus:outline-none focus:ring-indigo-300
                font-medium
                rounded-lg
                text-lg
                px-5
                py-2.5
                text-center
              "
              v-on:click="login"
            >
              LOGIN
            </button>
            <p class="text-base font-light text-gray-500" style="
            padding-left: 25px;">
              Don’t have an account yet?
              <router-link
                :to="'/signup'"
                class="font-medium text-primary-600 hover:underline"
                >Sign up</router-link
              >
            </p>
          </form>
          <div
            v-if="this.errorAlert"
            class="
              w-auto
              bg-red-200
              border-x border-y border-red-900
              items-center
              py-2.5
              px-3
              text-lg
              font-medium
              text-red-900
              rounded-lg
              dark:bg-red-200
              text-center
              cursor-default
              mb-2
              ml-5
              mr-5
            "
          >
            <p>{{ errorMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { user } from "@/components/postProblem/stores/userData.js";
import axio from "axios";
import { properties } from "./axiosInvoc.js";
export default {
  name: "loginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      user: [],
      error: [],
      errorAlert: false,
      errorMsg: "",
      remember: false,
    };
  },
  mounted() {
    var userName;
    var email;
    if (user.email.length > 0) {
      userName = user.firstName;
      email = user.email;
    } else {
      userName = localStorage.getItem("firstName");
      email = localStorage.getItem("email");
    }

    if (userName !== null || email !== null) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    async login() {
      this.error = [];
      this.$refs.email.style.borderColor = "";
      this.$refs.password.style.borderColor = "";
      if (
        (this.form.email === "" || this.form.email.length === 0) &
        (this.form.password === "" || this.form.password.length === 0)
      ) {
        this.error.push("email");
        this.error.push("password");
      } else if (this.form.email === "" || this.form.email.length === 0) {
        this.error.push("email");
      } else if (this.form.password === "" || this.form.password.length === 0) {
        this.error.push("password");
      } else {
        let response = await axio.get(
          properties.server +
            "/user/authenticate?email=" +
            this.form.email +
            "&password=" +
            this.form.password,
          { timeout: 10000 }
        );
        this.user = response.data;
      }
      if (
        (this.form.email !== this.user.email) &
        (this.form.password !== this.user.password)
      ) {
        this.error.push("invalidEmail");
        this.error.push("invalidPassword");
      } else if (this.form.email !== this.user.email) {
        this.error.push("invalidEmail");
      } else if (this.form.password !== this.user.password) {
        this.error.push("invalidPassword");
      }
      if (this.error.length === 0) {
        this.error = [];
        this.errorMsg = null;

        user.storeUserInfo(
          this.user.email,
          this.user.firstName,
          this.user.lastName,
          this.user.userType,
          this.user.city,
          this.user.postcode,
          this.user.contactNo,
          this.user.profileImage,
          this.user.assignedPostcode
        );
        if (this.remember === true) {
          localStorage.setItem("email", this.user.email);
          localStorage.setItem("firstName", this.user.firstName);
          localStorage.setItem("lastName", this.user.lastName);
          localStorage.setItem("userType", this.user.userType);
          localStorage.setItem("city", this.user.city);
          localStorage.setItem("postcode", this.user.postcode);
          localStorage.setItem("contactNo", this.user.contactNo);
          localStorage.setItem("profileImage", this.user.profileImage);
          localStorage.setItem("assignedPostcode", this.user.assignedPostcode);
          // var user = localStorage.getItem("postcode");
          // console.log(user);
        }
        this.$router.push({ path: "/" });
      } else if (
        this.error.includes("email") & this.error.includes("password")
      ) {
        this.$refs.email.style.borderColor = "red";
        this.$refs.password.style.borderColor = "red";
        this.errorMsg = "Error: Enter Email & Password";
        this.errorAlert = true;
      } else if (this.error.includes("email")) {
        this.$refs.email.style.borderColor = "red";
        this.errorMsg = "Error: Enter Email";
        this.errorAlert = true;
      } else if (this.error.includes("password")) {
        this.$refs.password.style.borderColor = "red";
        this.errorMsg = "Error: Enter Password";
        this.errorAlert = true;
      } else if (
        this.error.includes("invalidEmail") ||
        this.error.includes("invalidPassword")
      ) {
        this.$refs.email.style.borderColor = "red";
        this.$refs.password.style.borderColor = "red";
        this.errorMsg = "Error: Invalid Email or Password";
        this.errorAlert = true;
      }
    },
  },
};
</script>