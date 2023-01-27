<template>
  <div>
    <section
      class="ui two column centered grid"
      style="position: relative; z-index: 1"
    >
      <div class="column">
        <form class="ui segment large form">
          <div class="ui message red" v-show="error">{{ error }}</div>
          <div class="ui segment">
            <div class="field">
              <div
                class="ui right icon input large"
                :class="{ loading: spinner }"
              >
                <input
                  type="text"
                  placeholder="Enter your address"
                  v-model="address"
                  ref="autocomplete"
                />
                <i
                  class="dot circle link icon"
                  @click="locatorButtonPressed"
                ></i>
              </div>
            </div>
            <button class="ui button">Go</button>
          </div>
        </form>
      </div>
      <!-- <addressFieldGroup
        label="Address"
        v-model:streetNumber="form.streetNumber"
        v-model:postcode="form.postcode"
        v-model:city="form.city"
      /> -->
    </section>

    <section
      class="ui two column centered grid"
      style="position: relative; z-index: 1"
    >
      <div class="column">
        <form class="ui segment large form" style="display: table;">
          <div class="ui segment">
            <div class="field">
              <div
                class="ui right icon input large"
                :class="{ loading: spinner }"
              >
                <!-- <h3>Address Details :</h3> -->
                <label>
                  Area
                  <input type="text" v-model="area" placeholder="Area" />
                </label>

                <label>
                  City
                  <input type="text" v-model="city" placeholder="City" />
                </label>

                <label>
                  Postcode
                  <input
                    type="text"
                    v-model="postcode"
                    placeholder="Postcode"
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>

    <section id="map" ref="map"></section>

    <!-- <p v-if="zip !== null">{{ zip }}</p> -->
  </div>
</template>

<script>
import axios from "axios";
// import latlng-to-zip from "latlng-to-zip";
// import addressFieldGroup from "./addressFiledGroup.vue";
// import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "userLocation",
  // components: { addressFieldGroup },
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      temp: "",
      // lat: "",
      // long: "",
      zip: null,
      // street: "",
      city: "",
      area: "",
      postcode: "",
      
      fieldsObj: ["sublocality_level_1", "locality", "postal_code"],
    };
  },

  // setup() {
  //       const form = ref({
  //           firstName: '321321',
  //           lastName: '321321',
  //           email: '321321',
  //           deliveryAddress: {
  //               street: '321321',
  //               streetNumber: '321',
  //               postcode: '321',
  //               city: '321',
  //           },
  //           billingAddress: {
  //               street: '',
  //               streetNumber: '',
  //               postcode: '',
  //               city: '',
  //           },
  //       });

  //       return {
  //           form,
  //       };
  //   },

  // setup(props, context) {
  //   /* eslint-disable */
  //   const autocomplete = ref();
  //   let autocomplete2;

  //   onMounted(() => {
  //     autocomplete2 = new google.maps.places.Autocomplete(autocomplete.value, {
  //       types: ["address"],
  //       fields: ["address_components"]
  //     });

  //     google.maps.event.addListener(autocomplete2, "place_changed", () => {
  //       const mapping = {
  //         street_number: "update:streetNumber",
  //         route: "update:street",
  //         locality: "update:city",
  //         postal_code: "update:postcode",
  //         country: "update:country",
  //       }

  //       for(const type in mapping) {
  //         context.emit(mapping[type], "");
  //       }

  //       let place = {
  //         address_components: [],
  //         ...autocomplete2.getPlace()
  //       }

  //       place.address_components.forEach((component) => {
  //         component.types.forEach((type) => {
  //             if(mapping.hasOwnProperty(type)){
  //               context.emit(mapping[type], component.long_name);
  //             }
  //         });
  //       });
  //     });
  //   });

  //   onUnmounted(() => {
  //     if(autocomplete2) {
  //       google.maps.event.clearInstanceListeners(autocomplete2);
  //     }
  //   });

  //   return {autocomplete};
  // },

  async mounted() {
    // const script = document.createElement("script");
    // script.src =
    //   "https://maps.googleapis.com/maps/api/js?libraries=places&key=";
    // script.async = true;
    // document.head.appendChild(script);

    /*global google*/
    var autocomplete = new google.maps.places.Autocomplete(
      this.$refs["autocomplete"],
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(19.07609, 72.877426)
        ),
      }
    );
    autocomplete.addListener("place_changed", () => {
      var place = autocomplete.getPlace();
      // console.log(place.address_components);
      // this.addressPostalCodeFinder(place.address_components);
      //To find Pincode :

      // const field = ["sublocality_level_1", "locality", "postal_code"];

      this.addressFieldSetter(place.address_components, this.fieldsObj);

      // @input="$emit('update:postcode', $event.target.value)"

      // this.addressDetailsFinder(
      //   place.address_components,
      //   "postal_code",
      //   "Pincode"
      // );
      // // To find Country :
      // this.addressDetailsFinder(place.address_components, "country", "Country");
      // // To find State :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "administrative_area_level_1",
      //   "State"
      // );
      // // To find District :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "administrative_area_level_2",
      //   "District"
      // );
      // // To find City :
      // this.addressDetailsFinder(place.address_components, "locality", "City");
      // // To find Area (Goregaon, Andheri) :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "sublocality_level_1",
      //   "Area"
      // );
      // // To find Town (JP Nagar, Subhash Nagar) :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "sublocality_level_2",
      //   "Town"
      // );
      // // To find Colony :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "sublocality_level_3",
      //   "Colony"
      // );
      // // To find Neighborhood :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "neighborhood",
      //   "Neighborhood"
      // );
      // // To find Building / Premises / Apartment :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "premise",
      //   "Premises"
      // );
      // // To find Street :
      // this.addressDetailsFinder(place.address_components, "route", "Street");
      // // To find Street Number :
      // this.addressDetailsFinder(
      //   place.address_components,
      //   "street_number",
      //   "Street Number"
      // );

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
            // this.lat = position.coords.latitude;
            // this.long = position.coords.longitude;
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );

            this.showLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );

            // const reverseGeocode = require("latlng-to-zip");
            // reverseGeocode({ latitude: this.lat, longitude: this.long }, "AIzaSyDxpsh09EKUkm8eLKuouXPQvK2pHQwZYgA")
            //   .then((zipcode) => (this.zip = zipcode))
            //   .catch((err) => err);
          },
          (error) => {
            this.error =
              "Locator is unable to find your address. Please type your address manually.";
            this.spinner = false;
            this.temp = error.message;
            console.log(error.message);
          }
          // {
          //   enableHighAccuracy: true,
          //   maximumAge: 100,
          //   timeout: 60000,
          // }
        );
      } else {
        this.error = this.temp;
        // this.error = error.message;
        this.spinner = false;
        console.log("Your browser does not support geolocation API ");
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDxpsh09EKUkm8eLKuouXPQvK2pHQwZYgA"
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            // console.log(response.data.results[0].address_components);
            // this.addressPostalCodeFinder(response.data.results[0].address_components)
            // this.addressDetailsFinder(response.data.results[0].address_components, "sublocality_level_1")

            // const field = ["sublocality_level_1", "locality", "postal_code", ];
            this.addressFieldSetter(
              response.data.results[0].address_components,
              this.fieldsObj
            );

            // //To find Pincode :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "postal_code",
            //   "Pincode"
            // );
            // // To find Country :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "country",
            //   "Country"
            // );
            // // To find State :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "administrative_area_level_1",
            //   "State"
            // );
            // // To find District :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "administrative_area_level_2",
            //   "District"
            // );
            // // To find City :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "locality",
            //   "City"
            // );
            // // To find Area (Goregaon, Andheri) :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "sublocality_level_1",
            //   "Area"
            // );
            // // To find Town (JP Nagar, Subhash Nagar) :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "sublocality_level_2",
            //   "Town"
            // );
            // // To find Colony :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "sublocality_level_3",
            //   "Colony"
            // );
            // // To find Neighborhood :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "neighborhood",
            //   "Neighborhood"
            // );
            // // To find Building / Premises / Apartment :
            // this.addressDetailsFinder(
            //   response.data.results[0].address_components,
            //   "premise",
            //   "Premises"
            // );
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
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

    addressDetailsFinder(obj, field, as) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].types.indexOf(field) != -1) {
          console.log(as + " is : " + obj[i].long_name);
          break;
        }
      }
    },
    addressFieldSetter(addressObj, fieldsObj) {
      for (var i = 0; i < addressObj.length; i++) {
        for (var j = 0; j < fieldsObj.length; j++) {
          if (addressObj[i].types.indexOf(fieldsObj[j]) != -1) {
            if (fieldsObj[j] === "sublocality_level_1") {
              this.area = addressObj[i].long_name;
            } else if (fieldsObj[j] === "locality") {
              this.city = addressObj[i].long_name;
            } else if (fieldsObj[j] === "postal_code") {
              this.postcode = addressObj[i].long_name;
            }
          }
        }
      }
    },
  },
};
</script>


<style>
.ui.button,
.dot.circle.icon {
  background-color: #ff5a5f;
  color: white;
}

.pac-icon {
  display: none;
}

.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 16px;
}

#map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
/* 
.form {
  position: relative;
  z-index: 1;
  background-color: white;
  display: flex;
  height: 30vh;
} */
</style>



