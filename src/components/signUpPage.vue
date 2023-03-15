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
                @blur="validateFirstName"
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
            <div v-if="firstNameError"  class="error text-red-500">{{ firstNameErrorMessage }}</div>
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
                @blur="validateLastName"
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
            <div v-if="lastNameError" class="error text-red-500">{{ lastNameErrorMessage }}</div>
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
                @blur="validateEmail"
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
            <div v-if="emailError"  class="error text-red-500">{{ emailErrorMessage }}</div>
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
                @blur="validatePassword"
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
            <div v-if="passwordError"  class="error text-red-500">{{ passwordErrorMessage }}</div>
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
                @blur="validateConfirmPassword"
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
            <div v-if="confirmPasswordError"  class="error text-red-500">{{ confirmPasswordErrorMessage }}</div>
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
            <p class="text-base font-light text-gray-500 padding-left-35px;" style="
            padding-left: 35px;"> 
            Already have an account? 
            <a href="/login" class="font-medium text-primary-600 hover:underline">Log in</a></p>
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
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
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
    validateFirstName() {
        const regex = /^[a-zA-Z]+$/;
    if (!this.form.firstName) {
      this.firstNameError = true;
      this.firstNameErrorMessage = "First name is required.";
      this.$refs.firstName.style.borderColor = "red"; 
    } else if (!regex.test(this.form.firstName)) {
      this.firstNameError = true;
      this.firstNameErrorMessage = "First name should contain only letters.";
      this.$refs.firstName.style.borderColor = "red"; 
    } else {
      this.firstNameError = false;
      this.form.firstNameErrorMessage = "";
      this.$refs.firstName.style.borderColor = ""; 
    }
    },
    validateLastName() {
      const regex = /^[a-zA-Z]+$/;
      if (!this.form.lastName) {
        this.lastNameError = true;
        this.lastNameErrorMessage = "Last name is required.";
        this.$refs.lastName.style.borderColor = "red"; 
      } else if (!regex.test(this.form.lastName)) {
        this.lastNameError = true;
        this.lastNameErrorMessage = "Last name should contain only letters.";
        this.$refs.lastName.style.borderColor = "red";
      } else {
        this.lastNameError = false;
        this.form.lastNameErrorMessage = "";
        this.$refs.lastName.style.borderColor = "";
      }
    },
    validateEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.form.email) {
          this.emailError = true;
          this.emailErrorMessage = "Email is required.";
          this.$refs.email.style.borderColor = "red";
        } else if (!regex.test(this.form.email)) {
          this.emailError = true;
          this.emailErrorMessage = "Enter a valid Email.";
          this.$refs.email.style.borderColor = "red";
        } else {
          this.emailError = false;
          this.form.emailErrorMessage = "";
          this.$refs.email.style.borderColor = "";
        }
    },
    validatePassword() {
      const regex = /^(?=.*[!@#$%^&*])(?=.*\d{3,}).{8,}$/;
      if (!this.form.password) {
        this.passwordError = true;
        this.passwordErrorMessage = "Password is required.";
        this.$refs.password.style.borderColor = "red"; 
      } else if (!regex.test(this.form.password)) {
        this.passwordError = true;
        this.passwordErrorMessage = "Password should have alteast 8 length, 3 numbers, 1 special character .";
        this.$refs.password.style.borderColor = "red";
      } else {
        this.passwordError = false;
        this.form.passwordErrorMessage = "";
        this.$refs.password.style.borderColor = "";
      }
    },
    validateConfirmPassword() {
      if (!this.form.confirmPassword) {
        this.confirmPasswordError = true;
        this.confirmPasswordErrorMessage = "Password is required.";
        this.$refs.confirmPassword.style.borderColor = "red"; 
      } else if (this.form.password !== this.form.confirmPassword) {
        this.confirmPasswordError = true;
        this.confirmPasswordErrorMessage = "Passwords do not match.";
        this.$refs.confirmPassword.style.borderColor = "red"; 
      } else {
        this.confirmPasswordError = false;
        this.confirmPasswordErrorMessage = "";
        this.$refs.confirmPassword.style.borderColor = "";
      }
    },

    validateAll() {
      this.validateFirstName();
      this.validateLastName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();
    },

    async signUp() {
      this.validateAll();
      this.error = [];

      if (this.firstNameError) {
        this.error.push("firstName");
      }
      if (this.lastNameError) {
        this.error.push("lastName");
      }
      if (this.emailError) {
        this.error.push("email");
      }
      if (this.passwordError) {
        this.error.push("password");
      }
      if (this.confirmPasswordError) {
        this.error.push("confirmPassword");
      }
      // If there are any errors, do not proceed with the sign-up process
      if (this.error.length > 0) {
        return;
      }
      const response = await axios.get(
        properties.server+"/user/check?email=" + this.form.email, {timeout: 10000}
      );

      if (response.data === true) {
        this.errorMsg = "Error: Email is already registered";
        this.errorAlert = true;
      } else {
        if (this.form.email.indexOf("@officer.fmc") != -1) {
          this.userType = "official";
        } else if (this.form.email.indexOf("@admin.fmc") != -1) {
          this.userType = "admin";
        }
          else if (this.form.email.indexOf(".fm@workerc") != -1) {
          this.userType = "worker";
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
  }

</script>