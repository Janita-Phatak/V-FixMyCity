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
            Verify your Email
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
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
                v-model.lazy="form.email"
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
                readonly
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
              :to="'/signup'"
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
          ><p>{{ errorMsg }}</p></div>
          <div
            v-if="this.successAlert"
            class="
              w-auto
              bg-green-200
              border-x border-y border-green-900
              items-center
              py-2.5
              px-3
              text-lg
              font-medium
              text-green-900
              rounded-lg
              dark:bg-green-200
              text-center
              cursor-default
              mb-2
              ml-5
              mr-5
            "
          >
            <p>{{ successMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import {properties} from "./axiosInvoc.js";
import { user } from "./postProblem/stores/userData.js";
export default {
  name: "emailVerification",
  data() {
    return {
      form: {
        email: user.email,
        otp: null,
        otpSent: false,
        timeout: null,
      },
      error: [],
      errorAlert: false,
      errorMsg: "",
      successAlert: false,
      successMsg: "",
      otpSent: false,
      verified: false,
    };
  },
  mounted() {
    if (!this.form.email) {
      this.$router.push({ name: "signUpPage" });
    }
  },
  methods: {
    async sendOtp() {
      let response = await axios.get(
        properties.server+"/otp/send?email=" + this.form.email +"&subject=OTP for Email Verification"
      );
      if (response.status === 200) {
        console.log("Otp Sent");
        this.errorAlert = false;
        this.otpSent = true;
        // Set otpSent to true and display success message
        this.successMsg = "OTP sent successfully, use it within 3 minutes";
        this.successAlert = true;

       
        let remainingTime = 180; // set the remaining time to 180 seconds (3 minutes)
        let timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                this.successMsg = `OTP sent successfully, enter it within ${remainingTime} seconds`;
            } else {
                clearInterval(timerInterval);
                this.otpSent = false;
                this.errorMsg = "OTP expired, Try again";
                this.errorAlert = true;
            }
        }, 1000);

        // Set timeout to discard OTP after 3 minutes
        this.timeout = setTimeout(() => {
            clearInterval(timerInterval);
            this.otpSent = false;
            this.errorMsg = "OTP expired, Try again";
            this.errorAlert = true;
            clearTimeout(this.timeout);
        }, 180000); 

      } else {
        
        console.log("Error : OTP not sent");
        this.errorMsg = "Error : OTP not sent";
        this.errorAlert = true;
        this.otpSent = false;
      }
    },
    async submitOtp() {
      let response = await axios.post(
        properties.server + "/otp/verify",
        {
            email: this.form.email,
            otp: this.form.otp
        }
      );
      let result = response.data;
      if (result === "verified") {
        console.log("Otp Verified");

        const response = await axios.post(properties.server + "/user/create", {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          userType: user.userType,
          city: "",
          postcode: "",
          contactNo: "",
          profileImage: "",
          assignedPostcode: []
        });
        if (response.status == 200) {
          this.$router.push({ name: "loginPage" });
        } else {
          console.log("Error : Something went wrong");
          this.errorMsg = "Error : Something went wrong";
          this.errorAlert = true;
        }
      } else {
        console.log("Error : Wrong OTP");
        this.successAlert = false;
        this.errorMsg = "Error : Wrong OTP";
        this.errorAlert = true;
      }
    },
  },
};
</script>