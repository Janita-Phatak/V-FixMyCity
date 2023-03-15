<template>

    <div v-if="backdrop"  class="modal2"></div>

    <div id="noUsers" class="noUsers hidden">
        <h1 class="text-2xl">No Users available</h1>
    </div>


    <div id="blog" class="bg-gray-50 px-4 pb-5">
        <div class="mx-auto container">

            <div v-if="users.length > 0" class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 mt-4 lg:mt-6 mx-auto">
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="item in users" :key="item.email" @click="cardClicked(item.email)"
                            class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
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
                                    <p class="text-lg font-semibold text-gray-900 truncate">
                                        {{ (item.firstName + " " + item.lastName) }}
                                    </p>
                                    <p class="text-lg text-gray-500 truncate">
                                        {{ item.email }}
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
    name: "generalUsers",
    props: {
        backdrop: Boolean,
    },
    data() {
        return {
            users: [],
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
            await axios.get(properties.server + "/user/users/filter/userType?userType=general").then(
                (res) => {
                    this.users = res.data;
                }
            )
            this.isLoading = false;
            if(this.users.length === 0){
                document.getElementById("noUsers").classList.remove("hidden")
            }
        },
        cardClicked(email) {
            this.$router.push({ path: "/user/" + email });
        }
    }
}
</script>

<style>
.noUsers {
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