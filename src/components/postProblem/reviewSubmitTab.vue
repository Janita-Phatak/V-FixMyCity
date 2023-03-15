<template>
  <section class="text-gray-600 body-font">
    <div class="fixed z-30 w-full">
      <div class="
          container
          px-5
          mx-auto
          flex flex-wrap flex-col
          bg-gray-100
          py-1.5
          fixed
          top-0
        " style="
          box-shadow: var(--tw-ring-inset) 0 0 0
            calc(6px + var(--tw-ring-offset-width)) rgb(38 38 38 / 5%);
        ">
        <reportHeader :changeTitle="triggerTitle"></reportHeader>
      </div>
    </div>

    <section class="bg-gray-300" id="detailsBg">
      <div class="mt-[55px] pt-2">
        <div class="relative mt-2 bg-gray-50 rounded-3xl w-auto mx-3 overflow-clip">
          <img class="preview max-h-[40rem] h-auto w-auto my-auto" :src="tempImage" />
        </div>

        <div class="px-5 py-2 pb-1 mx-auto flex flex-col w-full relative">
          <h1 class="
              text-xl
              relative
              mx-auto
              font-medium
              title-font
              mb-2
              text-gray-900
            ">
            LOCATION
          </h1>
          <div class="relative mb-2 mt-2">
            <label for="street_address" class="leading-7 pl-4 text-gray-700 font-medium">ADDRESS</label>
            <input type="text" :value="street_address" id="street_address" name="street_address" class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-600
                py-1
                px-4
                leading-8
                transition-colors
                duration-200
                ease-in-out
              " readonly />
          </div>
          <div class="flex">
            <div class="relative mb-4 grid mr-4 w-fit">
              <label for="city" class="leading-7 pl-4 w-fit text-gray-700 font-medium">CITY</label>
              <input type="text" id="city" name="city" :value="city" class="
                  bg-white
                  rounded
                  border border-gray-300
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-600
                  py-1
                  px-4
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                  w-44
                " readonly />
            </div>
            <div class="relative mb-4 grid ml-2 w-fit">
              <label for="postcode" class="leading-7 pl-4 w-fit text-gray-700 font-medium">POSTCODE</label>
              <input type="text" id="postcode" name="postcode" :value="postcode" class="
                  bg-white
                  rounded
                  border border-gray-300
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-600
                  py-1
                  px-4
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                  w-44
                " readonly />
            </div>
          </div>
          <div class="relative mb-4">
            <label for="landmark" class="leading-7 pl-4 text-gray-700 font-medium">ADD MORE DETAILS (IF ANY)</label>
            <input type="text" id="additionalDetails" name="additionalDetails" v-model="additionalDetails" class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-600
                py-1
                px-4
                leading-8
                transition-colors
                duration-200
                ease-in-out
              " readonly />
          </div>
        </div>
        <div class="px-5 py-1 pb-14 mx-auto flex flex-col w-full relative">
          <h1 class="
              text-xl
              relative
              mx-auto
              font-medium
              title-font
              mb-2
              text-gray-900
            ">
            PROBLEM DETAILS
          </h1>
          <div class="relative mb-2 mt-2">
            <label for="type" class="leading-7 pl-4 text-gray-700 font-medium">PROBLEM TYPE</label>
            <input type="text" :value="type" id="type" name="type" class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-600
                py-1
                px-4
                leading-8
                transition-colors
                duration-200
                ease-in-out
              " readonly />
          </div>
          <div class="relative mb-3 mt-2">
            <label for="description" class="leading-7 pl-4 text-gray-700 font-medium">PROBLEM DESCRIPTION</label>
            <input type="text" :value="description" id="description" name="description" class="
                w-full
                bg-white
                rounded
                border border-gray-300
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                text-base
                outline-none
                text-gray-600
                py-1
                px-4
                leading-8
                transition-colors
                duration-200
                ease-in-out
              " readonly />
          </div>
          <button class="
              text-white
              bg-red-500
              border-0
              py-2
              px-8
              focus:outline-none
              hover:bg-red-600
              rounded
              text-lg
              mb-2
              self-center
              min-w-fit
              max-w-xs
              w-80
              block
              ml-auto
              mr-auto
              mt-2
            " @click="editDetails">
            EDIT DETAILS
          </button>
          <button class="
              text-white
              bg-indigo-500
              border-0
              py-2
              px-8
              focus:outline-none
              hover:bg-indigo-600
              rounded
              text-lg
              mb-3
              self-center
              min-w-fit
              max-w-xs
              w-80
              block
              ml-auto
              mr-auto
              mt-1
            " @click="saveDetails">
            SAVE AND PROCEED
          </button>
        </div>
      </div>
    </section>

    <div class="fixed z-30 w-full b-0 l-0 r-0 z-22">
      <div class="
          container
          mx-auto
          flex flex-wrap flex-col
          bg-gray-100
          b-0
          fixed
          l-0
          r-0
        " id="steps" style="
          box-shadow: var(--tw-ring-inset) 0 0 0
            calc(6px + var(--tw-ring-offset-width)) rgb(88 87 87 / 5%);
        ">
        <stepsToComplete class="b-0 fixed mx-auto l-0 r-0" :purpleSubmit="purpleSubmit" :greenLocation="greenLocation"
          :greenImage="greenImage" :greenDetails="greenDetails" :grayLocation="grayLocation" :grayImage="grayImage"
          :grayDetails="grayDetails" :graySubmit="graySubmit"></stepsToComplete>
      </div>
    </div>
  </section>
</template>

<script>
import stepsToComplete from "./steps.vue";
import reportHeader from "./reportHeader.vue";
import { data } from "./stores/reportData.js";
import { user } from "@/components/postProblem/stores/userData.js";
import { properties } from "../axiosInvoc.js";
import axios from "axios";
export default {
  name: "reviewSubmitTab",
  components: { stepsToComplete, reportHeader },
  data() {
    return {
      trigger: "",
      purpleSubmit: false,
      greenSubmit: false,
      greenLocation: false,
      greenImage: false,
      greenDetails: false,
      city: "",
      area: "",
      postcode: "",
      additionalDetails: "",
      street_address: "",
      address: "",
      lat: "",
      long: "",
      imageURL: "",
      type: "",
      description: "",
      email: "",
      userName: "",
      postID: "",
      grayLocation: false,
      grayImage: false,
      grayDetails: false,
      graySubmit: false,
    };
  },
  mounted() {
    if (data.type.length === 0) {
      this.graySubmit = true;
      this.$router.push({ name: "addDetailsTab" });
    }
    this.triggerTitle = "reviewSubmitTab";
    this.purpleSubmit = true;

    if (data.address.length > 0 || data.city.length > 0) {
      this.greenLocation = true;
    } else {
      this.grayLocation = true;
    }
    if (data.imageURL.length > 0) {
      this.greenImage = true;
    } else {
      this.grayImage = true;
    }
    if (data.type.length > 0) {
      this.greenDetails = true;
    } else {
      this.grayDetails = true;
    }

    if (user.email.length === 0 && localStorage.getItem("email").length > 0) {
      user.storeUserInfo(
        localStorage.getItem("email"),
        localStorage.getItem("firstName"),
        localStorage.getItem("lastName"),
        localStorage.getItem("userType"),
        localStorage.getItem("city"),
        localStorage.getItem("postcode"),
        localStorage.getItem("contactNo"),
        localStorage.getItem("profileImage")
      );
    }

    this.city = data.city;
    this.area = data.area;
    this.postcode = data.postcode;
    this.additionalDetails = data.additionalDetails;
    this.street_address = data.street_address;
    this.address = data.address;
    this.lat = data.lat;
    this.long = data.long;
    this.imageURL = data.imageURL;
    this.tempImage = data.tempImage;
    this.type = data.type;
    this.description = data.description;
    this.email = user.email;
    this.userName = user.firstName;
  },
  methods: {
    async saveDetails() {
      const response = await axios.post(properties.server + "/post/create", {
        postID: "",
        email: this.email,
        userName: this.userName,
        address: this.address,
        street_address: this.street_address,
        area: this.area,
        city: this.city,
        postcode: this.postcode,
        additionalDetails: this.additionalDetails,
        lat: this.lat,
        lng: this.long,
        imageURL: this.imageURL,
        type: this.type,
        description: this.description,
        day: 0,
        month: 0,
        year: 0,
        time: "",
        status: "reported",
        resolvedDate: "",
        date: "",
        hour: 0,
        likedBy: [],
        minute: 0,
        second: 0,
        commentIDs: []
      });
      if (response.status == 200) {
        data.clearDetails();
        console.log("Submitted Successfully");
        this.$router.push({ name: "postsView" });
      }
    },
    editDetails() {
      this.$router.push({ name: "addDetailsTab" });
    },
  },
};
</script>

<style scoped>
#steps {
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
  left: 0 !important;
  right: 0 !important;
}

#detailsBg {
  /* position: fixed !important; */
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
}

img.preview {
  display: block;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
}
</style>