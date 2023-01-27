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
    <div class="fixed z-10 w-full mt-14">
      <div
        class="container px-5 mx-auto flex flex-wrap flex-col bg-gray-100"
      ></div>

      <!-- <img
        class="
          w-auto
          block
          mx-auto
          mb-10
          object-cover object-center
          rounded
          fixed
        "
        alt="hero"
        src="https://dummyimage.com/720x600"
      /> -->

      <div class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col">
        <div class="block items-center mb-2">
          <!-- <label for="autocomplete" class="sr-only">Search</label> -->
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
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            <input
              type="text"
              id="autocomplete"
              ref="autocomplete"
              v-model.lazy="address"
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
              placeholder="Enter area, street name..."
              style="
                box-shadow: var(--tw-ring-inset) 0 0 0
                  calc(4px + var(--tw-ring-offset-width)) rgb(48 48 48 / 5%);
              "
            />
            <!-- style="box-shadow: 0 25px 50px -12px rgb(0 0 0 / 60%);"" -->
          </div>

          <div class="relative m-auto w-fit">
            <button
              v-if="spinner === false"
              @click="locatorButtonPressed"
              type="submit"
              class="
                items-center
                py-2.5
                px-3
                mt-3
                text-lg
                font-medium
                text-white
                bg-indigo-500
                rounded-lg
                border-0 border-blue-700
                hover:bg-indigo-600
                focus:outline-none focus:ring-indigo-300
                dark:bg-indigo-600
                dark:hover:bg-indigo-700
                dark:focus:ring-indigo-800
              "
              style="box-shadow: rgb(0 0 0 / 20%) 0px 10px 75px 0px"
            >
              <!-- <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> -->

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="inline w-4 h-4 mb-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>

              Use Current Location
            </button>
            <div
              v-if="spinner === true"
              class="
                items-center
                py-2.5
                px-3
                mt-3
                text-lg
                font-medium
                text-white
                bg-indigo-500
                rounded-lg
                border-0 border-blue-700
                dark:bg-indigo-600
                text-center
                cursor-default
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
              Loading...
            </div>
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
            text-base
            font-medium
            text-red-900
            rounded-lg
            dark:bg-red-200
            text-center
            cursor-default
            mb-2
          "
          v-show="error"
          id="myError"
        >
          {{ error }}
        </div>
      </div>
    </div>
    <section id="map" ref="map"></section>
    <!-- <div class="contents fixed" style="">
      <section style="position: fixed; overflow: visible" id="map" ref="map"></section>
    </div> -->
    <!-- <div
      class="
        px-5
        py-8
        mx-auto
        lg:w-2/6
        md:w-1/2
        md:ml-auto
        md:mt-0
        bg-gray-100
        rounded-xl
        flex flex-col
        w-full
        absolute
      "
      style="margin-top: 70vh"
    > -->
    <div
      v-if="showDetails === true"
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
      "
      style="
        margin-top: 70vh;
        box-shadow: var(--tw-ring-inset) 0 0 0
          calc(5px + var(--tw-ring-offset-width)) rgb(117 116 116 / 20%);
      "
    >
      <!-- <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"> -->
      <!-- <h1
        class="
          text-xl
          relative
          mx-auto
          font-medium
          title-font
          mb-3
          text-gray-900
        "
      >
        ADD MORE DETAILS
      </h1> -->
      <div class="relative mb-2 mt-2">
        <label
          for="street_address"
          class="leading-7 pl-4 text-gray-700 font-medium"
          >ADDRESS</label
        >
        <input
          type="text"
          :value="street_address"
          id="street_address"
          name="street_address"
          class="
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
          "
          readonly
        />
      </div>
      <!-- <div class="relative mb-4">
        <label for="area" class="leading-7 text-sm text-gray-600 pl-4"
          >AREA</label
        >
        <input
          type="text"
          :value="area"
          id="area"
          name="area"
          class="
            w-full
            bg-white
            rounded
            border border-gray-300
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
            text-base
            outline-none
            text-gray-700
            font-semibold
            py-1
            px-3.5
            leading-8
            transition-colors
            duration-200
            ease-in-out
          "
          readonly
        />
      </div> -->
      <div class="flex">
        <div class="relative mb-4 grid mr-4 w-fit">
          <label
            for="city"
            class="leading-7 pl-4 w-fit text-gray-700 font-medium"
            >CITY</label
          >
          <input
            type="text"
            id="city"
            name="city"
            :value="city"
            class="
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
            "
            readonly
          />
        </div>
        <div class="relative mb-4 grid ml-2 w-fit">
          <label
            for="postcode"
            class="leading-7 pl-4 w-fit text-gray-700 font-medium"
            >POSTCODE</label
          >
          <input
            type="text"
            id="postcode"
            name="postcode"
            :value="postcode"
            class="
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
            "
            readonly
          />
        </div>
      </div>
      <div class="relative mb-4">
        <label for="landmark" class="leading-7 pl-4 text-gray-700 font-medium"
          >ADD MORE DETAILS (IF ANY)</label
        >
        <input
          type="text"
          id="additionalDetails"
          name="additionalDetails"
          v-model="additionalDetails"
          class="
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
          "
        />
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
        "
        @click="saveLocationDetails"
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
        "
        @click="cancel"
      >
        CANCEL
      </button>
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
          :purpleLocation="purpleLocation"
          :greenLocation="greenLocation"
          :greenImage="greenImage"
          :greenDetails="greenDetails"
          :grayImage="grayImage"
          :grayDetails="grayDetails"
          :graySubmit="graySubmit"
        ></stepsToComplete>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import stepsToComplete from "./steps.vue";
import reportHeader from "./reportHeader.vue";
import { data } from "./stores/reportData.js";
import { user } from "@/components/postProblem/stores/userData.js";
export default {
  components: { stepsToComplete, reportHeader },
  name: "fetchLocation",
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      temp: "",
      city: "",
      area: "",
      postcode: "",
      district: "",
      state: "",
      country: "",
      pulsecode: "",
      additionalDetails: "",
      street_address: "",
      lat: "",
      long: "",
      fieldsObj: [
        "sublocality_level_1",
        "locality",
        "postal_code",
        "administrative_area_level_2",
        "administrative_area_level_1",
        "country",
        "plus_code",
      ],
      areaPresent: false,
      cityPresent: false,
      postcodePresent: false,
      showDetails: false,
      triggerTitle: "",
      purpleLocation: false,
      greenLocation: false,
      greenImage: false,
      greenDetails: false,
      grayImage: false,
      grayDetails: false,
      graySubmit: false,
    };
  },
  async mounted() {
    var userName;
    var email
    if (user.email.length > 0) {
      userName = user.firstName;
      email = user.email;
    } else {
      userName = localStorage.getItem("firstName");
      email = localStorage.getItem("email");
    }

    if (!userName || !email) {
      this.$router.push({ name: "loginPage" });
    }

    this.triggerTitle = "addLocationTab";
    this.purpleLocation = true;
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
    this.graySubmit = true;

    /*global google*/
    var autocomplete = new google.maps.places.Autocomplete(
      this.$refs["autocomplete"],
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(19.07609, 72.877426)
        ),
      }
    );

    if (data.city.length > 0) {
      this.showDetails = true;
      this.address = data.address;
      this.street_address = data.street_address;
      this.area = data.area;
      this.city = data.city;
      this.postcode = data.postcode;
      this.additionalDetails = data.additionalDetails;
      this.lat = data.lat;
      this.long = data.long;
      this.showLocationOnTheMap(this.lat, this.long);
    }

    autocomplete.addListener("place_changed", () => {
      var place = autocomplete.getPlace();
      // console.log(place.address_components);

      this.getAddressFrom(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );

      this.addressFieldSetter(place.address_components, this.fieldsObj);

      this.showLocationOnTheMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
  },

  methods: {
    locatorButtonPressed() {
      this.spinner = true;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );

            this.showLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );

            // const reverseGeocode = require("latlng-to-zip");
            // reverseGeocode({ latitude: this.lat, longitude: this.long }, "API-KEY")
            //   .then((zipcode) => (this.zip = zipcode))
            //   .catch((err) => err);
          },
          (error) => {
            const box = document.getElementById("myError");
            box.style.visibility = "visible";
            this.error =
              "Locator is unable to find your address. Please type your address manually.";

            setTimeout(() => {
              const box = document.getElementById("myError");
              box.style.visibility = "hidden";
            }, 4000);

            this.spinner = false;
            this.temp = error.message;
            console.log(error.message);
          }
        );
      } else {
        const box = document.getElementById("myError");
        box.style.visibility = "visible";
        this.error = this.temp;

        setTimeout(() => {
          const box = document.getElementById("myError");
          box.style.visibility = "hidden";
        }, 4000);
        // this.error = error.message;
        this.spinner = false;
        console.log("Your browser does not support geolocation API ");
      }
    },
    getAddressFrom(lat, long) {
      this.lat = lat;
      this.long = long;
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDdHsXJsWI8hJ72IpcKZiMN9Go6Rc_xpqo"
        )
        .then((response) => {
          if (response.data.error_message) {
            const box = document.getElementById("myError");
            box.style.visibility = "visible";
            this.error = response.data.error_message;

            setTimeout(() => {
              const box = document.getElementById("myError");
              box.style.visibility = "hidden";
            }, 4000);
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;

            this.addressFieldSetter(
              response.data.results[0].address_components,
              this.fieldsObj
            );
          }
          this.spinner = false;
        })
        .catch((error) => {
          const box = document.getElementById("myError");
          box.style.visibility = "visible";
          this.error = error.message;

          setTimeout(() => {
            const box = document.getElementById("myError");
            box.style.visibility = "hidden";
          }, 4000);
          this.spinner = false;
          console.log(error.message);
        });
    },

    showLocationOnTheMap(latitude, longitude) {
      // Show & center the Map based on
      var map = new google.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },

    addressPostalCodeFinder(obj) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].types.indexOf("postal_code") != -1) {
          this.zip = obj[i].long_name;
          console.log("zip code is : " + this.zip);
          break;
        }
      }
    },

    addressDetailsFinder(obj, field) {
      for (var i = 0; i < obj.length; i++) {
        var result = "";
        if (obj[i].types.indexOf(field) != -1) {
          result = obj[i].long_name;
          break;
        }
        return result;
      }
    },
    addressFieldSetter(addressObj, fieldsObj) {
      this.areaPresent = false;
      this.cityPresent = false;
      this.postcodePresent = false;
      for (var i = 0; i < addressObj.length; i++) {
        for (var j = 0; j < fieldsObj.length; j++) {
          if (addressObj[i].types.indexOf(fieldsObj[j]) != -1) {
            if (fieldsObj[j] === "sublocality_level_1") {
              this.area = addressObj[i].long_name;
              this.areaPresent = true;
            } else if (fieldsObj[j] === "locality") {
              this.city = addressObj[i].long_name;
              this.cityPresent = true;
            } else if (fieldsObj[j] === "postal_code") {
              this.postcode = addressObj[i].long_name;
              this.postcodePresent = true;
            } else if (fieldsObj[j] === "administrative_area_level_2") {
              this.district = addressObj[i].long_name;
            } else if (fieldsObj[j] === "administrative_area_level_1") {
              this.state = addressObj[i].long_name;
            } else if (fieldsObj[j] === "country") {
              this.country = addressObj[i].long_name;
            } else if (fieldsObj[j] === "plus_code") {
              this.pulsecode = addressObj[i].long_name;
            }
          }
        }
      }
      if (this.areaPresent === false) {
        this.area = "";
      }
      if (this.cityPresent === false) {
        this.city = "";
      }
      if (this.postcodePresent === false) {
        this.postcode = "";
      }
      this.addressTrimmer();
      this.showDetails = true;
    },
    addressTrimmer() {
      var street_address = this.address;
      if (street_address.indexOf(this.postcode) > -1) {
        if (street_address.indexOf(this.postcode + ",") > -1) {
          street_address = street_address.replace(this.postcode + ",", "");
        } else {
          street_address = street_address.replace(this.postcode, "");
        }

        // console.log("result : "+temp2);
      }
      if (street_address.indexOf(this.city) > -1) {
        if (street_address.indexOf(this.city + ",") > -1) {
          street_address = street_address.replace(this.city + ",", "");
        } else {
          street_address = street_address.replace(this.city, "");
        }
      }
      // if (street_address.indexOf(this.area) > -1) {
      //   if (street_address.indexOf(this.area + ",") > -1) {
      //     street_address = street_address.replace(this.area + ",", "");
      //   } else {
      //     street_address = street_address.replace(this.area, "");
      //   }
      // }
      // if (street_address.indexOf(this.district) > -1) {
      //   if (street_address.indexOf(this.district + ",") > -1) {
      //     street_address = street_address.replace(this.district + ",", "");
      //   } else {
      //     street_address = street_address.replace(this.district, "");
      //   }
      // }
      if (street_address.indexOf(this.state) > -1) {
        if (street_address.indexOf(this.state + ",") > -1) {
          street_address = street_address.replace(this.state + ",", "");
        } else {
          street_address = street_address.replace(this.state, "");
        }
      }
      if (street_address.indexOf(this.country) > -1) {
        if (street_address.indexOf(this.country + ",") > -1) {
          street_address = street_address.replace(this.country + ",", "");
        } else {
          street_address = street_address.replace(this.country, "");
        }
      }
      if (street_address.indexOf(this.pulsecode) > -1) {
        if (street_address.indexOf(this.pulsecode + ", ") > -1) {
          street_address = street_address.replace(this.pulsecode + ", ", "");
        } else if (street_address.indexOf(this.pulsecode + ",") > -1) {
          street_address = street_address.replace(this.pulsecode + ",", "");
        } else {
          street_address = street_address.replace(this.pulsecode, "");
        }
      }
      street_address = street_address.trim();
      street_address = street_address.slice(0, -1);
      this.street_address = street_address;
    },
    saveLocationDetails() {
      data.setLocationDetails(
        this.address,
        this.street_address,
        this.area,
        this.city,
        this.postcode,
        this.additionalDetails,
        this.lat,
        this.long
      );
      this.purpleLocation = false;
      this.greenLocation = true;
      this.$router.push({ name: "uploadImage" });
    },
    cancel() {
      this.$router.push({ name: "postsView" });
    },
  },
};
</script>

<style scoped>
#map {
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
</style>