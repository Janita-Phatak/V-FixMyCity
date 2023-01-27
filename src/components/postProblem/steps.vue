<template>
  <!-- <div class="flex mx-auto flex-wrap">
    <a
        class="
        sm:px-6
        py-1
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
        rounded-t
        m-1.5
        ml-5
        mr-5
      "
      id="addLocationTab"
    > -->
  <div class="flex mx-auto w-auto">
    <a
      class="
        sm:px-6
        py-1
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        inline-flex
        items-center
        leading-none
        border-gray-200
        m-1.5
        ml-5
        mr-5
      "
      id="addLocationTab2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
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
      <!-- ADD LOCATION -->
    </a>
    <a
      class="
        sm:px-6
        py-1
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        inline-flex
        items-center
        leading-none
        border-gray-200
        m-1.5
        ml-5
        mr-5
      "
      id="uploadImageTab2"
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
        class="h-6 w-6"
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
      <!-- UPLOAD IMAGE -->
    </a>
    <a
      class="
        sm:px-6
        py-1
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        inline-flex
        items-center
        leading-none
        border-gray-200
        m-1.5
        ml-5
        mr-5
      "
      id="addDetailsTab2"
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
        class="h-6 w-6"
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
      <!-- ADD DETAILS -->
    </a>
    <a
      class="
        sm:px-6
        py-1
        w-auto
        justify-center
        sm:justify-start
        border-b-2
        title-font
        font-medium
        inline-flex
        items-center
        leading-none
        border-gray-200
        m-1.5
        ml-5
        mr-5
      "
      id="reviewSubmitTab2"
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
        class="w-6 h-6"
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
      <!-- REVIEW & SUBMIT -->
    </a>
  </div>
</template>

<script>
export default {
  name: "stepsToComplete",
  props: [
    "purpleLocation",
    "greenLocation",
    "grayLocation",
    "purpleImage",
    "greenImage",
    "grayImage",
    "purpleDetails",
    "greenDetails",
    "grayDetails",
    "purpleSubmit",
    "graySubmit",
  ],
  data() {
    return {};
  },
  watch: {
    purpleLocation: function (newVal) {
      this.purpleLocationSet(newVal);
    },
    purpleImage: function (newVal) {
      this.purpleImageSet(newVal);
    },
    purpleDetails: function (newVal) {
      this.purpleDetailsSet(newVal);
    },
    purpleSubmit: function (newVal) {
      this.purpleSubmitSet(newVal);
    },
    greenLocation: function (newVal) {
      this.greenLocationSet(newVal);
    },
    greenImage: function (newVal) {
      this.greenImageSet(newVal);
    },
    greenDetails: function (newVal) {
      this.greenDetailsSet(newVal);
    },
    grayLocation: function (newVal) {
      this.grayLocationSet(newVal);
    },
    grayImage: function (newVal) {
      this.grayImageSet(newVal);
    },
    grayDetails: function (newVal) {
      this.grayDetailsSet(newVal);
    },
    graySubmit: function (newVal) {
      this.graySubmitSet(newVal);
    },
  },
  methods: {
    purpleLocationSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("addLocationTab2");
        box.style.color = "rgb(99 102 241)"; //purple
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(99 102 241)";
      }
    },
    purpleImageSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("uploadImageTab2");
        box.style.color = "rgb(99 102 241)"; //purple
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(99 102 241)";
      }
    },
    purpleDetailsSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("addDetailsTab2");
        box.style.color = "rgb(99 102 241)"; //purple
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(99 102 241)";
      }
    },
    purpleSubmitSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("reviewSubmitTab2");
        box.style.color = "rgb(99 102 241)"; //purple
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(99 102 241)";
      }
    },

    greenLocationSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("addLocationTab2");
        box.style.color = "rgb(34 197 94)"; //green
        box.style.borderBottomWidth = "0";
      }
    },
    greenImageSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("uploadImageTab2");
        box.style.color = "rgb(34 197 94)"; //green
        box.style.borderBottomWidth = "0";
      }
    },
    greenDetailsSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("addDetailsTab2");
        box.style.color = "rgb(34 197 94)"; //green
        box.style.borderBottomWidth = "0";
      }
    },

    grayLocationSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("addLocationTab2");
        box.style.color = "inherit"; //gray
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(229 231 235)"; //gray
      }
    },
    grayImageSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("uploadImageTab2");
        box.style.color = "inherit"; //gray
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(229 231 235)"; //gray
      }
    },
    grayDetailsSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("addDetailsTab2");
        box.style.color = "inherit"; //gray
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(229 231 235)"; //gray
      }
    },
    graySubmitSet(newVal) {
      if (newVal === true) {
        const box = document.getElementById("reviewSubmitTab2");
        box.style.color = "inherit"; //gray
        box.style.borderBottomWidth = "2px";
        box.style.borderBottomColor = "rgb(229 231 235)"; //gray
      }
    },
  },
};
</script>
