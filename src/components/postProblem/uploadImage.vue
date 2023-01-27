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

    <div class="fixed z-10 w-full" style="margin-top: 64vh">
      <div class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col">
        <div
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
          "
          v-if="uploaded === true"
          id="uploadPrompt"
        >
          UPLOADED SUCCESSFULLY!
        </div>
      </div>
    </div>

    <div class="fixed z-10 w-full" style="margin-top: 64vh">
      <div class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col">
        <div
          class="
            w-auto
            items-center
            py-2.5
            px-3
            text-lg
            font-medium
            rounded-lg
            text-center
            cursor-default
            mb-2
            bg-red-200
            border-x border-y border-red-900
            text-red-900
            dark:bg-red-200
          "
          v-show="error"
          id="myError"
        >
          {{ error }}
        </div>
      </div>
    </div>

    <!-- <section class="bg-gray-300" id="detailsBg"> -->
    <!-- <div class="mt-[55px] pt-2"> -->
    <!-- <div
          class="relative mt-2 bg-gray-50 rounded-3xl w-auto mx-3 overflow-clip"
        > -->
    <!-- <div class="max-h-[40rem] h-auto w-auto bg-gray-800"></div> -->
    <!-- <img
            class="preview max-h-[40rem] h-auto w-auto my-auto"
            :src="tempImage"
          />
        </div> -->

    <div
      v-if="uploaded === true || imageExists === true"
      class="fixed z-10 w-full"
      style="margin-top: 50px"
    >
      <div class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col">
        <button
          type="button"
          class="
            bg-white
            rounded-md
            p-2
            inline-flex
            items-center
            justify-center
            text-gray-400
            hover:text-gray-500 hover:bg-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-inset
            focus:ring-indigo-500
            w-fit
            right-8
            mt-4
            absolute
          "
          @click="deleteImage"
        >
          <span class="sr-only">Close menu</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <section
      class="bg-gray-300 min-h-[35rem]"
      id="imageHolder"
      ref="imageHolder"
    >
      <div class="mt-[55px] pt-2" v-if="imgSrc != null">
        <div
          class="relative mt-2 bg-gray-50 rounded-3xl w-auto mx-3 overflow-clip"
        >
          <img
            class="preview max-h-[35rem] h-auto w-auto my-auto"
            :src="imgSrc"
          />
        </div>
        <!-- <div v-if="progress === true" class="meter">
          <progress
            class="progress"
            v-if="progress === true"
            :value="uploadValue"
            max="100"
          ></progress>
        </div> -->
        <!-- <div class="w-[50vw] bg-gray-200 rounded-full" v-if="progress === true">
          <div
            v-if="progress === true"
            class="
              bg-indigo-600
              text-base
              font-medium
              text-blue-100 text-center
              p-0.5
              leading-none
              rounded-l-full
            "
            :style="`width: ${uploadValue}%`"
          >
            {{ uploadValue + "%" }}
          </div>
        </div> -->
      </div>
    </section>

    <div
      class="
        px-5
        py-4
        pb-14
        mx-auto
        bg-gray-100
        rounded-t-xl
        flex flex-col
        w-full
        absolute
        z-20
        b-0
      "
      style="
        margin-top: 79vh;
        box-shadow: var(--tw-ring-inset) 0 0 0
          calc(5px + var(--tw-ring-offset-width)) rgb(117 116 116 / 20%);
      "
      id="bottom"
    >
      <label
        v-if="imgSrc === null"
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
          text-center
        "
        for="fileIp"
        >ADD IMAGE
        <input
          type="file"
          @change="previewImage"
          accept="image/*;capture=camera"
          id="fileIp"
        />
      </label>

      <div
        v-if="imgSrc != null"
        class="bg-gray-100 rounded-lg px-8 flex flex-col md:ml-auto w-full"
      >
        <div
          v-if="uploaded === false && imageExists === false"
          class="relative m-auto w-min"
        >
          <button
            v-if="progress === false"
            @click="onUpload"
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
              text-center
            "
            role="button"
          >
            UPLOAD
          </button>

          <div
            v-if="uploaded === false && progress === true"
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
              text-center
            "
            style="box-shadow: rgb(0 0 0 / 25%) 0px 10px 60px 0px"
          >
            <svg
              class="
                inline
                mr-3
                w-4
                h-4
                text-gray-200
                animate-spin
                dark:text-gray-600
                fill-gray-600
                dark:fill-gray-300
              "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            Uploading...
          </div>

          <button
            @click="imgSrc = null"
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
              text-center
            "
            role="button"
          >
            CANCLE
          </button>
        </div>
      </div>

      <div class="bg-gray-100 rounded-lg px-8 flex flex-col md:ml-auto w-full">
        <div class="relative m-auto w-min">
          <button
            v-if="uploaded === true || imageExists === true"
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
            "
            @click="saveImage"
          >
            NEXT
          </button>
          <!-- <button
            v-if="uploaded === true || imageExists === true"
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
              mb-3
            "
            @click="deleteImage"
          >
            DELETE IMAGE
          </button> -->
          <button
            v-if="imgSrc === null || uploaded === true || imageExists === true"
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
            "
            @click="back"
          >
            BACK
          </button>
        </div>
      </div>
    </div>

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
          :purpleImage="purpleImage"
          :greenImage="greenImage"
          :greenLocation="greenLocation"
          :greenDetails="greenDetails"
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
import { fb } from "../firebase";
import { data } from "./stores/reportData.js";
import { user } from "@/components/postProblem/stores/userData.js";

export default {
  name: "uploadImage",
  components: { stepsToComplete, reportHeader },
  data() {
    return {
      triggerTitle: "",
      purpleImage: false,
      greenImage: false,
      greenLocation: false,
      greenDetails: false,
      imageData: null,
      picture: null,
      uploadValue: 0,
      progress: false,
      imgSrc: null,
      uploaded: false,
      imageExists: false,
      imageName: "",
      grayLocation: false,
      grayImage: false,
      grayDetails: false,
      graySubmit: false,
    };
  },
  mounted() {
    if (data.address.length === 0) {
      this.grayImage = true;
      this.$router.push({ name: "fetchLocation" });
    }
    this.triggerTitle = "uploadImageTab";
    this.purpleImage = true;
    if (data.address.length > 0 || data.city.length > 0) {
      this.greenLocation = true;
    } else {
      this.grayLocation = true;
    }
    if (data.type.length > 0) {
      this.greenDetails = true;
    } else {
      this.grayDetails = true;
    }
    this.graySubmit = true;
    if (data.imageURL.length > 0) {
      this.imageExists = true;
      this.picture = data.imageURL;
      this.imgSrc = data.tempImage;
      this.imageName = data.imageName;
    }
  },
  methods: {
    saveImage() {
      this.purpleImage = false;
      this.greenImage = true;
      this.$router.push({ name: "addDetailsTab" });
    },
    deleteImage() {
      const storageRef = fb
        .storage()
        .ref(user.email+"/" + this.imageName)
        .delete();
      storageRef
        .then(() => {
          this.imgSrc = null;
          this.picture = null;
          this.imageName = "";
          this.uploaded = false;
          this.imageExists = false;
          this.uploadValue = 0;
          this.progress = false;
          this.imageData = null;
          data.imageURL = "";
          data.tempImage = "";
          data.imageName = "";
          const box = document.getElementById("myError");
          box.style.visibility = "visible";

          this.error = "IMAGE DELETED";
          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
        })
        .catch((error) => {
          this.uploaded = false;
          const box = document.getElementById("myError");
          box.style.visibility = "visible";

          this.error = error.message;
          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
          console.log(error.message);
        });
    },
    back() {
      this.$router.push({ name: "fetchLocation" });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      // var output = document.getElementById('myimage'),
      this.imgSrc = URL.createObjectURL(this.imageData);
      // fileName = event.target.files[0].name;
    },
    onUpload() {
      this.progress = true;
      this.picture = null;
      const storageRef = fb
        .storage()
        .ref(user.email+"/" + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.uploaded = false;
          const box = document.getElementById("myError");
          box.style.visibility = "visible";

          this.error = error.message;
          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            this.imageName = `${this.imageData.name}`;
            // console.log(this.picture);
            // localStorage.setItem("imgURL", this.picture);
            this.uploaded = true;
            // const box = document.getElementById("uploadPrompt");
            // box.style.visibility = "visible";
            setTimeout(() => {
              const box = document.getElementById("uploadPrompt");
              box.style.visibility = "hidden";
            }, 4000);
            data.setImageDetails(this.picture, this.imgSrc, this.imageName);
          });
        }
      );
    },
  },
};
</script>

<style scoped>
#imageHolder {
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
}

#steps {
  position: fixed !important;
  bottom: 0 !important;
  width: 100% !important;
  left: 0 !important;
  right: 0 !important;
}

.imgModule {
  margin: auto;
  border: 0.5vh solid #fe542e;
  padding: 2vw;
  margin-top: 36.5vh;
  width: max-content;
  border-radius: 4vw;
}

.imgUpload {
  margin: auto;
  border: 0.5vh solid #fe542e;
  padding: 2vw;
  margin-top: 15vh;
  width: max-content;
  border-radius: 4vw;
}

#fileIp {
  position: absolute;
  width: 0;
  height: 0;
}

img.preview {
  display: block;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
}

.meter {
  height: 1.8vh;
  position: fixed;
  background: #c2c2c2;
  border-radius: 25px;
  padding: 0.5%;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  width: 50vw;
}

.progress {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #ff512f;
  background-image: linear-gradient(center bottom, #ff512f 37%, #ff512f 69%);
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  width: -webkit-fill-available;
  border-radius: inherit;
}
</style>