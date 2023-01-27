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
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        <img class="w-8 h-8 mr-2" src="../assets/image.png" alt="logo" />
        FixMyCity
      </a>
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
            Reset Password
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="password"
                class="block mb-2 text-base font-medium text-gray-900"
                >New Password</label
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
            <div>
              <label
                for="confirmPassword"
                class="block mb-2 text-base font-medium text-gray-900"
                >Confirm New Password</label
              >
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                v-model="form.confirmPassword"
                ref="confirmPassword"
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
              v-on:click="resetPassword"
            >
              Reset Password
            </button>
            <router-link
              :to="'/login'"
              class="
                w-full
                text-white
                bg-red-500
                hover:bg-red-600
                focus:ring-4 focus:outline-none focus:ring-red-300
                font-medium
                rounded-lg
                text-lg
                px-5
                py-2.5
                text-center
                block
              "
            >
              Cancel
            </router-link>
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
import axios from "axios";
import { properties } from "./axiosInvoc.js";
export default {
  name: "resetPassword",
  props: {
    userEmail: String,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: [],
      errorAlert: false,
      errorMsg: "",
    };
  },
  methods: {
    async resetPassword() {
      this.form.email = this.userEmail;
      if (
        this.form.password === "" ||
        this.form.password.length === 0 ||
        this.form.confirmPassword === "" ||
        this.form.confirmPassword.length === 0
      ) {
        console.log("Error : fields cannot be blank");
        this.errorMsg = "Error : fields cannot be blank";
        this.errorAlert = true;
        this.otpSent = false;
      } else {
        if (this.form.password === this.form.confirmPassword) {
          let response = await axios.put(
            properties.server+"/user/reset?email=" +
              this.form.email +
              "&password=" +
              this.form.password
          );
          if (response.status === 200) {
            console.log("Password Changed");
            this.$router.push({ name: "loginPage" });
          } else {
            console.log("Error : Request Failed");
            this.errorMsg = "Error : Request Failed";
            this.errorAlert = true;
          }
        } else {
          console.log("Error : Passwords do not match");
          this.errorMsg = "Error : Passwords do not match";
          this.errorAlert = true;
          this.otpSent = false;
        }
      }
    },
  },
};
</script>