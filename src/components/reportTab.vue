<template>

    <div v-if="backdrop"  class="modal2"></div>

    <div id="noReports" class="noReports hidden">
        <h1 class="text-2xl">No Reports available</h1>
    </div>


    <div id="blog" class="bg-gray-50 px-4 pb-5">
        <div class="mx-auto container">

            <div v-if="reports.length > 0" class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 mt-4 lg:mt-6 mx-auto">
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="item in reports" :key="item.email" @click="cardClicked(item.email)"
                            class="py-3 sm:py-4">
                            <div class="flex space-x-4">
                                <div class="flex-shrink-0">
                                    <img v-if="item.profileImage" class="w-12 h-12 rounded-full object-cover"
                                        :src="item.profileImage" alt="avatar">
                                    <div v-else
                                        class="inline-flex overflow-hidden relative justify-center items-center w-12 h-auto rounded-full bg-gray-500 aspect-square  shadow">
                                        <span class="font-medium text-gray-300">{{ item.firstName[0] + item.lastName[0]
                                        }}</span>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-lg font-semibold text-gray-900 -mt-1">
                                          {{ (item.firstName + " " + item.lastName) }}
                                        </h2>
                                        <small class="text-base text-gray-700">{{
                                            timeSince(new Date(item.year, item.month - 1, item.day, item.hour, item.minute, item.second))
                                        }}</small>
                                        <!-- <small class="text-lg text-gray-700">{{
                                          item.day + "/" + item.month + "/" + item.year
                                        }}</small> -->
                                    </div>
                                    <p class="text-lg text-gray-500">
                                        {{ item.report }}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div v-if="isLoading">
            <div role="status"
                class="container p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto my-4 w-full">
                <div class="flex items-center space-x-3">
                    <svg class="text-gray-300 w-14 h-14" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
                        <div class="w-48 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div role="status"
                class="container p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto my-4 w-full">
                <div class="flex items-center space-x-3">
                    <svg class="text-gray-300 w-14 h-14" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
                        <div class="w-48 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
import { properties } from "@/components/axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";

export default {
    name: "reportTab",
    props: {
        backdrop: Boolean,
    },
    data() {
        return {
            reports: [],
            email: "",
            isLoading: false
        };
    },
    async mounted() {
        if (user.email.length > 0) {
            this.email = user.email;
        } else {
            this.email = localStorage.getItem("email");
        }

        if (!this.email) {
            this.$router.push({ name: "loginPage" });
        }

        await this.loadData();
    },

    methods: {
        async loadData() {
            this.isLoading = true;
            await axios.get(properties.server + "/report/get/all").then(
                (res) => {
                    this.reports = res.data;
                }
            )
            this.isLoading = false;
            if(this.reports.length === 0){
                document.getElementById("noReports").classList.remove("hidden")
            }
        },
        cardClicked(email) {
            this.$router.push({ path: "/user/" + email });
        },
        timeSince(date) {
      if (typeof date !== 'object') {
        date = new Date(date);
      }

      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }

      return interval + ' ' + intervalType + ' ago';
    },
    }
}
</script>

<style>
.noReports {
    width: max-content;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
.modal2 {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}
</style>