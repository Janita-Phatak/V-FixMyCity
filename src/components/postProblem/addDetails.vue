<template>
  <section class="text-gray-600 body-font">
    <div class="fixed z-30 w-full">
      <div
        class="
          container
          px-5
          mx-auto
          flex flex-wrap flex-col
          bg-gray-100
          py-1.5
        "
        style="
          box-shadow: var(--tw-ring-inset) 0 0 0
            calc(6px + var(--tw-ring-offset-width)) rgb(38 38 38 / 5%);
        "
      >
        <reportHeader :changeTitle="triggerTitle"></reportHeader>
      </div>
    </div>

    <section class="bg-gray-300" id="detailsBg">
      <div class="mt-[55px]">
        <div class="relative mb-2 mt-2">
          <!-- <SimpleTypeahead
            id="typeahead_id"
            placeholder="Search for an Incident / Request"
            :items="reportType"
            :minInputLength="0"
            :itemProjection="itemProjectionFunction"
            @selectItem="selectItemEventHandler"
            @onInput="onInputEventHandler"
            @onFocus="onFocusEventHandler"
            @onBlur="onBlurEventHandler"
          >
          </SimpleTypeahead> -->
          <div class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col">
            <div class="block items-center mb-2">
              <div class="relative w-full">
                <div
                  class="
                    flex
                    absolute
                    inset-y-0
                    left-0
                    items-center
                    pl-3
                    pointer-events-none
                  "
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400 z-10"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <SimpleTypeahead
                  class="
                    bg-gray-50
                    border border-gray-300
                    text-gray-900 text-lg
                    rounded-lg
                    focus:ring-blue-500 focus:border-blue-500
                    block
                    w-full
                    pl-10
                    p-2.5
                    dark:bg-gray-100
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:text-gray-900
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500
                    shadow-md
                  "
                  style="
                    box-shadow: var(--tw-ring-inset) 0 0 0
                      calc(4px + var(--tw-ring-offset-width)) rgb(48 48 48 / 5%);
                  "
                  id="typeahead_id"
                  placeholder="Search for a Problem Type"
                  :items="reportType"
                  :minInputLength="0"
                  :itemProjection="itemProjectionFunction"
                  @selectItem="selectItemEventHandler"
                  :value="type"
                />
              </div>

              <div v-if="other === true" class="relative mb-2 mt-5">
                <label
                  for="other"
                  class="leading-7 pl-4 text-gray-700 font-medium"
                  >DESCRIBE REQUEST / PROBLEM TYPE</label
                >
                <input
                  type="text"
                  v-model="type"
                  id="other"
                  name="other"
                  class="
                    w-full
                    bg-white
                    rounded
                    border border-gray-300
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                    text-lg
                    outline-none
                    text-gray-600
                    py-1
                    px-4
                    leading-8
                    transition-colors
                    duration-200
                    ease-in-out
                  "
                />
              </div>

              <div class="relative mb-2 mt-5">
                <label
                  for="description"
                  class="leading-7 pl-4 text-gray-700 font-medium"
                  >BRIEF DESCRIPTION OF REQUEST / PROBLEM</label
                >
                <textarea
                  type="text"
                  v-model="description"
                  id="description"
                  name="description"
                  class="
                    w-full
                    bg-white
                    rounded
                    border border-gray-300
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                    text-lg
                    outline-none
                    text-gray-600
                    py-1
                    px-4
                    leading-8
                    transition-colors
                    duration-200
                    ease-in-out
                    h-28
                    leading-[1.4rem]
                    pt-2.5
                  "
                />
              </div>
            </div>
          </div>

          <button
            class="
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
            "
            @click="saveDetails"
          >
            SAVE AND PROCEED
          </button>
          <button
            class="
              text-white
              bg-red-500
              border-0
              py-2
              px-8
              focus:outline-none
              hover:bg-red-600
              rounded
              text-lg
              self-center
              min-w-fit
              max-w-xs
              w-80
              block
              ml-auto
              mr-auto
            "
            @click="back"
          >
            BACK
          </button>
        </div>
      </div>
      <div
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
        v-show="error"
        id="myError"
      >
        {{ error }}
      </div>
    </section>

    <div class="fixed z-30 w-full b-0 l-0 r-0 z-22">
      <div
        class="
          container
          mx-auto
          flex flex-wrap flex-col
          bg-gray-100
          b-0
          fixed
          l-0
          r-0
        "
        id="steps"
        style="
          box-shadow: var(--tw-ring-inset) 0 0 0
            calc(6px + var(--tw-ring-offset-width)) rgb(88 87 87 / 5%);
        "
      >
        <stepsToComplete
          class="b-0 fixed mx-auto l-0 r-0"
          :purpleDetails="purpleDetails"
          :greenDetails="greenDetails"
          :greenLocation="greenLocation"
          :greenImage="greenImage"
          :grayLocation="grayLocation"
          :grayImage="grayImage"
          :grayDetails="grayDetails"
          :graySubmit="graySubmit"
        ></stepsToComplete>
      </div>
    </div>
  </section>
</template>

<script>
import stepsToComplete from "./steps.vue";
import reportHeader from "./reportHeader.vue";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import { data } from "./stores/reportData.js";
export default {
  name: "addDetailsTab",
  components: { stepsToComplete, reportHeader, SimpleTypeahead },
  data() {
    return {
      triggerTitle: "",
      purpleDetails: false,
      greenDetails: false,
      greenLocation: false,
      greenImage: false,

      reportType: [
        "Tree Maintenance",
        "Pothole",
        "Pavement & Foothpath",
        "Sweeping / Missed Trash",
        "Traffic Signal",
        "Street Light",
        "Traffic & Street Sign",
        "Water Leak",
        "Chemical Spill/Discharge",
        "Flooding",
        "Animals & Pests",
        "Graffiti & Vandalism",
        "Noise & Pollution",
        "Parking & Cars",
        "Park, Playground & Equipments",
        "Other",
      ],
      type: "",
      description: "",
      other: false,
      error: "",
      grayLocation: false,
      grayImage: false,
      grayDetails: false,
      graySubmit: false,
    };
  },
  mounted() {
    if(data.imageURL.length === 0){
      this.grayDetails = true;
      this.$router.push({ name: "uploadImage" });
    }
    this.triggerTitle = "addDetailsTab";
    this.purpleDetails = true;
    if(data.address.length > 0 || data.city.length > 0){
      this.greenLocation = true;
    } else{
      this.grayLocation = true;
    }
    if(data.imageURL.length > 0){
      this.greenImage = true;
    } else {
      this.grayImage = true;
    }
    if(data.type.length > 0){
      this.type = data.type;
      this.description = data.description;

      var isOther = true;
      for(var i=0; i<this.reportType.length; i++){
        if(this.type === this.reportType[i]){
          isOther = false;
        }

      }
      if(isOther === true){
        this.other = true;
      }
    }
  },
  methods: {
    saveDetails() {
      if (this.type.length > 0 && this.description.length > 0) {
        data.setDetails(this.type, this.description);
        this.purpleDetails = false;
        this.greenDetails = true;
        this.$router.push({ name: "reviewSubmitTab" });
      } else {
        const box = document.getElementById("myError");
        box.style.visibility = "visible";

        if (this.type.length === 0 && this.description.length === 0) {
          console.warn("Please Select Problem Type & Add Problem Description");
          this.error = "Please Select Problem Type & Add Problem Description";
          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
        } else if (this.type.length === 0) {
          console.warn("Please Select Problem Type");
          this.error = "Please Select Problem Type";
          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
        } else if (this.description.length === 0) {
          console.warn("Please Add Problem Description");
          this.error = "Please Add Problem Description";
          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
        }
      }
    },
    back() {
      this.$router.push({ name: "uploadImage" });
    },
    // onInputEventHandler(e) {
    //   // console.log(e);
    //   this.type = e.input;
    // },
    selectItemEventHandler(e) {
      // console.log(e);
      this.type = e;
      if (e === "Other") {
        this.other = true;
      } else {
        this.other = false;
      }
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
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
}

</style>