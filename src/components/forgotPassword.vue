<template>
  <section class="bg-gray-50" v-show="!reset">
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
            Forgot Your Password?
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
            <div v-if="otpSent">
              <label
                for="otp"
                class="block mb-2 text-base font-medium text-gray-900"
                >OTP</label
              >
              <input
                type="number"
                name="otp"
                id="otp"
                v-model="form.otp"
                ref="otp"
                placeholder="Enter OTP"
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
              v-if="!otpSent"
              v-on:click="sendOtp"
            >
              Send OTP
            </button>
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
              v-if="otpSent"
              v-on:click="submitOtp"
            >
              Verify
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
<resetPassword v-show="reset" :userEmail="this.form.email">
</resetPassword>
</template>

<script>
import axios from "axios";
import { properties } from "./axiosInvoc.js";
import resetPassword from "./resetPassword.vue";
export default {
  name: "forgotPassword",
  components: { resetPassword },
  data() {
    return {
      otpSent: false,
      form: {
        email: "",
        otp: "",
      },
      user: [],
      error: [],
      errorAlert: false,
      errorMsg: "",
      reset: false,
    };
  },
  methods: {
    async sendOtp() {
      if (this.form.email === "" || this.form.email.length === 0) {
        this.errorMsg = "Error : Enter Email";
        this.errorAlert = true;
        this.otpSent = false;
      } else {
        let result = await axios.get(
          properties.server + "/user/check?email=" + this.form.email,
          { timeout: 10000 }
        );

        if (result.data === true) {
          let response = await axios.get(
            properties.server + "/otp/send?email=" + this.form.email + "&subject=OTP for Password Reset"
          );
          if (response.status === 200) {
            this.errorAlert = false;
            this.otpSent = true;
          } else {
            this.errorMsg = "Error : OTP not sent";
            this.errorAlert = true;
            this.otpSent = false;
          }
        } else {
          this.errorMsg = "Error : Email not Registered";
          this.errorAlert = true;
          this.otpSent = false;
        }
      }
    },
    async submitOtp() {
      let response = await axios.post(
        properties.server + "/otp/verify",
        this.form
      );

      let result = response.data;
      if (result === "verified") {
        this.reset = true;
      } else {
        this.errorMsg = "Error : Wrong OTP";
        this.errorAlert = true;
        this.reset = false;
      }
    },
  },
};
</script>