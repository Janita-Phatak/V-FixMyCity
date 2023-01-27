<template>
  <div class="flex mx-auto flex-wrap">
    <a
      v-if="addLocationTab === true"
      class="
        sm:px-6
        py-3
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        bg-gray-100
        inline-flex
        items-center
        leading-none
        border-indigo-500
        text-indigo-500
        tracking-wider
        rounded-t
        text-lg
      "
      id="addLocationTab"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      ADD LOCATION
    </a>
    <a
      v-if="uploadImageTab === true"
      class="
        sm:px-6
        py-3
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        bg-gray-100
        inline-flex
        items-center
        leading-none
        border-indigo-500
        text-indigo-500
        tracking-wider
        rounded-t
        text-lg
      "
      id="uploadImageTab"
    >
      <!-- <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-5 h-5 mr-3"
        viewBox="0 0 24 24"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg
      > -->

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      UPLOAD IMAGE
    </a>
    <a
      v-if="addDetailsTab === true"
      class="
        sm:px-6
        py-3
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        bg-gray-100
        inline-flex
        items-center
        leading-none
        border-indigo-500
        text-indigo-500
        tracking-wider
        rounded-t
        text-lg
      "
      id="addDetailsTab"
    >
      <!-- <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-5 h-5 mr-3"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="3"></circle>
        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path></svg
      > -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      ADD DETAILS
    </a>
    <a
      v-if="reviewSubmitTab === true"
      class="
        sm:px-6
        py-3
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        bg-gray-100
        inline-flex
        items-center
        leading-none
        border-indigo-500
        text-indigo-500
        tracking-wider
        rounded-t
        text-lg
      "
      id="reviewSubmitTab"
    >
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
      REVIEW & SUBMIT
    </a>
  </div>
</template>

<script>
export default {
  name: "reportHeader",
  props: ["changeTitle"],
  data() {
    return {
      addLocationTab: true,
      uploadImageTab: false,
      addDetailsTab: false,
      reviewSubmitTab: false,
    };
  },
  watch: {
    changeTitle: function (newVal) {
      this.titleSwitch(newVal);
    },
  },
  methods: {
    titleSwitch(tab) {
      if (tab === "addLocationTab") {
        this.addLocationTab = true;
        this.uploadImageTab = false;
        this.addDetailsTab = false;
        this.reviewSubmitTab = false;
      } else if (tab === "uploadImageTab") {
        this.addLocationTab = false;
        this.uploadImageTab = true;
        this.addDetailsTab = false;
        this.reviewSubmitTab = false;
      } else if (tab === "addDetailsTab") {
        this.addLocationTab = false;
        this.uploadImageTab = false;
        this.addDetailsTab = true;
        this.reviewSubmitTab = false;
      } else if (tab === "reviewSubmitTab") {
        this.addLocationTab = false;
        this.uploadImageTab = false;
        this.addDetailsTab = false;
        this.reviewSubmitTab = true;
      }
    },
  },
};
</script>