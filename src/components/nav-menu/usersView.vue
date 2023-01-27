<template>
    <headerComponent></headerComponent>

    <div
        class="text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[64px] w-full fixed z-10 bg-gray-50 shadow">
        <ul class="flex -mb-px items-center">
            <li class="mr-1.5 w-full">
                <button id="generalUsersTab" @click="showGeneralUsers"
                    class="inline-block p-4 pb-2 ml-1 rounded-t-lg border-b-2 border-transparent">General</button>
            </li>
            <li class="mr-1.5 w-full">
                <button id="officialUsersTab" @click="showOfficialUsers"
                    class="inline-block p-4 pb-2 mr-1 rounded-t-lg border-b-2 border-transparent"
                    aria-current="page">Officer</button>
            </li>
            <li class="mr-1.5 w-full">
                <button id="workerUsersTab" @click="showWorkerUsers"
                    class="inline-block p-4 pb-2 mr-1 rounded-t-lg border-b-2 border-transparent">Worker</button>
            </li>
            <li class="mr-1.5 w-full">
                <button id="adminUsersTab" @click="showAdminUsers"
                    class="inline-block p-4 pb-2 mr-1 rounded-t-lg border-b-2 border-transparent">Admin</button>
            </li>
        </ul>
    </div>

    <div class="px-4 pt-28">
        <div class="
                flex
                relative
                items-center
                pl-3
                pointer-events-none
                top-[32px]
                lg:top-[53px]
              ">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>
        <input v-model="searchQuery" type="text" id="input-group-search" @input="checkUser"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-base focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-12 p-2.5 lg:mt-6"
            placeholder="Search User">
    </div>

    <div v-if="searchQuery !== null" id="blog" class="bg-gray-50 px-4">
        <div class="mx-auto container relative">

            <div v-if="searchQuery.length > 0" class="w-full p-4 bg-white border rounded-lg shadow-md sm:p-8 absolute z-10">

                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200">
                        <li v-for="item in resultQuery" :key="item.email" @click="cardClicked(item.email)"
                            class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <img v-if="item.profileImage" class="w-12 h-12 rounded-full"
                                        :src="item.profileImage" alt="avatar">
                                    <div v-else
                                        class="inline-flex overflow-hidden relative justify-center items-center w-12 h-auto rounded-full bg-gray-500 aspect-square  shadow">
                                        <span class="font-medium text-gray-300">{{ item.firstName[0] +
                                                item.lastName[0]
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
                                <span class="inline-flex items-center text-sm font-semibold px-2 py-2 text-gray-900">
                                    {{ item.userType[0].toUpperCase() + item.userType.slice(1) }}
                                </span>
                            </div>
                        </li>
                        <div v-if="noUser == true" class="flex item-center space-x-4">
                            <p class="text-lg mx-auto">No Users found</p>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <generalUsers v-if="tab === 'general'" :backdrop="noUserShow"></generalUsers>
    <officialUsers v-else-if="tab === 'official'"  :backdrop="noUserShow"></officialUsers>
    <workerUsers v-else-if="tab === 'worker'"  :backdrop="noUserShow"></workerUsers>
    <adminUsers v-else-if="tab === 'admin'" :backdrop="noUserShow"></adminUsers>

</template>

<script>
import headerComponent from "@/components/headerComponent.vue";
import axios from "axios";
import { properties } from "@/components/axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
import generalUsers from "@/components/nav-menu/users/generalUsers.vue";
import officialUsers from "@/components/nav-menu/users/officialUsers.vue";
import adminUsers from "@/components/nav-menu/users/adminUsers.vue";
import workerUsers from "@/components/nav-menu/users/workerUsers.vue";

export default {
    name: "usersView",
    components: { headerComponent, generalUsers, officialUsers, workerUsers, adminUsers },
    data() {
        return {
            users: [],
            email: "",
            userType: "",
            tab: "",
            searchQuery: null,
            noUser: false,
            noUserShow: false,
        };
    },
    computed: {
        resultQuery() {
            if (this.searchQuery) {
                return this.users.filter((item) => {
                    return this.searchQuery.toLowerCase().split(' ').every(v => item.email.toLowerCase().includes(v));
                })
            }
            else {
                return null;
            }
        }
    },
    async mounted() {
        if (user.email.length > 0) {
            this.email = user.email;
            this.userType = user.userType;
        } else {
            this.email = localStorage.getItem("email");
            this.userType = localStorage.getItem("userType");
        }

        if (!this.email) {
            this.$router.push({ name: "loginPage" });
        }

        if(this.userType === "admin"){
            this.showGeneralUsers();
            await this.loadData();
        }
        else{
            this.$router.push({ path: "/user/"+this.email });
        }

    },

    methods: {
        async loadData() {
            await axios.get(properties.server + "/user/users").then(
                (res) => {
                    this.users = res.data;
                }
            )
        },
        cardClicked(email) {
            this.$router.push({ path: "/user/" + email });
        },

        showGeneralUsers() {
            this.resetTabs();
            var generalUsersTab = document.getElementById("generalUsersTab");
            generalUsersTab.classList.add("text-indigo-600");
            generalUsersTab.classList.add("border-indigo-600");

            this.tab = "general";
        },
        showOfficialUsers() {
            this.resetTabs();
            var officialUsersTab = document.getElementById("officialUsersTab");
            officialUsersTab.classList.add("text-indigo-600");
            officialUsersTab.classList.add("border-indigo-600");

            this.tab = "official";
        },
        showWorkerUsers() {
            this.resetTabs();
            var workerUsersTab = document.getElementById("workerUsersTab");
            workerUsersTab.classList.add("text-indigo-600");
            workerUsersTab.classList.add("border-indigo-600");

            this.tab = "worker";
        },
        showAdminUsers() {
            this.resetTabs();
            var adminUsersTab = document.getElementById("adminUsersTab");
            adminUsersTab.classList.add("text-indigo-600");
            adminUsersTab.classList.add("border-indigo-600");

            this.tab = "admin";
        },

        resetTabs() {
            var generalUsersTab = document.getElementById("generalUsersTab");
            generalUsersTab.classList.remove("text-indigo-600");
            generalUsersTab.classList.remove("border-indigo-600");
            generalUsersTab.classList.add("border-transparent");

            var officialUsersTab = document.getElementById("officialUsersTab");
            officialUsersTab.classList.remove("text-indigo-600");
            officialUsersTab.classList.remove("border-indigo-600");
            officialUsersTab.classList.add("border-transparent");

            var workerUsersTab = document.getElementById("workerUsersTab");
            workerUsersTab.classList.remove("text-indigo-600");
            workerUsersTab.classList.remove("border-indigo-600");
            workerUsersTab.classList.add("border-transparent");

            var adminUsersTab = document.getElementById("adminUsersTab");
            adminUsersTab.classList.remove("text-indigo-600");
            adminUsersTab.classList.remove("border-indigo-600");
            adminUsersTab.classList.add("border-transparent");
        },
        checkUser() {
                if(this.searchQuery){
                    this.noUserShow = true;
                }
                else{
                    this.noUserShow = false;
                }

            if(this.resultQuery.length <= 0){
                this.noUser = true;
            }
            else{
                this.noUser = false
            }
        }
    }
}
</script>