<template>
    <headerWithSideDrawer currentTab="My Posts" />

    <div
        class="text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[60px] w-full fixed z-10 bg-gray-50 shadow">
        <ul class="flex -mb-px items-center float-right">
            <li id="filterButton" class="w-full border-l-2 border-gray-300 mr-2 hover:bg-gray-200 ">
                <div class=" p-4 pb-2 m-auto">
                    <label class="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" value="" @click="resolved = !resolved; filter()" class="sr-only peer">
                        <div
                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 after:mt-[1.5px]">
                        </div>
                        <span class="ml-3 font-medium text-gray-900">Resolved</span>
                    </label>
                </div>

            </li>
        </ul>
    </div>

    <div id="noPosts" class="noPosts hidden">
        <h1 class="text-2xl">You dont have any posts</h1>
        <p class="mt-1 text-lg">
            <router-link :to="'/locate'" class="underline">click here</router-link> to report an issue
        </p>
    </div>
    <div id="noResolevdPosts" class="noResolevdPosts hidden">
        <h1 class="text-2xl">You dont have any Resolved posts</h1>
    </div>
    <div id="blog" class="bg-gray-50 px-4 pb-5 pt-28 ">
        <div class="mx-auto container">
            <div tabindex="0" aria-label="Group of cards" class="focus:outline-none mt-2 lg:mt-4" v-for="item in posts"
                :key="item.postID">
                <div class="
              grid
              sm:grid-cols-1
              md:grid-cols-1
              lg:grid-cols-1
              xl:grid-cols-1
              gap-8
            ">
                    <div tabindex="0" class="focus:outline-none shadow-lg rounded-lg" :aria-label="item.postID">
                        <div @click="cardClicked(item.postID)" class="flex items-start px-4 py-6 w-full">
                            <img v-if="item.profileImage" class="w-12 h-12 rounded-full object-cover mr-4 shadow"
                                :src="item.profileImage" alt="avatar" />
                            <div v-else
                                class="inline-flex overflow-hidden relative justify-center items-center w-12 h-auto rounded-full bg-gray-500 aspect-square mr-4 shadow"
                                style="width: 48px;">
                                <span class="font-medium text-gray-300">{{
                                    item.firstName[0] + item.lastName[0]
                                }}</span>
                            </div>
                            <div class="w-full">
                                <div class="flex items-center justify-between">
                                    <h2 class="text-lg font-semibold text-gray-900 -mt-1">
                                        {{ item.firstName }}
                                    </h2>
                                    <small class="text-lg text-gray-700">{{
                                        item.day + "/" + item.month + "/" + item.year
                                    }}</small>
                                </div>
                                <p class="text-gray-700 text-base">
                                    {{ item.area + " at " + item.time }}
                                </p>
                                <h1 tabindex="0" class="
                      focus:outline-none
                      text-lg text-gray-900
                      font-medium
                      tracking-wider
                      mt-3
                    ">
                                    {{ item.type }}
                                </h1>
                                <p tabindex="0" class="
                      focus:outline-none
                      text-gray-700 text-lg
                      leading-8
                      pr-4
                      tracking-wide
                      mt-0
                      mb-2
                    ">
                                    {{ item.description }}
                                </p>
                                <img role="img" :aria-label="'post' + item.postID" tabindex="0" class="
                      focus:outline-none
                      w-full
                      rounded-t-[15px]
                      aspect-[1/1]
                      object-cover
                    " :src="item.imageURL" :alt="'post' + item.postID" />
                                <div class="
                      py-4
                      px-8
                      w-full
                      flex
                      justify-between
                      bg-indigo-600
                      rounded-b-[15px]
                    ">
                                    <p tabindex="0" class="
                        focus:outline-none
                        text-sm text-white
                        font-semibold
                        tracking-wide
                      ">
                                        {{ item.street_address }}
                                    </p>
                                </div>

                                <div class="mt-4 flex items-center">
                                    <button class="
                        flex
                        mr-2
                        text-gray-700 text-lg
                        mr-4
                        hover:text-pink-600
                        items-center
                      " @click.stop="like(item.postID)">
                                        <svg v-if="item.likedBy.includes(email)" color="rgb(225 29 72)"
                                            fill="rgb(225 29 72)" viewBox="0 0 24 24" class="w-7 h-7 mr-1"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <svg v-else fill="none" viewBox="0 0 24 24" class="w-7 h-7 mr-1"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span v-if="item.likedBy.length > 0" class="text-gray-700 text-base">{{
                                            item.likedBy.length
                                        }}</span>
                                    </button>
                                    <button class="
                        flex
                        mr-2
                        text-gray-700 text-lg
                        ml-2
                        hover:text-indigo-600
                      " @click.stop="cardClicked(item.postID)">
                                        <svg fill="none" viewBox="0 0 24 24" class="w-7 h-7 mr-1" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        <span v-if="item.commentIDs.length > 0" class="text-gray-700 text-base">{{
                                            item.commentIDs.length
                                        }}</span>
                                    </button>
                                </div>
                            </div>
                            <div class="h-5 w-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isLoading">
            <div role="status"
                class="container p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto my-4 w-full">
                <div class="flex items-center mt-4 space-x-3">
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

                <div class="h-2 bg-gray-300 rounded-full mb-2 ml-16"></div>
                <div class="grid grid-cols-3 gap-4 ml-16 mb-4">
                    <div class="h-2 bg-gray-300 rounded col-span-2"></div>
                    <div class="h-2 bg-gray-300 rounded col-span-1"></div>
                </div>

                <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ml-16">
                    <svg class="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                        fill="currentColor" viewBox="0 0 640 512">
                        <path
                            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                </div>
                <span class="sr-only">Loading...</span>
            </div>
            <div role="status" class="container p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto">
                <div class="flex items-center mt-4 space-x-3">
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

                <div class="h-2 bg-gray-300 rounded-full mb-2 ml-16"></div>
                <div class="grid grid-cols-3 gap-4 ml-16 mb-4">
                    <div class="h-2 bg-gray-300 rounded col-span-2"></div>
                    <div class="h-2 bg-gray-300 rounded col-span-1"></div>
                </div>

                <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ml-16">
                    <svg class="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                        fill="currentColor" viewBox="0 0 640 512">
                        <path
                            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                </div>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import headerWithSideDrawer from "../headerWithSideDrawer.vue";
import axios from "axios";
import { properties } from "../axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
import { posts } from "@/components/postProblem/stores/postsData.js"
export default {
    name: "myPosts",
    components: { headerWithSideDrawer },
    data() {
        return {
            posts: [],
            email: "",
            userName: "",
            postcode: "",
            area: "",
            type: "",
            cond: true,
            resolved: false,
            isLoading: true,
        };
    },
    beforeMount() {
        if (user.email.length > 0) {
            this.userName = user.firstName;
            this.email = user.email;
        } else {
            this.userName = localStorage.getItem("firstName");
            this.email = localStorage.getItem("email");
        }

        if (!this.userName || !this.email) {
            this.$router.push({ name: "loginPage" });
        }
    },
    async mounted() {
        await this.loadData();

    },

    methods: {
        async loadData() {
            this.isLoading = true;
            await axios.get(properties.server + "/post/details/filter?email=" + this.email).then(
                (res) => {
                    posts.posts = res.data;
                    posts.sortedPosts = posts.posts;
                    // this.posts = posts.sortedPosts;
                    this.sortByTime();
                    this.isLoading = false;
                }
            )
        },
        cardClicked(id) {
            this.$router.push({ path: "/post/" + id });
        },

        async like(pID) {
            if (!this.email) {
                window.alert("Please login");
            } else {
                if (this.posts.find(p => p.postID === pID).likedBy.includes(this.email)) {
                    // thisExpression.
                    const index = this.posts.find(p => p.postID === pID).likedBy.indexOf(this.email);
                    if (index > -1) {
                        // only splice array when item is found
                        this.posts.forEach(p => {
                            if (p.postID === pID) {
                                p.likedBy.splice(index, 1)
                            }
                        });
                    }
                    await axios.put(
                        properties.server + "/post/posts/unlike?postID=" + pID + "&email=" + this.email
                    );
                    await this.loadData().then(this.loadData());
                } else {
                    this.posts.forEach(p => {
                        if (p.postID === pID) {
                            p.likedBy.push(this.email);
                        }
                    });
                    await axios.put(
                        properties.server + "/post/posts/like?postID=" + pID + "&email=" + this.email
                    ).then(this.loadData().then(this.loadData()));
                }
            }
        },
        sortByTime() {
            this.posts = [];
            this.posts = posts.sortedPosts.forEach(p => p.date = new Date(p.year, p.month, p.day, p.hour, p.minute, p.second));
            this.posts = posts.sortedPosts.sort((p1, p2) => p2.date - p1.date);

            if (this.posts.length <= 0) {
                document.getElementById("noPosts").classList.remove("hidden");
            }
            else {
                document.getElementById("noPosts").classList.add("hidden");
            }
        },
        filter() {
            if (this.resolved === true) {
                this.filterResolved();

                if (this.posts.length <= 0) {
                    document.getElementById("noResolevdPosts").classList.remove("hidden");
                    document.getElementById("noPosts").classList.add("hidden");
                }
                else {
                    document.getElementById("noResolevdPosts").classList.add("hidden");
                }
            }
            else if (this.resolved === false) {
                this.posts = posts.posts;
                if (this.posts.length > 0) {
                    document.getElementById("noResolevdPosts").classList.add("hidden");
                }
                else {
                    document.getElementById("noResolevdPosts").classList.add("hidden");
                    document.getElementById("noPosts").classList.remove("hidden");
                }
            }
        },
        filterResolved() {
            this.posts = posts.posts;
            this.posts = this.posts.filter(p => {
                return p.status === "fixed"
            });
        },
    }
};
</script>

<style>
.noPosts {
    width: max-content;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}

.noResolevdPosts {
    width: max-content;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>