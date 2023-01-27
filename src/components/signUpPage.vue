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
            Create new account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="firstName"
                class="block mb-2 text-base font-medium text-gray-900"
                >First Name</label
              >
              <input
                type="text"
                name="firstName"
                id="firstName"
                v-model="form.firstName"
                ref="firstName"
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
                placeholder="Enter your First Name"
                required=""
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block mb-2 text-base font-medium text-gray-900"
                >Last Name</label
              >
              <input
                type="text"
                name="lastName"
                id="lastName"
                v-model="form.lastName"
                ref="lastName"
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
                placeholder="Enter your Last Name"
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-base font-medium text-gray-900"
                >Email</label
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
            <div>
              <label
                for="confirmPassword"
                class="block mb-2 text-base font-medium text-gray-900"
                >Confirm Password</label
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
              v-on:click="signUp"
            >
              SIGN UP
            </button>
            <p class="text-base font-light text-gray-500">
              Already have an account?
              <router-link
                :to="'/login'"
                class="font-medium text-primary-600 hover:underline"
                >Log in</router-link
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
import { user } from "./postProblem/stores/userData.js";
import axios from "axios";
import { properties } from './axiosInvoc.js';

export default {
  name: "signUpPage",
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      },
      userType: "",
      error: [],
      errorAlert: false,
      errorMsg: "",
    };
  },
  mounted() {
    if (user.email.length > 0) {
      this.email = user.email;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
  },
  methods: {
    async signUp() {
      this.error = [];
      this.$refs.firstName.style.borderColor = "";
      this.$refs.email.style.borderColor = "";
      this.$refs.password.style.borderColor = "";
      this.$refs.confirmPassword.style.borderColor = "";
      if (
        (this.form.firstName === "" || this.form.firstName.length === 0) &
        (this.form.email === "" || this.form.email.length === 0) &
        (this.form.password === "" || this.form.password.length === 0) &
        (this.form.confirmPassword === "" ||
          this.form.confirmPassword.length === 0)
      ) {
        this.error.push("firstName");
        this.error.push("email");
        this.error.push("password");
        this.error.push("confirmPassword");
      } else if (
        this.form.firstName === "" ||
        this.form.firstName.length === 0
      ) {
        this.error.push("firstName");
      } else if (this.form.email === "" || this.form.email.length === 0) {
        this.error.push("email");
      } else if (this.form.password === "" || this.form.password.length === 0) {
        this.error.push("password");
      } else if (
        this.form.confirmPassword === "" ||
        this.form.confirmPassword.length === 0
      ) {
        this.error.push("confirmPassword");
      } else {
        if (this.form.password !== this.form.confirmPassword) {
          this.error.push("passNotMatch");
        } else {
          this.errorMsg = null;
          const response = await axios.get(
            properties.server+"/user/check?email=" + this.form.email, {timeout: 10000}
          );

          if (response.data === true) {
            this.errorMsg = "Error: Email is already registered";
            this.errorAlert = true;
          } else {
            if (this.form.email.indexOf("@officer.fmc") != -1) {
              this.userType = "officer";
            } else if (this.form.email.indexOf("@admin.fmc") != -1) {
              this.userType = "admin";
            } else {
              this.userType = "general";
            }
            user.userSignUp(
              this.form.email,
              this.form.firstName,
              this.form.lastName,
              this.form.password,
              this.userType
            );

            this.$router.push({ name: "emailVerification" });
          }
        }
      }
      if (this.error.includes("passNotMatch")) {
        this.$refs.password.style.borderColor = "red";
        this.$refs.confirmPassword.style.borderColor = "red";
        this.errorMsg = "Error: Password did not Match";
        this.errorAlert = true;
      } else {
        if (this.error.includes("firstName")) {
          this.$refs.firstName.style.borderColor = "red";
        }
        if (this.error.includes("email")) {
          this.$refs.email.style.borderColor = "red";
        }
        if (this.error.includes("password")) {
          this.$refs.password.style.borderColor = "red";
        }
        if (this.error.includes("confirmPassword")) {
          this.$refs.confirmPassword.style.borderColor = "red";
        }
        if (this.error.includes("passNotMatch")) {
          this.$refs.password.style.borderColor = "red";
          this.$refs.confirmPassword.style.borderColor = "red";
        }
        if (this.error.length > 0) {
          this.errorMsg = "Error: Please fill the mandatory fields";
          this.errorAlert = true;
        }
      }
    },
  },
};
</script>